import { Auth0Provider as Auth0ProviderBase } from '@auth0/auth0-react';
import type { ReactNode } from 'react';

interface Auth0ProviderProps {
  children: ReactNode;
}

export const Auth0Provider = ({ children }: Auth0ProviderProps) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  
  if (!domain || !clientId) {
    console.error('Auth0 configuration missing. Please check your environment variables.');
    return <div>Auth0 configuration error</div>;
  }
  
  return (
    <Auth0ProviderBase
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0ProviderBase>
  );
};