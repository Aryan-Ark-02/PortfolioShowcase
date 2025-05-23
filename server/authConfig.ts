// Auth/session/redirect config and hooks

export interface AuthConfig {
  defaultRedirect: string;
  loginRedirect: string;
  signupRedirect: string;
  failureRedirect: string;
  sessionOptions: {
    secret: string;
    resave: boolean;
    saveUninitialized: boolean;
    cookie?: Record<string, any>;
  };
  // Hook for custom user creation logic
  createUserHook?: (user: any) => Promise<any>;
}

export const authConfig: AuthConfig = {
  defaultRedirect: '/',
  loginRedirect: '/',
  signupRedirect: '/login',
  failureRedirect: '/login?error=auth',
  sessionOptions: {
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    // cookie: { maxAge: 24 * 60 * 60 * 1000 }, // Example: 1 day
  },
  createUserHook: undefined, // You can override this for custom logic
}; 