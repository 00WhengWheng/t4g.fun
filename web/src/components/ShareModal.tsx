import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Share2, 
  Facebook, 
  Instagram, 
  Music, 
  Copy, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Loader2
} from 'lucide-react';

// Types for share functionality
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
  onShareSuccess?: (platform: SocialPlatform, response: unknown) => void;
  onShareError?: (platform: SocialPlatform, error: Error) => void;
}

export interface ShareResult {
  platform: SocialPlatform;
  success: boolean;
  response?: unknown;
  error?: string;
  timestamp: Date;
}

export interface ShareCapabilities {
  hasNativeShare: boolean;
  supportedPlatforms: SocialPlatform[];
  canShareFiles: boolean;
  canShareText: boolean;
  canShareUrl: boolean;
}

import { shareService } from '@/services/shareService';

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  content,
  onShareSuccess,
  onShareError,
}) => {
  const [capabilities, setCapabilities] = useState<ShareCapabilities | null>(null);
  const [shareResults, setShareResults] = useState<ShareResult[]>([]);
  const [isLoading, setIsLoading] = useState<Record<SocialPlatform | 'copy' | 'native', boolean>>({
    facebook: false,
    instagram: false,
    tiktok: false,
    copy: false,
    native: false,
  });
  const [copySuccess, setCopySuccess] = useState(false);

  // Default content if none provided
  const defaultContent: ShareContent = {
    title: 'T4G.fun - Tag 4 Gift',
    description: 'Join the fun with T4G.fun! Discover games, scan QR codes, and share experiences with friends.',
    url: window.location.href,
    hashtags: ['T4GFun', 'Gaming', 'QRCode', 'ShareTheFun'],
  };

  const shareContent = content || defaultContent;

  // Initialize capabilities when modal opens
  useEffect(() => {
    if (isOpen) {
      initializeCapabilities();
      setShareResults([]);
      setCopySuccess(false);
    }
  }, [isOpen]);

  const initializeCapabilities = async () => {
    try {
      const caps = await shareService.initializeCapabilities();
      setCapabilities(caps);
    } catch (error) {
      console.error('Failed to initialize share capabilities:', error);
    }
  };

  const handleShare = async (platform: SocialPlatform) => {
    setIsLoading(prev => ({ ...prev, [platform]: true }));
    
    try {
      const result = await shareService.shareToPlatform(platform, shareContent);
      setShareResults(prev => [...prev, result]);

      // Send to backend
      await shareService.sendToBackend(result);

      if (result.success) {
        onShareSuccess?.(platform, result.response);
      } else {
        onShareError?.(platform, new Error(result.error || 'Share failed'));
      }
    } catch (error) {
      const errorResult: ShareResult = {
        platform,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
      };
      setShareResults(prev => [...prev, errorResult]);
      onShareError?.(platform, error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      setIsLoading(prev => ({ ...prev, [platform]: false }));
    }
  };

  const handleNativeShare = async () => {
    if (!capabilities?.hasNativeShare) return;

    setIsLoading(prev => ({ ...prev, native: true }));
    
    try {
      const result = await shareService.shareNative(shareContent);
      setShareResults(prev => [...prev, result]);

      if (result.success) {
        onShareSuccess?.('facebook', result.response); // Using facebook as generic platform
      } else {
        onShareError?.('facebook', new Error(result.error || 'Native share failed'));
      }
    } catch (error) {
      onShareError?.('facebook', error instanceof Error ? error : new Error('Native share failed'));
    } finally {
      setIsLoading(prev => ({ ...prev, native: false }));
    }
  };

  const handleCopyToClipboard = async () => {
    setIsLoading(prev => ({ ...prev, copy: true }));
    
    try {
      const success = await shareService.copyToClipboard(shareContent);
      setCopySuccess(success);
      
      if (success) {
        setTimeout(() => setCopySuccess(false), 3000); // Reset after 3 seconds
      }
    } catch (error) {
      console.error('Copy failed:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, copy: false }));
    }
  };

  const getPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'tiktok':
        return <Music className="h-5 w-5" />;
      default:
        return <Share2 className="h-5 w-5" />;
    }
  };

  const getPlatformColor = (platform: SocialPlatform) => {
    const config = shareService.getPlatformConfig(platform);
    return config.color;
  };

  const handleClose = () => {
    setShareResults([]);
    setCopySuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Content
          </DialogTitle>
          <DialogDescription>
            Share this content on social media platforms or copy the link
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Content Preview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Content to Share</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="font-medium text-sm">{shareContent.title}</p>
                <p className="text-xs text-muted-foreground">{shareContent.description}</p>
                <p className="text-xs text-blue-600 break-all">{shareContent.url}</p>
              </div>
              {shareContent.hashtags && shareContent.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {shareContent.hashtags.map(tag => (
                    <span key={tag} className="text-xs text-blue-600">#{tag}</span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Native Share (if available) */}
          {capabilities?.hasNativeShare && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Quick Share</h3>
              <Button
                onClick={handleNativeShare}
                disabled={isLoading.native}
                variant="outline"
                className="w-full"
              >
                {isLoading.native ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Share2 className="h-4 w-4 mr-2" />
                )}
                Share via System
              </Button>
            </div>
          )}

          {/* Social Media Platforms */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Social Media Platforms</h3>
            <div className="grid grid-cols-1 gap-2">
              {capabilities?.supportedPlatforms.map(platform => (
                <Button
                  key={platform}
                  onClick={() => handleShare(platform)}
                  disabled={isLoading[platform]}
                  variant="outline"
                  className="w-full justify-start"
                  style={{ 
                    borderColor: getPlatformColor(platform),
                    color: getPlatformColor(platform)
                  }}
                >
                  {isLoading[platform] ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <>
                      {getPlatformIcon(platform)}
                      <span className="ml-2">Share on {shareService.getPlatformConfig(platform).name}</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Copy to Clipboard */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Copy Link</h3>
            <Button
              onClick={handleCopyToClipboard}
              disabled={isLoading.copy}
              variant="outline"
              className="w-full"
            >
              {isLoading.copy ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : copySuccess ? (
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
            </Button>
          </div>

          {/* Share Results */}
          {shareResults.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Share History</h3>
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {shareResults.map((result, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs p-2 rounded bg-muted">
                    {result.success ? (
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                    ) : (
                      <AlertCircle className="h-3 w-3 text-red-600" />
                    )}
                    <span className="font-medium capitalize">{result.platform}</span>
                    <span className="text-muted-foreground">
                      {result.success ? 'Shared successfully' : result.error}
                    </span>
                    <span className="text-muted-foreground ml-auto">
                      {result.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};