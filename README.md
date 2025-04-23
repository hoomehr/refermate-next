# Refermate

A web application for sharing and finding job referrals. Users can post job opportunities they can refer others to, and job seekers can browse and request referrals.

## Tech Stack
- **Frontend**: Next.js 15.3.1, React 19, Material UI 7
- **Backend**: Next.js API routes
- **Data Storage**: JSON files
- **Authentication**: NextAuth.js

## Project Structure

### Root Directories
- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/lib` - Utility functions, data access layer, and JSON data files
- `/public` - Static assets

### Data Structure
The app uses JSON files for data storage with the following models:
- `users.json` - Application users
- `referrals.json` - Job referral opportunities
- `tags.json` - Categories/skills for referrals

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

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Next Development Steps
1. Implement real authentication flow
2. Complete API endpoints for referral operations
3. Add user profile management
4. Implement notifications for referral requests
5. Add search functionality
6. Enhance filtering options

## License

MIT
