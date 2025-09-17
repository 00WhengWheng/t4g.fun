import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Navbar } from '@/components/navbar/Navbar'

function RootComponent() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Secondary navigation for pages */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="flex h-12 items-center space-x-6">
            <Link 
              to="/" 
              className="text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary [&.active]:font-semibold"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary [&.active]:font-semibold"
            >
              About
            </Link>
            <Link 
              to="/profile" 
              className="text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary [&.active]:font-semibold"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      
      <TanStackRouterDevtools />
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})