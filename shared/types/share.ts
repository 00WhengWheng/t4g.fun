export type SocialPlatform = 'facebook' | 'instagram' | 'tiktok';

export interface ShareContent {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  hashtags?: string[];
}

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  content?: ShareContent;
  onShareSuccess?: (platform: SocialPlatform, response: any) => void;
  onShareError?: (platform: SocialPlatform, error: Error) => void;
}

export interface ShareResult {
  platform: SocialPlatform;
  success: boolean;
  response?: any;
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