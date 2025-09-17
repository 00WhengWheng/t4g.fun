# Turborepo Setup for T4G.fun

This document explains the Turborepo configuration implemented to resolve dependency conflicts between React and React Native projects.

## Changes Made

### 1. Installed and Configured Turborepo
- Added `turbo` as a dev dependency
- Created `turbo.json` configuration file
- Updated root `package.json` scripts to use Turborepo commands

### 2. Resolved React Version Conflicts
- **Before**: Web used React 19.1.1, Mobile used React 18.3.1 (conflict!)
- **After**: Both projects now use React 18.3.1 (compatible with React Native 0.72.17)
- Updated `@types/react` versions to match across all packages

### 3. Created Shared Package Structure
- Added `shared/package.json` with proper TypeScript configuration
- Created `shared/tsconfig.json` for building shared types and utilities
- Added `shared/index.ts` to export common types and utilities

### 4. Updated Build Scripts
- Root package now uses Turborepo for coordinated builds: `npm run build`
- Individual project builds: `npm run web:build`, `npm run mobile:start`
- Added TypeScript validation for mobile: `npm run build` now includes mobile TS check

### 5. Enhanced Monorepo Management
- Turborepo provides dependency-aware task execution
- Caching for faster subsequent builds
- Parallel execution where possible

## Available Commands

### Development
- `npm run dev` - Start all development servers
- `npm run web:dev` - Start only web development server
- `npm run mobile:start` - Start React Native packager

### Building
- `npm run build` - Build all packages (shared, web, mobile TS validation)
- `npm run web:build` - Build only web application

### Mobile Specific
- `npm run mobile:android` - Run on Android
- `npm run mobile:ios` - Run on iOS

### Other
- `npm run lint` - Lint all packages
- `npm run clean` - Clean all build outputs and caches

## Dependency Resolution

### React Ecosystem Alignment
All projects now use compatible React versions:
- **React**: 18.3.1 (web and mobile)
- **React DOM**: 18.3.1 (web only)
- **React Native**: 0.72.17 (mobile only, compatible with React 18)

### Shared Dependencies
The `shared` package uses peer dependencies for React to avoid version conflicts and allow each consuming package to provide its own React version.

## Benefits

1. **No More Dependency Conflicts**: All React versions are now aligned
2. **Faster Builds**: Turborepo caching reduces build times
3. **Better Developer Experience**: Clear separation of concerns with shared utilities
4. **Parallel Execution**: Multiple packages can build simultaneously
5. **Dependency-Aware Builds**: Shared package builds before consuming packages

## Testing the Setup

To verify everything works:

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Start web development
npm run web:dev

# In another terminal, start mobile (requires React Native setup)
npm run mobile:start
```

Both projects should now build and run without dependency conflicts.