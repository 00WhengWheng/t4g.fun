import * as React from "react"
import { Link } from "@tanstack/react-router"
import { Scan, Share, Gamepad2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavbarProps {
  className?: string
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          className
        )}
        {...props}
      >
        <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold hover:text-primary transition-colors"
            >
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                T4G
              </div>
              <span className="hidden sm:inline-block">Tag 4 Gift</span>
            </Link>
          </div>

          {/* Center Icon Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 sm:h-10 sm:w-10"
              aria-label="Scan"
            >
              <Scan className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 sm:h-10 sm:w-10"
              aria-label="Share"
            >
              <Share className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 sm:h-10 sm:w-10"
              aria-label="Games"
            >
              <Gamepad2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          {/* Profile Section */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 sm:h-10 sm:w-10"
              aria-label="Profile"
            >
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </nav>
    )
  }
)
Navbar.displayName = "Navbar"

export { Navbar }