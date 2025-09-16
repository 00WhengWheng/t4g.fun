import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Navbar } from '@/components/ui/navbar'

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
})