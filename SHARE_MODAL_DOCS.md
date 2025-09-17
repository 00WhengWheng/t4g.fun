# Share Modal Implementation

This document describes the implementation of the social media sharing functionality in the T4G.fun application.

## Overview

The share modal component enables users to share content to Facebook, Instagram, and TikTok, as well as copy content to clipboard. It follows the same design patterns as the existing ScanModal and GameModal components.

## Architecture

### Components

#### `ShareModal.tsx`
- Main modal component using shadcn/ui Dialog
- Handles platform-specific sharing logic
- Provides copy-to-clipboard functionality
- Displays share history and success/error states

#### `shareService.ts`
- Service layer for managing social media integrations
- Platform configuration management
- Backend communication via tRPC (placeholder)
- Native Web Share API support

### Types (`shared/types/share.ts`)

```typescript
// Core sharing types
SocialPlatform: 'facebook' | 'instagram' | 'tiktok'
ShareContent: { title, description, url, imageUrl?, hashtags? }
ShareResult: { platform, success, response?, error?, timestamp }
ShareModalProps: { isOpen, onClose, content?, onShareSuccess?, onShareError? }
```

## Features

### ✅ Implemented Features

- **UI/UX Consistency**: Follows exact same patterns as ScanModal and GameModal
- **Social Media Platforms**: 
  - Facebook sharing via share dialog
  - Instagram and TikTok integration (opens platform for manual sharing)
  - Platform-specific icons and colors
- **Copy to Clipboard**: Full content copying with success feedback
- **Share History**: Real-time tracking of share attempts and results
- **Error Handling**: Comprehensive error states and user feedback
- **tRPC Backend Integration**: Service ready for NestJS backend connection
- **Native Web Share**: Browser native sharing API support
- **TypeScript**: Full type safety with shared types

### 📋 Content Sharing

Default shared content includes:
- **Title**: "T4G.fun - Tag 4 Gift"
- **Description**: Platform description with value proposition
- **URL**: Current page URL
- **Hashtags**: #T4GFun, #Gaming, #QRCode, #ShareTheFun

Content can be customized via the `content` prop.

### 🔗 Platform Integration

#### Facebook
- Uses Facebook's share dialog (`sharer.php`)
- Opens in popup window
- Supports URL and quote text
- Production: Can integrate with Facebook SDK

#### Instagram
- Currently opens Instagram homepage
- Production: Integrate with Instagram Basic Display API
- Requires app registration and user permissions

#### TikTok
- Currently opens TikTok homepage  
- Production: Integrate with TikTok for Developers API
- Requires app registration and content publishing permissions

## Integration

### Navbar Integration

```tsx
import { ShareModal } from '@/components/ShareModal'
import type { SocialPlatform } from '../../../shared/types/share'

// Add state and handlers
const [isShareModalOpen, setIsShareModalOpen] = useState(false)

const handleShareSuccess = (platform: SocialPlatform, response: unknown) => {
  console.log(`Share success on ${platform}:`, response)
}

const handleShareError = (platform: SocialPlatform, error: Error) => {
  console.error(`Share error on ${platform}:`, error)
}

// Render modal
<ShareModal
  isOpen={isShareModalOpen}
  onClose={() => setIsShareModalOpen(false)}
  onShareSuccess={handleShareSuccess}
  onShareError={handleShareError}
/>
```

### Backend tRPC Integration

The share service includes a placeholder for tRPC backend communication:

```typescript
// Current implementation (placeholder)
async sendToBackend(shareResult: ShareResult): Promise<void> {
  console.log('Would send to backend via tRPC:', shareResult);
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 100));
}

// Production implementation would be:
// await trpc.share.logShareActivity.mutate(shareResult);
```

## Configuration

### Environment Variables

```env
# Social Media API Keys (for production)
VITE_FACEBOOK_APP_ID=your-facebook-app-id
VITE_INSTAGRAM_APP_ID=your-instagram-app-id  
VITE_TIKTOK_APP_ID=your-tiktok-app-id
```

### Platform Configuration

Platform settings are managed in `shareService.ts`:

```typescript
const socialPlatforms: Record<SocialPlatform, SocialPlatformConfig> = {
  facebook: {
    name: 'Facebook',
    icon: 'facebook',
    color: '#1877F2',
    enabled: true,
    apiConfig: {
      appId: import.meta.env?.VITE_FACEBOOK_APP_ID,
      permissions: ['publish_to_groups', 'pages_manage_posts'],
    },
  },
  // ... other platforms
}
```

## Testing

### Manual Testing Completed

1. ✅ Modal opens from navbar Share button
2. ✅ Content preview displays correctly
3. ✅ Facebook sharing opens share dialog
4. ✅ Copy to clipboard works with success feedback
5. ✅ Share history tracking functions
6. ✅ Modal closes properly
7. ✅ Error handling works
8. ✅ TypeScript compilation passes
9. ✅ Build process succeeds

### Automated Testing

No automated tests currently exist in the repository. For future implementation:

```typescript
// Example test structure
describe('ShareModal', () => {
  it('should open and display content correctly')
  it('should handle Facebook sharing')
  it('should copy content to clipboard')
  it('should track share history')
  it('should handle errors gracefully')
})
```

## Future Enhancements

### Short Term
- [ ] Add native Web Share API detection and fallback
- [ ] Implement share analytics tracking
- [ ] Add custom content per platform
- [ ] Support image/file sharing

### Medium Term  
- [ ] Full Facebook SDK integration with proper permissions
- [ ] Instagram Content Publishing API integration
- [ ] TikTok Content Publishing API integration
- [ ] tRPC backend endpoint implementation

### Long Term
- [ ] Additional platforms (Twitter/X, LinkedIn, WhatsApp)
- [ ] Tenant-specific sharing configurations
- [ ] Advanced analytics and reporting
- [ ] A/B testing for share content optimization

## Dependencies

### New Dependencies
None - uses existing project dependencies:
- `@radix-ui/react-dialog` (already installed)
- `lucide-react` (already installed)
- `shadcn/ui` components (already installed)

### Development Dependencies
No additional development dependencies required.

## Security Considerations

1. **API Keys**: Store in environment variables, never commit to repository
2. **CORS**: Configure allowed origins for production domains
3. **Content Validation**: Sanitize user-provided content before sharing
4. **Rate Limiting**: Implement backend rate limiting for share endpoints
5. **Privacy**: Respect user privacy preferences and platform policies

## Maintenance

### Regular Tasks
- Monitor platform API changes and update integrations
- Review and update platform permissions as needed
- Check for security updates in sharing-related dependencies
- Update platform branding/colors as needed

### Monitoring
- Track share success/failure rates
- Monitor backend API performance
- Log and analyze share patterns for optimization

## Troubleshooting

### Common Issues

1. **Platform not opening**: Check popup blockers and browser settings
2. **Copy not working**: Verify HTTPS and clipboard permissions
3. **Backend errors**: Check tRPC endpoint configuration
4. **Styling issues**: Verify shadcn/ui component versions

### Debug Mode

Enable detailed logging:
```typescript
// In shareService.ts
console.log('Share attempt:', { platform, content });
console.log('Share result:', result);
```