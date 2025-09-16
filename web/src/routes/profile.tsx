import { createFileRoute } from '@tanstack/react-router'
import { useAuth0 } from '@auth0/auth0-react'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function Profile() {
  const { user, isAuthenticated } = useAuth0()

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <ProtectedRoute>
      <div className="p-2">
        <div className="max-w-2xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">User Profile</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your account details from Auth0</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-sm">{user.name || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-sm">{user.email || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nickname</label>
                  <p className="text-sm">{user.nickname || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email Verified</label>
                  <p className="text-sm">{user.email_verified ? 'Yes' : 'No'}</p>
                </div>
              </div>
              
              {user.picture && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Profile Picture</label>
                  <div className="mt-2">
                    <img 
                      src={user.picture} 
                      alt="Profile" 
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">User ID</label>
                <p className="text-xs font-mono bg-muted p-2 rounded">{user.sub}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export const Route = createFileRoute('/profile')({
  component: Profile,
})