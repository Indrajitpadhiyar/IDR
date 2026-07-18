import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import Invoice from '../models/Invoice.js';
import Ticket from '../models/Ticket.js';

export const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already populated. Skipping seeding.');
      return;
    }

    console.log('Database is empty. Seeding mock data...');

    // 1. Create Users
    const hashedPassword = await bcrypt.hash('demo', 10);
    const adminHashedPassword = await bcrypt.hash('admin', 10);

    const usersData = [
      { firstName: 'Indrajit', lastName: 'Padhiyar', email: 'indrajit@idrtech.in', phone: '+91 97148 33771', company: 'IDRTECH', role: 'admin', status: 'Active', password: adminHashedPassword, address: 'Bharuch, Gujarat, India' },
      { firstName: 'Drumul', lastName: 'Thakor', email: 'drumul@idrtech.in', phone: '+91 98765 43210', company: 'Thakor Studios', role: 'user', status: 'Active', password: hashedPassword, address: 'Ahmedabad, Gujarat' },
      { firstName: 'Rohit', lastName: 'Patil', email: 'rohit@designstudio.com', phone: '+91 91234 56789', company: 'Design Studio', role: 'user', status: 'Active', password: hashedPassword, address: 'Pune, Maharashtra' },
      { firstName: 'Priya', lastName: 'Sharma', email: 'priya@techcorp.com', phone: '+91 87654 32100', company: 'TechCorp India', role: 'user', status: 'Expired', password: hashedPassword, address: 'Mumbai, Maharashtra' },
      { firstName: 'Amit', lastName: 'Patel', email: 'amit@startupx.io', phone: '+91 76543 21098', company: 'StartupX', role: 'user', status: 'Active', password: hashedPassword, address: 'Surat, Gujarat' },
      { firstName: 'Neha', lastName: 'Gupta', email: 'neha@fashionhub.in', phone: '+91 65432 10987', company: 'FashionHub', role: 'user', status: 'Pending', password: hashedPassword, address: 'Delhi, India' },
      { firstName: 'Rajesh', lastName: 'Kumar', email: 'rajesh@buildcraft.com', phone: '+91 54321 09876', company: 'BuildCraft', role: 'user', status: 'Suspended', password: hashedPassword, address: 'Jaipur, Rajasthan' },
      { firstName: 'Sneha', lastName: 'Reddy', email: 'sneha@webworks.co', phone: '+91 43210 98765', company: 'WebWorks', role: 'user', status: 'Active', password: hashedPassword, address: 'Hyderabad, Telangana' },
    ];

    const seededUsers = await User.insertMany(usersData);
    console.log(`Seeded ${seededUsers.length} users.`);

    // Map by email to lookup easily
    const userMap = {};
    seededUsers.forEach(user => {
      userMap[user.email] = user;
    });

    // 2. Create Subscriptions
    const subData = [
      { userId: userMap['indrajit@idrtech.in']._id, plan: 'Enterprise', price: 19999, status: 'Active', expiry: new Date('2027-01-12'), storageLimit: 100, storageUsed: 42, bandwidthLimit: 'Unlimited' },
      { userId: userMap['drumul@idrtech.in']._id, plan: 'Business', price: 7999, status: 'Active', expiry: new Date('2026-12-01'), storageLimit: 50, storageUsed: 12, bandwidthLimit: '500 GB' },
      { userId: userMap['rohit@designstudio.com']._id, plan: 'Enterprise', price: 19999, status: 'Active', expiry: new Date('2026-03-20'), storageLimit: 100, storageUsed: 15, bandwidthLimit: 'Unlimited' },
      { userId: userMap['priya@techcorp.com']._id, plan: 'Enterprise', price: 19999, status: 'Expired', expiry: new Date('2025-07-01'), storageLimit: 100, storageUsed: 80, bandwidthLimit: 'Unlimited' },
      { userId: userMap['amit@startupx.io']._id, plan: 'Basic', price: 2999, status: 'Active', expiry: new Date('2027-01-10'), storageLimit: 50, storageUsed: 5, bandwidthLimit: '500 GB' },
      { userId: userMap['neha@fashionhub.in']._id, plan: 'Enterprise', price: 19999, status: 'Active', expiry: new Date('2027-06-15'), storageLimit: 100, storageUsed: 0, bandwidthLimit: 'Unlimited' },
      { userId: userMap['rajesh@buildcraft.com']._id, plan: 'Basic', price: 2999, status: 'Suspended', expiry: new Date('2026-05-01'), storageLimit: 50, storageUsed: 22, bandwidthLimit: '500 GB' },
      { userId: userMap['sneha@webworks.co']._id, plan: 'Enterprise', price: 19999, status: 'Active', expiry: new Date('2027-02-20'), storageLimit: 100, storageUsed: 19, bandwidthLimit: 'Unlimited' },
    ];

    const seededSubs = await Subscription.insertMany(subData);
    console.log(`Seeded ${seededSubs.length} subscriptions.`);

    // 3. Create Invoices
    const invoicesData = [
      { invoiceId: 'INV-2026-001', userId: userMap['indrajit@idrtech.in']._id, plan: 'Enterprise Plan', amount: 19999, status: 'Paid', billingDate: new Date('2026-07-01') },
      { invoiceId: 'INV-2026-002', userId: userMap['amit@startupx.io']._id, plan: 'Basic Plan', amount: 2999, status: 'Paid', billingDate: new Date('2026-06-15') },
      { invoiceId: 'INV-2026-003', userId: userMap['neha@fashionhub.in']._id, plan: 'Enterprise Plan', amount: 19999, status: 'Pending', billingDate: new Date('2026-06-01') },
      { invoiceId: 'INV-2026-004', userId: userMap['drumul@idrtech.in']._id, plan: 'Business Plan', amount: 7999, status: 'Paid', billingDate: new Date('2026-05-20') },
      { invoiceId: 'INV-2026-005', userId: userMap['priya@techcorp.com']._id, plan: 'Enterprise Plan', amount: 19999, status: 'Refunded', billingDate: new Date('2026-05-01') },
      { invoiceId: 'INV-2026-006', userId: userMap['sneha@webworks.co']._id, plan: 'Enterprise Plan', amount: 19999, status: 'Paid', billingDate: new Date('2026-04-15') },
    ];

    const seededInvoices = await Invoice.insertMany(invoicesData);
    console.log(`Seeded ${seededInvoices.length} invoices.`);

    // 4. Create Support Tickets
    const ticketsData = [
      { ticketId: 'TKT-001', userId: userMap['indrajit@idrtech.in']._id, subject: 'Website not loading after DNS update', priority: 'High', status: 'Open', message: 'Hi team, our domain is pointing to the correct nameservers but returning a SSL error. Please inspect.', replies: [], createdAt: new Date('2026-07-10') },
      { ticketId: 'TKT-002', userId: userMap['drumul@idrtech.in']._id, subject: 'SSL certificate renewal help', priority: 'Medium', status: 'Pending', message: 'Hello, our staging environment certificate will expire in 2 days. Can we trigger automated updates?', replies: [], createdAt: new Date('2026-07-08') },
      { ticketId: 'TKT-003', userId: userMap['rohit@designstudio.com']._id, subject: 'Email configuration issue', priority: 'Low', status: 'Resolved', message: 'Need assistance setting up professional outlook smtp parameters on our web application portal.', replies: [{ senderId: userMap['indrajit@idrtech.in']._id, senderName: 'Indrajit Padhiyar', message: 'Parameters have been adjusted and tested successfully. Closing ticket.' }], createdAt: new Date('2026-07-05') },
      { ticketId: 'TKT-004', userId: userMap['amit@startupx.io']._id, subject: 'Hosting migration request', priority: 'High', status: 'Open', message: 'Please coordinate migrating our hosting stack from Heroku to custom VPS node instances.', replies: [], createdAt: new Date('2026-07-03') },
      { ticketId: 'TKT-005', userId: userMap['neha@fashionhub.in']._id, subject: 'Payment gateway error', priority: 'Critical', status: 'Pending', message: 'Users are experiencing 400 Bad Request error codes on razorpay checkout.', replies: [], createdAt: new Date('2026-06-28') },
      { ticketId: 'TKT-006', userId: userMap['sneha@webworks.co']._id, subject: 'Performance optimization request', priority: 'Medium', status: 'Resolved', message: 'Our lighthouse scores are below 80 on mobile device indexes.', replies: [], createdAt: new Date('2026-06-20') },
    ];

    const seededTickets = await Ticket.insertMany(ticketsData);
    console.log(`Seeded ${seededTickets.length} tickets.`);
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Database seeding failed:', error);
  }
};
