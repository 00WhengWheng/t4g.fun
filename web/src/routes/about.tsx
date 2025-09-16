import { createFileRoute } from '@tanstack/react-router'

function About() {
  return (
    <div className="p-2">
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">About Tag 4 Gift</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-muted-foreground mb-4">
            Tag 4 Gift (T4G.fun) is a modern web and mobile application designed to make gift tagging simple and fun.
          </p>
          <h2 className="text-xl font-semibold mb-3">Technology Stack</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• React with TypeScript for type safety</li>
            <li>• Vite for fast development and building</li>
            <li>• TanStack Router for modern routing</li>
            <li>• shadcn/ui for beautiful components</li>
            <li>• Tailwind CSS for styling</li>
            <li>• React Native for mobile applications</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/about')({
  component: About,
})