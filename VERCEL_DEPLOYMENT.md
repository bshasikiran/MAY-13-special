# Deploying Your App to Vercel

Follow these steps to deploy your application to Vercel:

## Step 1: Export your project from Replit

1. Go to your Replit dashboard
2. Find this project and click on the three dots menu
3. Select "Download as ZIP"
4. Extract the ZIP file on your local computer

## Step 2: Create a GitHub repository

1. Go to [GitHub](https://github.com)
2. Create a new repository
3. Follow the instructions to push your extracted code to the repository

## Step 3: Connect to Vercel

1. Go to [Vercel](https://vercel.com) and sign up or log in
2. Click "New Project" 
3. Import your GitHub repository
4. Configure your project:

   - Framework Preset: Select "Other"
   - Root Directory: Leave as is
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. Add environment variables (Optional, if needed)

## Step 4: Configure Vercel project settings

In the "Settings" tab of your Vercel project:

1. Under "Build & Development Settings":
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

2. Create a `vercel.json` file in your project root (already done):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "dist/$1"
    }
  ]
}
```

## Step 5: Deploy

1. Click "Deploy" to start the deployment process
2. Wait for deployment to complete
3. Vercel will provide you with a URL for your deployed app

## Troubleshooting

If you encounter issues:

1. Check the Vercel build logs for errors
2. Ensure all paths in your code use relative paths
3. Make sure static assets are properly referenced

## Sharing Your Deployed App

Once deployed, you can share the Vercel URL with your friends. Your app will be accessible to anyone with the URL.