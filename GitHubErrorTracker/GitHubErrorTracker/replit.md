# Garden Trade Hub

## Overview

Garden Trade Hub is a full-stack web application that facilitates plant and garden supply trading through a Discord-integrated platform. The application allows users to create, browse, and manage trade listings for plants, seeds, tools, and garden supplies within their local community. The system features a React frontend with a Node.js/Express backend, using PostgreSQL for data persistence and Discord bot integration for seamless community interaction.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared code:

- **Frontend**: React 18 + TypeScript with Vite bundler for fast development and optimized production builds
- **Backend**: Node.js + Express with TypeScript providing RESTful API endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **UI Framework**: Tailwind CSS with shadcn/ui component library built on Radix UI primitives
- **State Management**: TanStack Query for efficient server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build System**: Vite for frontend bundling, esbuild for backend compilation

## Key Components

### Frontend Architecture
- **Component Library**: shadcn/ui components providing consistent, accessible UI elements
- **Form Management**: React Hook Form with Zod validation for type-safe form handling
- **Styling System**: Tailwind CSS with custom garden-themed color palette and responsive design
- **Query Management**: TanStack Query handles API calls, caching, and synchronization
- **Toast Notifications**: Custom toast system for user feedback and error handling

### Backend Architecture
- **Express Server**: RESTful API with middleware for request logging and error handling
- **Database Layer**: Drizzle ORM providing type-safe database queries and migrations
- **Storage Interface**: Abstract storage layer with in-memory implementation for development
- **API Structure**: Organized route handlers for trades, users, and metadata endpoints

### Database Schema
- **Users Table**: Stores Discord user information including display names, usernames, and locations
- **Trades Table**: Contains trade listings with offering/seeking items, descriptions, categories, status, and timestamps
- **Relationships**: Foreign key constraints linking trades to users with proper referential integrity

### UI Design System
- **Color Scheme**: Garden-themed palette featuring forest green primary colors and earth tones
- **Typography**: Clean, readable font hierarchy with consistent spacing and sizing
- **Component Architecture**: Atomic design principles with reusable components
- **Responsive Layout**: Mobile-first approach with breakpoint-based responsive design

## Data Flow

1. **User Authentication**: Discord OAuth integration (currently simulated with hardcoded user IDs for development)
2. **Trade Creation**: Users create trade listings through web interface or Discord bot commands
3. **Trade Browsing**: Real-time filtering and sorting of trade listings with search functionality
4. **Trade Management**: Status updates (open, pending, completed, cancelled) and user interaction tracking
5. **API Communication**: JSON-based REST API with comprehensive error handling and validation
6. **State Synchronization**: TanStack Query manages client-server state synchronization and optimistic updates

## External Dependencies

- **Database**: PostgreSQL via Neon serverless database for production deployment
- **UI Components**: Radix UI primitives for accessible component foundations
- **Icons**: Lucide React for consistent iconography throughout the application
- **Date Handling**: date-fns for reliable date formatting and manipulation
- **Validation**: Zod for runtime type validation and schema definition
- **Discord Integration**: Placeholder for future Discord bot implementation

## Deployment Strategy

The application is configured for deployment to GitHub Pages as a static site:

- **Frontend Build**: Vite builds optimized static assets to `dist/public`
- **GitHub Pages**: Static hosting with SPA routing support via redirect scripts
- **Environment Configuration**: Separate production configuration for base URLs and API endpoints
- **Database**: External PostgreSQL database (Neon) for persistent data storage
- **CI/CD**: GitHub Actions workflow for automated building and deployment

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 08, 2025. Initial setup
- July 08, 2025. File consolidation: Reduced file count from 122 to 92 files by consolidating UI components and pages