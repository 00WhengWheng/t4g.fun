import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function Index() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-2">
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Tag 4 Gift
            </h1>
            <p className="text-xl text-muted-foreground">
              Welcome to T4G.fun - Your Gift Tagging Solution
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>React + Vite</CardTitle>
                <CardDescription>
                  Modern web development with fast HMR
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Built with React 19 and Vite for the best developer experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>TanStack Router</CardTitle>
                <CardDescription>
                  Type-safe routing for React applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Modern, file-based routing with full TypeScript support.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>shadcn/ui + Tailwind</CardTitle>
                <CardDescription>
                  Beautiful, accessible component library
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pre-built components with Tailwind CSS for rapid development.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => setCount((count) => count + 1)}
              size="lg"
            >
              Count is {count}
            </Button>
            <div className="flex gap-2 justify-center">
              <Button variant="outline">Outline Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with React, Vite, TanStack Router, and shadcn/ui
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})