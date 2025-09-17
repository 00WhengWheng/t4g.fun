import { createRouter, RouterProvider } from '@tanstack/react-router'
import { Auth0Provider } from './auth/Auth0Provider'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return (
    <Auth0Provider>
      <RouterProvider router={router} />
    </Auth0Provider>
  )
}
