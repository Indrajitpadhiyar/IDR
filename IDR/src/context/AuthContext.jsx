import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'idrtech_auth';

function getStoredAuth() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return null;
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    const stored = getStoredAuth();
    return stored || { isAuthenticated: false, user: null, isAdmin: false };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  const login = useCallback(async (email, password) => {
    try {
      const hostname = window.location.hostname;
      const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
      let baseUrl = isLocal ? "http://localhost:4000" : "https://idr-backend-49rq.onrender.com";

      if (import.meta.env.VITE_API_BASE) {
        const envUrl = import.meta.env.VITE_API_BASE.replace(/^"(.*)"$/, "$1").replace(/\/$/, "");
        if (!(isLocal === false && envUrl.includes("localhost"))) {
          baseUrl = envUrl;
        }
      }

      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const authData = {
          isAuthenticated: true,
          user: {
            ...data.user,
            token: data.token,
          },
          isAdmin: data.user.role === 'admin',
        };
        setAuthState(authData);
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Invalid email or password' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Server error occurred' };
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      const hostname = window.location.hostname;
      const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
      let baseUrl = isLocal ? "http://localhost:4000" : "https://idr-backend-49rq.onrender.com";

      if (import.meta.env.VITE_API_BASE) {
        const envUrl = import.meta.env.VITE_API_BASE.replace(/^"(.*)"$/, "$1").replace(/\/$/, "");
        if (!(isLocal === false && envUrl.includes("localhost"))) {
          baseUrl = envUrl;
        }
      }

      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        const authData = {
          isAuthenticated: true,
          user: {
            ...data.user,
            token: data.token,
          },
          isAdmin: data.user.role === 'admin',
        };
        setAuthState(authData);
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Server error occurred' };
    }
  }, []);

  const logout = useCallback(() => {
    setAuthState({ isAuthenticated: false, user: null, isAdmin: false });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const loginWithGoogle = useCallback(async (googleToken) => {
    try {
      const base64Url = googleToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(jsonPayload);

      if (payload && payload.email) {
        const hostname = window.location.hostname;
        const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
        let baseUrl = isLocal ? "http://localhost:4000" : "https://idr-backend-49rq.onrender.com";

        if (import.meta.env.VITE_API_BASE) {
          const envUrl = import.meta.env.VITE_API_BASE.replace(/^"(.*)"$/, "$1").replace(/\/$/, "");
          if (!(isLocal === false && envUrl.includes("localhost"))) {
            baseUrl = envUrl;
          }
        }

        const response = await fetch(`${baseUrl}/api/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
          }),
        });

        const data = await response.json();

        if (data.success) {
          const authData = {
            isAuthenticated: true,
            user: {
              ...data.user,
              token: data.token,
            },
            isAdmin: data.user.role === 'admin',
          };
          setAuthState(authData);
          return { success: true };
        } else {
          return { success: false, error: data.message || 'Google authentication failed' };
        }
      }
    } catch (e) {
      console.error('Google token parsing/auth error', e);
    }
    return { success: false, error: 'Google login failed' };
  }, []);

  const updateProfile = useCallback((updates) => {
    setAuthState((prev) => ({
      ...prev,
      user: { ...prev.user, ...updates },
    }));
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const hostname = window.location.hostname;
      const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
      let baseUrl = isLocal ? "http://localhost:4000" : "https://idr-backend-49rq.onrender.com";

      if (import.meta.env.VITE_API_BASE) {
        const envUrl = import.meta.env.VITE_API_BASE.replace(/^"(.*)"$/, "$1").replace(/\/$/, "");
        if (!(isLocal === false && envUrl.includes("localhost"))) {
          baseUrl = envUrl;
        }
      }

      const stored = localStorage.getItem(STORAGE_KEY);
      const auth = stored ? JSON.parse(stored) : null;
      const token = auth?.user?.token;

      if (!token) return { success: false };

      const response = await fetch(`${baseUrl}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setAuthState((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            ...data.user,
          },
        }));
        return { success: true };
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
    return { success: false };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        loginWithGoogle,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
