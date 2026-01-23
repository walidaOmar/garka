# Garka Production Deployment Guide

This document provides step-by-step instructions for deploying the Garka full-stack application to a permanent, production-ready environment using Render (Backend) and Vercel (Frontend).

## Architecture Overview

| Component | Platform | Purpose |
| :--- | :--- | :--- |
| **Frontend** | Vercel | React/Vite application with global CDN |
| **Backend** | Render | Node.js/Express API server |
| **Database** | MongoDB Atlas | Cloud-hosted MongoDB cluster |

## Prerequisites

Before deploying, ensure you have:

1.  **GitHub Account** with the `walidaOmar/garka` repository cloned.
2.  **MongoDB Atlas Account** with a configured cluster and connection string.
3.  **Render Account** (https://render.com) for backend hosting.
4.  **Vercel Account** (https://vercel.com) for frontend hosting.

## Backend Deployment (Render)

### Step 1: Create a Render Web Service

1.  Log in to [Render Dashboard](https://dashboard.render.com).
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub repository (`walidaOmar/garka`).
4.  Configure the service:
    - **Name**: `garka-backend`
    - **Environment**: `Node`
    - **Build Command**: `cd backend && npm install`
    - **Start Command**: `cd backend && npm start`
    - **Root Directory**: Leave blank (or set to `backend` if Render requires it)

### Step 2: Set Environment Variables

In the Render dashboard, add the following environment variables under **Environment**:

```
MONGODB_URI=mongodb+srv://GarkarOmarRano:WA0963LId@land-marketplace.qelu64m.mongodb.net/garka?retryWrites=true&w=majority&appName=Land-marketplace
JWT_SECRET=fdfaf6a0e02e7b52cefe3954be043c07b8bf687de6c64279a1d8cc46efcbed1e
JWT_EXPIRE=7d
ENCRYPTION_KEY=996cb46690938a929e8dc81ff8c1ea96866dae5875657a77ef87da05be419c1c
NODE_ENV=production
MONNIFY_SANDBOX=false
MONNIFY_AUTO_PAYOUT=true
PLATFORM_COMMISSION=0.1
ADMIN_COMMISSION=0.05
```

### Step 3: Deploy

1.  Click **Create Web Service**.
2.  Render will automatically deploy the backend from your GitHub repository.
3.  Once deployed, note the **Service URL** (e.g., `https://garka-backend.onrender.com`).

## Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel

1.  Log in to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** and select **Project**.
3.  Import your GitHub repository (`walidaOmar/garka`).
4.  Configure the project:
    - **Framework Preset**: Vite
    - **Root Directory**: `frontend`
    - **Build Command**: `npm run build`
    - **Output Directory**: `dist`

### Step 2: Set Environment Variables

In the Vercel project settings, add the following environment variable:

```
VITE_API_URL=https://garka-backend.onrender.com/api
VITE_SOCKET_URL=https://garka-backend.onrender.com
```

(Replace `https://garka-backend.onrender.com` with your actual Render backend URL.)

### Step 3: Deploy

1.  Click **Deploy**.
2.  Vercel will build and deploy the frontend.
3.  Once deployed, your application will be live at the Vercel URL (e.g., `https://garka.vercel.app`).

## Post-Deployment Configuration

### 1. Seed the Production Database

Once the backend is deployed, seed the production database with initial data:

```bash
curl -X POST https://garka-backend.onrender.com/api/seed
```

(Note: You may need to add a seed endpoint to your backend if it doesn't exist.)

### 2. Update CORS Settings

Ensure your backend CORS configuration allows requests from your Vercel frontend URL:

In `backend/app.js`, update the CORS configuration:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://garka.vercel.app', 'https://your-custom-domain.com'] 
    : ['http://localhost:3000'],
  credentials: true
}));
```

### 3. Configure Custom Domain (Optional)

To use a custom domain (e.g., `garka.com`):

1.  **Vercel**: Add your domain in the Vercel project settings under **Domains**.
2.  **Render**: Add your domain in the Render service settings under **Custom Domains**.
3.  Update DNS records with your domain provider to point to Vercel and Render.

## Monitoring and Maintenance

### 1. Monitor Backend Logs

In Render dashboard, navigate to your service and view **Logs** for real-time debugging.

### 2. Monitor Frontend Deployments

In Vercel dashboard, view **Deployments** and **Analytics** for performance metrics.

### 3. Database Backups

MongoDB Atlas automatically backs up your data. Configure backup retention in the Atlas dashboard under **Backup**.

### 4. Health Checks

The backend includes a health check endpoint at `GET /api/health`. Monitor this endpoint to ensure the service is running.

## Troubleshooting

### Backend Not Starting

1.  Check Render logs for errors.
2.  Verify MongoDB Atlas connection string is correct.
3.  Ensure all environment variables are set.

### Frontend Not Connecting to Backend

1.  Verify `VITE_API_URL` environment variable is set correctly.
2.  Check CORS configuration in backend.
3.  Ensure backend is running and accessible.

### Database Connection Issues

1.  Verify MongoDB Atlas IP whitelist includes Render's IP range (or `0.0.0.0/0`).
2.  Test connection string locally before deploying.

## Rollback

If you need to rollback to a previous version:

1.  **Render**: Click **Deployments** and select a previous deployment to redeploy.
2.  **Vercel**: Click **Deployments** and select a previous deployment to promote.

## Next Steps

1.  Test the production environment thoroughly.
2.  Set up monitoring and alerting (e.g., Datadog, New Relic).
3.  Configure SSL/TLS certificates (automatic with Render and Vercel).
4.  Plan for scaling and optimization based on usage patterns.
