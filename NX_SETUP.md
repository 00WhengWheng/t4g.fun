# NX Monorepo Setup for T4G.fun

This document explains the NX monorepo configuration implemented to replace the previous Turborepo setup.

## Migration from Turborepo to NX

### Changes Made

#### 1. Removed Turborepo
- Uninstalled `turbo` package and removed from dependencies
- Deleted `turbo.json` configuration file  
- Removed `TURBOREPO_SETUP.md` documentation

#### 2. Installed and Configured NX
- Added `nx` as a dev dependency  
- Created `nx.json` configuration file with task definitions
- Updated root `package.json` scripts to use NX commands
- Applied guided NX initialization to configure task caching and outputs

#### 3. Fixed Development Setup Issues
- **Vite Configuration**: Updated `web/vite.config.ts` to properly resolve React dependencies in monorepo
- **Mobile Build**: Fixed missing `StyleSheet` import in `mobile/App.tsx`
- **Web Routes**: Fixed TypeScript syntax errors in route components

#### 4. Updated Build Scripts
- Root package now uses NX for coordinated builds: `npm run build`
- Individual project builds: `npm run web:build`, `npm run mobile:start`
- Development servers: `npm run dev`, `npm run web:dev`

## NX Configuration

### Task Definitions (nx.json)
```json
{
  "targetDefaults": {
    "build": {
      "outputs": ["{projectRoot}/dist"],
      "cache": true
    },
    "test": {
      "outputs": ["{projectRoot}/coverage"],
      "cache": true
    },
    "dev": {
      "cache": true
    },
    "lint": {
      "cache": true
    }
  }
}
```

## Available Commands

### Development
- `npm run dev` - Start all development servers
- `npm run web:dev` - Start only web development server
- `npm run mobile:start` - Start React Native packager

### Building  
- `npm run build` - Build all packages
- `npm run web:build` - Build only web application
- `npm run web:preview` - Preview web build

### Mobile Specific
- `npm run mobile:android` - Run on Android
- `npm run mobile:ios` - Run on iOS

### Other
- `npm run lint` - Lint all packages
- `npm run clean` - Clean all build outputs and caches

## Benefits of NX over Turborepo

1. **Better Caching**: NX provides more sophisticated caching strategies
2. **Task Dependencies**: Automatic task orchestration and dependency management
3. **Plugin Ecosystem**: Rich ecosystem of plugins for various tools
4. **Developer Tools**: Better dev experience with nx console and graph visualization
5. **Incremental Builds**: Only rebuilds what has changed
6. **Code Generation**: Built-in generators for creating new apps and libraries

## Project Structure

This is a monorepo containing:

- **web/** - React web application built with Vite
- **mobile/** - React Native mobile application  
- **shared/** - Shared types, utilities, and components

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

All projects should now build and run without dependency conflicts, with improved build performance thanks to NX caching.

## Troubleshooting

### Vite/React Resolution Issues
If you encounter React resolution issues in the web app, ensure:
- React dependencies are properly hoisted in the workspace
- `vite.config.ts` includes the dedupe configuration for React packages

### Cache Issues
To clear NX cache:
```bash
nx reset
```

## Next Steps

Consider exploring these NX features:
- **NX Graph**: Visualize project dependencies with `nx graph`
- **Code Generators**: Create new libraries/apps with `nx g`
- **Affected Commands**: Run tasks only for changed projects with `nx affected`