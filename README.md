# Refermate

A modern web application for managing and requesting job referrals within your network.

## Features

- Browse available job referrals from your network
- Filter referrals by location, work type, and tags
- Request referrals with your LinkedIn profile and resume
- Create and manage your own referral offerings

## Tech Stack

- **Frontend**: Next.js, React, Material-UI
- **Backend**: Next.js API Routes
- **Styling**: Material UI with custom theming
- **Form Handling**: React Hook Form (planned)
- **Authentication**: NextAuth.js (planned)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/refermate.git
cd refermate
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
refermate/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── page.tsx          # Home page
│   └── ...
├── components/           # Reusable React components
├── public/               # Static files
└── ...
```

## Deployment

This project can be deployed to Vercel with a single click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Frefermate)

## Next Steps

- Implement proper authentication
- Add data persistence with a database
- Create user profiles and dashboards
- Implement notifications for referral requests
- Add admin panel for managing referrals and users

## License

MIT
