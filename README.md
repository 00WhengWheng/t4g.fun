# Tag 4 Gift (T4G.fun)

A modern, cross-platform gift tagging solution built with React and React Native.

## Project Structure

This is a monorepo containing:

- **web/** - React web application built with Vite
- **mobile/** - React Native mobile application
- **shared/** - Shared types, utilities, and components

## Technology Stack

### Web Application
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **TanStack Router** for modern, type-safe routing
- **shadcn/ui** for beautiful, accessible components
- **Tailwind CSS** for utility-first styling
- **Lucide React** for consistent icons

### Mobile Application
- **React Native** for cross-platform mobile development
- **React 18** for compatibility with web application
- **React Navigation** for native navigation
- **TypeScript** for type safety
- **Native styling** with React Native StyleSheet

### Shared
- **TypeScript** interfaces and types
- **Utility functions** for common operations
- **Shared components** (planned)
- **Turborepo** for monorepo management and build optimization

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- For mobile development: React Native development environment

### Installation

1. Clone the repository
```bash
git clone https://github.com/00WhengWheng/t4g.fun.git
cd t4g.fun
```

2. Install dependencies for all projects
```bash
npm install
```

### Development

#### All Projects
```bash
npm run dev
```

#### Web Application
```bash
npm run web:dev
```
Open http://localhost:5173 in your browser.

#### Mobile Application
```bash
npm run mobile:start
```

For Android:
```bash
npm run mobile:android
```

For iOS:
```bash
npm run mobile:ios
```

### Building

#### All Projects
```bash
npm run build
```

#### Web Application
```bash
npm run web:build
```

### Features

- ✅ Modern React web application with Vite
- ✅ TanStack Router for type-safe routing
- ✅ shadcn/ui component library integration
- ✅ Tailwind CSS styling
- ✅ React Native mobile application structure
- ✅ React Navigation for mobile routing
- ✅ Shared TypeScript types and utilities
- ✅ Monorepo structure with **Turborepo** for optimized builds
- ✅ **Resolved React dependency conflicts** between web and mobile
- ✅ **Shared TypeScript types and utilities**
- ✅ **Auth0 authentication system** 🔐
- ✅ **Protected routes and user profiles**
- ✅ **Cross-platform authentication (Web & Mobile)**

### Future Enhancements

- [ ] Backend API integration
- [ ] Gift management functionality
- [ ] Tag creation and management
- [ ] User-specific gift lists
- [ ] Push notifications (mobile)
- [ ] Progressive Web App (PWA) features

## License

MIT License - see LICENSE file for details.
