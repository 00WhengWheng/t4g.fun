import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { LoginButton, LogoutButton, UserProfile } from '@/components/auth/AuthComponents'

export const Route = createRootRoute({
  component: () => (
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
          <UserProfile />
          <LoginButton />
          <LogoutButton />
        </div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})