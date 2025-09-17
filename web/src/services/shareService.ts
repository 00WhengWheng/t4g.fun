// Types for share functionality
export type SocialPlatform = 'facebook' | 'instagram' | 'tiktok';

export interface ShareContent {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  hashtags?: string[];
}

export interface ShareResult {
  platform: SocialPlatform;
  success: boolean;
  response?: unknown;
  error?: string;
  timestamp: Date;
}

export interface SocialPlatformConfig {
  name: string;
  icon: string;
  color: string;
  enabled: boolean;
  apiConfig?: {
    appId?: string;
    permissions?: string[];
  };
}

export interface ShareCapabilities {
  hasNativeShare: boolean;
  supportedPlatforms: SocialPlatform[];
  canShareFiles: boolean;
  canShareText: boolean;
  canShareUrl: boolean;
}

// Social platform configurations
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
  instagram: {
    name: 'Instagram',
    icon: 'instagram',
    color: '#E4405F',
    enabled: true,
    apiConfig: {
      appId: import.meta.env?.VITE_INSTAGRAM_APP_ID,
      permissions: ['instagram_basic', 'instagram_content_publish'],
    },
  },
  tiktok: {
    name: 'TikTok',
    icon: 'music',
    color: '#000000',
    enabled: true,
    apiConfig: {
      appId: import.meta.env?.VITE_TIKTOK_APP_ID,
      permissions: ['video.publish'],
    },
  },
};

class ShareService {
  private capabilities: ShareCapabilities | null = null;

  // Initialize share capabilities
  async initializeCapabilities(): Promise<ShareCapabilities> {
    if (this.capabilities) {
      return this.capabilities;
    }

    const hasNativeShare = 'navigator' in window && 'share' in navigator;
    const supportedPlatforms: SocialPlatform[] = [];

    // Check platform availability
    Object.entries(socialPlatforms).forEach(([platform, config]) => {
      if (config.enabled) {
        supportedPlatforms.push(platform as SocialPlatform);
      }
    });

    this.capabilities = {
      hasNativeShare,
      supportedPlatforms,
      canShareFiles: hasNativeShare && 'files' in Navigator.prototype,
      canShareText: hasNativeShare,
      canShareUrl: hasNativeShare,
    };

    return this.capabilities;
  }

  // Get platform configuration
  getPlatformConfig(platform: SocialPlatform): SocialPlatformConfig {
    return socialPlatforms[platform];
  }

  // Get all enabled platforms
  getEnabledPlatforms(): SocialPlatform[] {
    return Object.entries(socialPlatforms)
      .filter(([, config]) => config.enabled)
      .map(([platform]) => platform as SocialPlatform);
  }

  // Native Web Share API
  async shareNative(content: ShareContent): Promise<ShareResult> {
    try {
      if (!navigator.share) {
        throw new Error('Native sharing not supported');
      }

      await navigator.share({
        title: content.title,
        text: content.description,
        url: content.url,
      });

      return {
        platform: 'facebook', // Generic for native share
        success: true,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        platform: 'facebook',
        success: false,
        error: error instanceof Error ? error.message : 'Share failed',
        timestamp: new Date(),
      };
    }
  }

  // Platform-specific sharing
  async shareToFacebook(content: ShareContent): Promise<ShareResult> {
    try {
      // For now, use Facebook's share dialog URL
      const shareUrl = new URL('https://www.facebook.com/sharer/sharer.php');
      shareUrl.searchParams.set('u', content.url);
      shareUrl.searchParams.set('quote', `${content.title}\n\n${content.description}`);
      
      // Open in popup window
      const popup = window.open(
        shareUrl.toString(),
        'facebook-share',
        'width=600,height=400,scrollbars=yes,resizable=yes'
      );

      return new Promise((resolve) => {
        const checkClosed = setInterval(() => {
          if (popup?.closed) {
            clearInterval(checkClosed);
            resolve({
              platform: 'facebook',
              success: true,
              timestamp: new Date(),
            });
          }
        }, 1000);

        // Auto-resolve after 30 seconds
        setTimeout(() => {
          clearInterval(checkClosed);
          resolve({
            platform: 'facebook',
            success: true,
            timestamp: new Date(),
          });
        }, 30000);
      });
    } catch (error) {
      return {
        platform: 'facebook',
        success: false,
        error: error instanceof Error ? error.message : 'Facebook share failed',
        timestamp: new Date(),
      };
    }
  }

  async shareToInstagram(_content: ShareContent): Promise<ShareResult> {
    try {
      // Instagram doesn't support direct URL sharing, so we'll use a fallback
      // In a real implementation, this would integrate with Instagram's API
      const instagramUrl = `https://www.instagram.com/`;
      window.open(instagramUrl, '_blank');

      // For now, just open Instagram and let user share manually
      return {
        platform: 'instagram',
        success: true,
        response: { message: 'Opened Instagram - please share manually' },
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        platform: 'instagram',
        success: false,
        error: error instanceof Error ? error.message : 'Instagram share failed',
        timestamp: new Date(),
      };
    }
  }

  async shareToTikTok(_content: ShareContent): Promise<ShareResult> {
    try {
      // TikTok doesn't support direct URL sharing, so we'll use a fallback
      const tiktokUrl = 'https://www.tiktok.com/';
      window.open(tiktokUrl, '_blank');

      return {
        platform: 'tiktok',
        success: true,
        response: { message: 'Opened TikTok - please share manually' },
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        platform: 'tiktok',
        success: false,
        error: error instanceof Error ? error.message : 'TikTok share failed',
        timestamp: new Date(),
      };
    }
  }

  // Main share method that routes to appropriate platform
  async shareToPlatform(platform: SocialPlatform, content: ShareContent): Promise<ShareResult> {
    switch (platform) {
      case 'facebook':
        return this.shareToFacebook(content);
      case 'instagram':
        return this.shareToInstagram(content);
      case 'tiktok':
        return this.shareToTikTok(content);
      default:
        return {
          platform,
          success: false,
          error: 'Unsupported platform',
          timestamp: new Date(),
        };
    }
  }

  // Copy to clipboard functionality
  async copyToClipboard(content: ShareContent): Promise<boolean> {
    try {
      const shareText = `${content.title}\n\n${content.description}\n\n${content.url}`;
      
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
        return success;
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }

  // tRPC endpoint placeholder - would connect to NestJS backend
  async sendToBackend(shareResult: ShareResult): Promise<void> {
    try {
      // Placeholder for tRPC call
      // In real implementation, this would be:
      // await trpc.share.logShareActivity.mutate(shareResult);
      
      console.log('Would send to backend via tRPC:', shareResult);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error('Failed to send share result to backend:', error);
    }
  }
}

export const shareService = new ShareService();