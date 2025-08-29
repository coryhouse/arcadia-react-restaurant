# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm start` - Start both the React app (port 3000) and JSON Server API (port 3001) concurrently
- `npm run start:app` - Start only the React app on port 3000
- `npm run start:api` - Start only the JSON Server API on port 3001
- `npm run build` - TypeScript compile and build for production
- `npm run lint` - Run ESLint with TypeScript support
- `npm run preview` - Preview the production build
- `npm run pw` - Run Playwright end-to-end tests

## Architecture Overview

This is a React restaurant menu application built with modern TypeScript tooling:

### Core Stack

- **React 19** with TypeScript and Vite for fast development
- **TanStack Router** for file-based routing with type-safe navigation
- **TanStack DB** for server state management with optimistic updates
- **Tailwind CSS 4** for styling
- **JSON Server** as a mock REST API backend
- **Zod** for runtime type validation
- **Playwright** for end-to-end testing

### Key Architectural Patterns

1. **Tanstack DB Collections**: All API interactions are handled in `src/collections` using TanStack DB's collection API.

2. **File-based Routing**: Routes are defined in `src/routes/` with TanStack Router's file-based routing system. The route tree is auto-generated in `routeTree.gen.ts`.

3. **Type-safe Parameters**: Route parameters are validated using Zod schemas, ensuring type safety throughout the routing system.

4. **Centralized Error Handling**: Global error boundaries and route-level error components provide consistent error handling.

### Data Flow

- **API Base URL**: `http://localhost:3001/foods` (JSON Server)
- **Data Validation**: All API responses are validated using Zod schemas defined in `src/food.ts`
- **State Management**: Server state managed by TanStack DB, local UI state with React hooks
- **Optimistic Updates**: Mutations automatically invalidate and refetch related queries

### File Structure

- `src/routes/` - File-based routing components
- `src/collections/` - TanStack DB collections for API interactions
- `src/shared/` - Reusable UI components
- `src/types/` - TypeScript type definitions
- `db.json` - Mock database for JSON Server
- `tests/` - Playwright test files

### Development Notes

- The app requires both frontend and API servers running (`npm start`)
- Route parameters use TanStack Router's type-safe parameter parsing
- All forms use controlled components with validation
- Images are served statically from `public/images/`
- Toast notifications use Sonner library
- The app includes TanStack Router Devtools for debugging
- After adding any new feature, add a Playwright test, or enhance an existing one.
