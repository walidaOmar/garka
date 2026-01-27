# Garka Monorepo

## Overview
This is a full-stack real estate/property management application with:
- **Frontend**: React + Vite + TypeScript + Material UI + Tailwind CSS
- **Backend**: Node.js/Express with MongoDB (Mongoose)

## Project Structure
```
/
├── frontend/          # React frontend (Vite)
│   ├── src/          # React source files
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
├── backend/          # Express backend
│   ├── config/       # Configuration (db, env, jwt, multer)
│   ├── controllers/  # Route controllers
│   ├── middleware/   # Express middleware
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   └── package.json  # Backend dependencies
└── uploads/          # File uploads directory
```

## Running the Application

### Frontend (Development)
The frontend runs on port 5000 with Vite dev server:
```bash
cd frontend && npm run dev
```

### Backend (Development)
The backend runs on port 3000:
```bash
cd backend && npm run dev
```

## Environment Variables

### Backend Required Variables
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `ENCRYPTION_KEY` - Data encryption key

### Backend Optional Variables
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (default: development)
- `STRIPE_SECRET_KEY` - Stripe payment integration
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook verification
- `CLOUDINARY_*` - Image storage
- `HELLOSIGN_*` - Document signing
- `GOOGLE_MAPS_API_KEY` - Maps integration

### Frontend Variables
- `VITE_API_URL` - Backend API URL
- `VITE_SOCKET_URL` - WebSocket URL

## Key Features
- User authentication (JWT-based)
- Property listing and management
- Agent and deal initiator roles
- Payment processing (Stripe)
- Document management
- Notification system

## Recent Changes
- 2026-01-27: Initial Replit setup
  - Configured Vite to run on port 5000 with all hosts allowed
  - Backend configured for port 3000
  - Installed all dependencies
