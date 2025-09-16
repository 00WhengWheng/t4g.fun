# Auth0 Integration Setup

This document describes how to set up Auth0 authentication for the T4G.fun application.

## Overview

The application now includes Auth0 authentication for both web and mobile platforms:
- **Web**: Uses `@auth0/auth0-react` SDK
- **Mobile**: Uses `react-native-auth0` SDK

## Web Application Setup

### 1. Environment Variables

Create a `.env` file in the `web/` directory with your Auth0 configuration:

```env
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=https://your-api.com
```

### 2. Auth0 Application Configuration

In your Auth0 Dashboard:
1. Create a new Single Page Application
2. Set the following URLs:
   - **Allowed Callback URLs**: `http://localhost:5173, https://your-production-domain.com`
   - **Allowed Logout URLs**: `http://localhost:5173, https://your-production-domain.com`
   - **Allowed Web Origins**: `http://localhost:5173, https://your-production-domain.com`

### 3. Features

- ✅ Login/Logout functionality
- ✅ Protected routes
- ✅ User profile display
- ✅ Navigation integration
- ✅ Token management

## Mobile Application Setup

### 1. Auth0 Configuration

The mobile app uses hardcoded configuration for demonstration. In production, you should:
1. Create a Native Application in Auth0 Dashboard
2. Configure the redirect URLs for your app scheme
3. Update the configuration in `mobile/src/auth/AuthProvider.tsx`

### 2. Required Configuration Steps

1. **iOS Setup**: Add URL scheme to `Info.plist`
2. **Android Setup**: Add intent filter to `AndroidManifest.xml`

Example iOS `Info.plist`:
```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>auth0</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>com.yourapp.auth0</string>
        </array>
    </dict>
</array>
```

Example Android `AndroidManifest.xml`:
```xml
<activity android:name="com.auth0.android.provider.WebAuthActivity"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="com.yourapp.auth0" />
    </intent-filter>
</activity>
```

### 3. Features

- ✅ Login/Logout functionality
- ✅ User profile screen
- ✅ Authentication state management
- ✅ Navigation integration
- ✅ Token storage

## Testing

### Web Application
1. Start the development server: `npm run web:dev`
2. Navigate to `http://localhost:5173`
3. Click "Log In" to test authentication
4. Visit the Profile page to see protected route behavior

### Mobile Application
1. Start Metro bundler: `npm run mobile:start`
2. Run on device/simulator: `npm run mobile:android` or `npm run mobile:ios`
3. Navigate to Profile screen to test authentication

## Security Considerations

1. **Environment Variables**: Never commit real Auth0 credentials to version control
2. **Token Storage**: 
   - Web: Uses `localstorage` with refresh tokens
   - Mobile: Uses secure credential manager
3. **HTTPS**: Always use HTTPS in production
4. **Logout**: Properly clear tokens and redirect users

## Troubleshooting

### Common Issues

1. **Configuration Error**: Check environment variables are set correctly
2. **Redirect Issues**: Verify callback URLs in Auth0 Dashboard
3. **Token Expiry**: The SDKs handle token refresh automatically
4. **CORS Issues**: Configure allowed origins in Auth0 Dashboard

### Debug Mode

Enable debug logging by setting:
- Web: Browser developer console
- Mobile: React Native debugger

## Production Deployment

1. Update environment variables with production Auth0 configuration
2. Configure production callback URLs in Auth0 Dashboard
3. Ensure HTTPS is enabled
4. Test authentication flow thoroughly
5. Monitor Auth0 Dashboard for usage and errors