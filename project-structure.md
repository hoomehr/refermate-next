# Refermate Project Structure

## Overview
Refermate is a web application for sharing and finding job referrals. It allows users to post job opportunities they can refer others to, and job seekers can browse and request referrals.

## Tech Stack
- **Frontend**: Next.js 15.3.1, React 19, Material UI 7
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js

## Project Structure

### Root Directories
- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/prisma` - Database schema and seed script
- `/public` - Static assets
- `/lib` - Utility functions and shared code
- `/src` - Source code (contains generated Prisma client)

### Database Schema
The app uses PostgreSQL with Prisma ORM with the following models:
- `User` - Application users
- `Referral` - Job referral opportunities
- `Tag` - Categories/skills for referrals

### Key Components
- `ReferralCard.tsx` - Card component for displaying a referral opportunity
- `ReferralDetails.tsx` - Modal for showing detailed information about a referral
- `ReferralFilters.tsx` - Filtering UI for referrals by location, type, tags
- `ReferralRequestForm.tsx` - Form for requesting a referral
- `Navigation.tsx` - App navigation bar
- `Layout.tsx` - Overall application layout
- `ThemeRegistry.tsx` - Material UI theme configuration

### Pages
- `/` (Home) - Main page showing referral listings with filters
- `/profile` - User profile page
- `/create-referral` - Form page for creating new referrals
- `/api/*` - API routes for data operations

### Authentication
Uses NextAuth.js for authentication with email authentication.

## How It Works

1. **Browsing Referrals**: 
   - Users can view a list of referral opportunities on the home page
   - Filtering is available by location, work type (remote/onsite/hybrid), and tags/skills

2. **Viewing Referral Details**:
   - Clicking on a referral card opens a modal with detailed information
   - Users can request a referral through this modal

3. **Creating Referrals**:
   - Users can create new referral opportunities via the "Post a Referral" button
   - They can specify job details, requirements, and relevant tags

4. **User Management**:
   - User authentication and profile management is handled through NextAuth
   - User profiles show their posted referrals

## Development Workflow

### Setup:
1. Install dependencies: `npm install`
2. Setup database: 
   - Configure PostgreSQL connection in `.env`
   - Run `npm run prisma:generate` to generate Prisma client
   - Run `npm run prisma:migrate` to apply migrations
   - Run `npm run db:seed` to seed the database with sample data

### Running the app:
- Development: `npm run dev`
- Production build: `npm run build`
- Start production: `npm run start`

### Database Management:
- View database: `npm run prisma:studio`
- Create migrations: `npm run prisma:migrate`

## Next Development Steps
1. Implement real authentication flow
2. Complete API endpoints for referral operations
3. Add user profile management
4. Implement notifications for referral requests
5. Add search functionality
6. Enhance filtering options 