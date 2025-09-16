import { useAuth0 } from '@auth0/auth0-react';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Authentication Required</h2>
          <p className="text-muted-foreground">Please log in to access this page.</p>
          <button 
            onClick={() => loginWithRedirect()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};