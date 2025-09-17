import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User } from 'lucide-react';

export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return null;
  }

  return (
    <Button onClick={() => loginWithRedirect()} variant="default">
      <LogIn className="mr-2 h-4 w-4" />
      Log In
    </Button>
  );
};

export const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Button 
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      variant="outline"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Log Out
    </Button>
  );
};

export const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <User className="h-4 w-4" />
      <span className="text-sm font-medium">{user.name || user.email}</span>
    </div>
  );
};