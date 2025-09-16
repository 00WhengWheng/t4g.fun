import React, { createContext, useContext, useEffect, useState } from 'react';
import Auth0, { Credentials } from 'react-native-auth0';

// Replace these with your actual Auth0 configuration
const AUTH0_DOMAIN = 'dev-example.auth0.com';
const AUTH0_CLIENT_ID = 'example-mobile-client-id';

const auth0 = new Auth0({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
});

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  email_verified?: boolean;
  nickname?: string;
  sub?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app start
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const credentials = await auth0.credentialsManager.getCredentials();
      if (credentials?.accessToken) {
        const userInfo = await auth0.auth.userInfo({ token: credentials.accessToken });
        setUser({
          id: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
          email_verified: userInfo.email_verified,
          nickname: userInfo.nickname,
          sub: userInfo.sub,
        });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('No stored credentials found');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    try {
      setIsLoading(true);
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
      });
      
      await auth0.credentialsManager.saveCredentials(credentials);
      
      const userInfo = await auth0.auth.userInfo({ token: credentials.accessToken });
      setUser({
        id: userInfo.sub,
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
        email_verified: userInfo.email_verified,
        nickname: userInfo.nickname,
        sub: userInfo.sub,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await auth0.webAuth.clearSession();
      await auth0.credentialsManager.clearCredentials();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAccessToken = async (): Promise<string | null> => {
    try {
      const credentials = await auth0.credentialsManager.getCredentials();
      return credentials?.accessToken || null;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    getAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};