# Deployment Guide for Render

This guide explains how to deploy the Dhxrshxn FastAPI Project on Render, including both the backend API and frontend React application.

## Architecture Overview

The application consists of:
- **Backend**: FastAPI application serving the API
- **Frontend**: React application (deployed separately)
- **Database**: PostgreSQL database (managed by Render)

## Deploying the Backend

### Method 1: Using render.yaml (Infrastructure as Code)

The project includes a `render.yaml` file that defines the service configuration:

```yaml
services:
  - name: dhxrshxn-fastapi-project-backend
    type: web
    env: python
    region: oregon
    plan: free
    buildCommand: |
      pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: dhxrshxn-db
          property: connectionString
      - key: PYTHON_PATH
        value: /usr/local/bin/python3

databases:
  - name: dhxrshxn-db
    region: oregon
    plan: free
    diskSizeGB: 1
```

To deploy using this method:
1. Connect your repository to Render
2. Render will automatically read the `render.yaml` file
3. The service and database will be provisioned automatically

### Method 2: Manual Setup

1. Create a new Web Service in your Render dashboard
2. Connect your GitHub/GitLab repository
3. Set the root directory
4. Configure the following settings:
   - Environment: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## Environment Variables

The backend requires the following environment variables:

- `DATABASE_URL`: PostgreSQL database connection string (provided by Render when linking database)
- `RENDER_EXTERNAL_URL`: The external URL of your deployed service (Render sets this automatically)

## Deploying the Frontend

The React frontend needs to be deployed separately. Here's how to configure it for production:

### Update API Endpoint

In the frontend, update the API base URL in `frontend/src/App.js`:

```javascript
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://your-service-name.onrender.com", // Update with your backend URL
});
```

### Create Environment File

Create a `.env.production` file in the frontend directory:

```
REACT_APP_API_URL=https://your-service-name.onrender.com
```

### Deploy Frontend to Render

1. Create a new Static Site in Render
2. Point it to your repository (you may need to adjust the build process)
3. Or deploy to Netlify/Vercel for easier React deployment

## CORS Configuration

The backend is configured to allow requests from the frontend. When deploying, update the CORS settings in `main.py`:

```python
origins = [
    "http://localhost:3000",      # Local React dev server
    "http://localhost:8080",      # Alternative dev server
    "https://your-frontend-url.vercel.app",  # Production frontend
    "https://your-frontend-url.netlify.app", # Alternative production frontend
    # Add your frontend URL here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Database Migration

On first deployment, the application will initialize the database with sample products if the table is empty. The `init_db()` function in `main.py` handles this automatically.

## Health Check

Your service includes a basic health check. You can test it at:
`https://your-service-name.onrender.com/health` (if you add a health endpoint)

## Scaling

- Free plan: Up to 100 hours/month, 1GB RAM, 1 vCPU
- Starter plan: Up to 750 hours/month, 1GB RAM, 1 vCPU, 100GB transfer
- Pro plan: 1GB-14GB RAM, 1-8 vCPUs, 100GB-2TB disk

## Troubleshooting

### Common Issues

1. **Database Connection Errors**: Ensure `DATABASE_URL` is properly set
2. **Port Binding**: Always use the `$PORT` environment variable provided by Render
3. **Static Files**: If serving static files, ensure they're properly configured
4. **Timeouts**: Increase timeout settings if processing takes too long

### Logs

Check your service logs in the Render dashboard to troubleshoot deployment issues.

## Environment-Specific Configurations

### Production Settings

The application detects production environment through environment variables. The database configuration in `database.py` includes fallbacks:

```python
db_url = os.getenv(
    "DATABASE_URL", os.getenv("RENDER_DATABASE_URL", "postgresql://postgres:Dharshan%4009@localhost:5432/products_db"))
```

## Continuous Deployment

Once connected to GitHub, Render will automatically deploy new commits to the specified branch. You can configure:
- Branch to deploy from
- Manual vs. automatic deploys
- Pre-deploy scripts if needed

## Monitoring

Render provides basic monitoring including:
- Uptime monitoring
- Response time metrics
- Error tracking
- Resource utilization

## Maintenance

Regular maintenance tasks:
- Monitor logs for errors
- Check database performance
- Update dependencies periodically
- Review security best practices