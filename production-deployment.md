# Refermate Production Deployment Guide

This guide outlines how to deploy the Refermate application to a production environment.

## Prerequisites

- Node.js 18.x or higher
- PostgreSQL database 
- A server/hosting platform (e.g., Vercel, AWS, DigitalOcean)
- Domain name (optional but recommended)

## Environment Setup

Create a `.env.production` file in the root directory with the following variables:

```
# Database
DATABASE_URL="postgresql://username:password@production-db-host:5432/refermate?schema=public"

# NextAuth
NEXTAUTH_SECRET="replace-with-secure-random-string" 
NEXTAUTH_URL="https://your-production-domain.com"

# Optional - For rate limiting, analytics, etc.
NODE_ENV="production"
```

## Database Setup

1. Create a production PostgreSQL database
2. Run migrations to set up the schema:
   ```
   npx prisma migrate deploy
   ```
3. (Optional) Seed the database with initial data:
   ```
   NODE_ENV=production npx ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts
   ```

## Building the Application

1. Install dependencies:
   ```
   npm ci
   ```

2. Generate Prisma client:
   ```
   npx prisma generate
   ```

3. Build the application:
   ```
   npm run build
   ```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy your application

### Option 2: Self-hosted Server

1. Copy the built application to your server
2. Set up environment variables
3. Run the production server:
   ```
   npm run start
   ```

### Option 3: Docker Deployment

Create a `Dockerfile` in the root directory:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Create a `.dockerignore` file:
```
node_modules
.next
.git
```

Build and run the Docker container:
```
docker build -t refermate .
docker run -p 3000:3000 --env-file .env.production refermate
```

## Performance Optimization

1. Enable caching where appropriate
2. Implement rate limiting for API routes
3. Set up a CDN for static assets
4. Use serverless functions for API routes when possible

## Monitoring and Maintenance

1. Set up error logging (e.g., Sentry)
2. Configure performance monitoring
3. Set up automated database backups
4. Implement health checks

## Security Considerations

1. Enable HTTPS
2. Set secure headers:
   - Content Security Policy (CSP)
   - X-XSS-Protection
   - X-Content-Type-Options
3. Implement rate limiting to prevent abuse
4. Regularly update dependencies

## CI/CD Pipeline (Optional)

Consider setting up a continuous integration/continuous deployment pipeline using GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Generate Prisma client
        run: npx prisma generate
        
      - name: Build
        run: npm run build
        
      - name: Deploy to production
        # Add your deployment step here based on your hosting platform
        # For example, for Vercel:
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
``` 