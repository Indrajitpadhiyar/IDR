import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import Invoice from '../models/Invoice.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secretkey', {
    expiresIn: '30d',
  });
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, company } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email address' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      company: company || '',
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        company: user.company,
        role: user.role,
        status: user.status,
        subscription: null,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (user.status === 'Suspended') {
      return res.status(403).json({ success: false, message: 'Account is suspended. Please contact support' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const sub = await Subscription.findOne({ userId: user._id });

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        company: user.company,
        role: user.role,
        status: user.status,
        subscription: sub,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const sub = await Subscription.findOne({ userId: req.user._id });
    res.json({
      success: true,
      user: {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        name: `${req.user.firstName} ${req.user.lastName}`,
        email: req.user.email,
        phone: req.user.phone,
        company: req.user.company,
        role: req.user.role,
        status: req.user.status,
        subscription: sub,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { token, email: reqEmail, name: reqName, picture: reqPicture } = req.body;
    
    let email = reqEmail;
    let name = reqName;
    let picture = reqPicture;

    if (token) {
      // 1. Verify token with Google's official oauth2 validation endpoint
      const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
      if (!response.ok) {
        return res.status(400).json({ success: false, message: 'Invalid Google credential token' });
      }
      
      const googleUser = await response.json();
      
      // 2. Validate client ID to prevent spoofing
      const serverClientId = (process.env.GOOGLE_CLIENT_ID || '').replace(/^"(.*)"$/, '$1').trim();
      if (googleUser.aud !== serverClientId) {
        return res.status(400).json({ success: false, message: 'Audience mismatch. Unrecognized client application.' });
      }
      
      email = googleUser.email;
      name = googleUser.name;
      picture = googleUser.picture;
    } else {
      // Require token validation in production or if GOOGLE_CLIENT_ID is set
      if (process.env.NODE_ENV === 'production' || process.env.GOOGLE_CLIENT_ID) {
        return res.status(400).json({ success: false, message: 'Google credential token is required' });
      }
    }

    if (!email) {
      return res.status(400).json({ success: false, message: 'Google authentication did not return a valid email address' });
    }

    let user = await User.findOne({ email });
    if (!user) {
      // Create user if not exists
      const parts = (name || '').split(' ');
      const firstName = parts[0] || 'Google';
      const lastName = parts.slice(1).join(' ') || 'User';
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Math.random().toString(36), salt); // random password

      user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone: 'Not Specified',
        company: '',
      });
    }

    const sub = await Subscription.findOne({ userId: user._id });

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        company: user.company,
        role: user.role,
        status: user.status,
        subscription: sub,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
