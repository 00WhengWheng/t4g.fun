import { useState } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { LoginButton, LogoutButton, UserProfile } from '@/components/auth/AuthComponents'
import { ScanModal } from '@/components/ScanModal'
import { Button } from '@/components/ui/button'
import { QrCode } from 'lucide-react'

export const Route = createRootRoute({
  component: () => {
    const [isScanModalOpen, setIsScanModalOpen] = useState(false)

    const handleScanSuccess = (decodedText: string, scanType: 'QR' | 'NFC') => {
      console.log(`${scanType} scan result:`, decodedText)
      // You can add additional logic here to handle the scanned data
      alert(`${scanType} Scanned: ${decodedText}`)
      setIsScanModalOpen(false)
    }

    return (
      <>
        <div className="p-2 flex gap-2 items-center justify-between">
          <div className="flex gap-2">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>{' '}
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
            <Link to="/profile" className="[&.active]:font-bold">
              Profile
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsScanModalOpen(true)}
              className="flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              Scan
            </Button>
            <UserProfile />
            <LoginButton />
            <LogoutButton />
          </div>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
        
        <ScanModal
          isOpen={isScanModalOpen}
          onClose={() => setIsScanModalOpen(false)}
          onScanSuccess={handleScanSuccess}
        />
      </>
    )
  },
})