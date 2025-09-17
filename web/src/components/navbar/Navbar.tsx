import { Button } from "@/components/ui/button"
import { QrCode, Share2, Gamepad2, User } from "lucide-react"
import { useState } from "react"
import { ScanModal } from "@/components/ScanModal"
import { ShareModal } from "@/components/ShareModal"
import { LoginButton, LogoutButton, UserProfile } from "@/components/auth/AuthComponents"
import { useAuth0 } from "@auth0/auth0-react"

type SocialPlatform = 'facebook' | 'instagram' | 'tiktok';

export const Navbar = () => {
  const [isScanModalOpen, setIsScanModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const { isAuthenticated } = useAuth0()

  const handleScanSuccess = (decodedText: string, scanType: 'QR' | 'NFC') => {
    console.log(`${scanType} scan result:`, decodedText)
    alert(`${scanType} Scanned: ${decodedText}`)
    setIsScanModalOpen(false)
  }

  const handleShare = () => {
    setIsShareModalOpen(true)
  }

  const handleShareSuccess = (platform: SocialPlatform, response: unknown) => {
    console.log(`Share success on ${platform}:`, response)
  }

  const handleShareError = (platform: SocialPlatform, error: Error) => {
    console.error(`Share error on ${platform}:`, error)
  }

  const handleGame = () => {
    // Placeholder for game functionality
    alert("Game functionality coming soon!")
  }

  return (
    <>
      <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Left - Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-primary">
                T4G.fun
              </div>
            </div>

            {/* Center - Icon buttons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsScanModalOpen(true)}
                className="h-10 w-10"
                title="Scan"
              >
                <QrCode className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="h-10 w-10"
                title="Share"
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleGame}
                className="h-10 w-10"
                title="Game"
              >
                <Gamepad2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Right - Profile/Auth */}
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  <UserProfile />
                  <LogoutButton />
                </>
              ) : (
                <>
                  <User className="h-5 w-5 text-muted-foreground" />
                  <LoginButton />
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onScanSuccess={handleScanSuccess}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onShareSuccess={handleShareSuccess}
        onShareError={handleShareError}
      />
    </>
  )
}