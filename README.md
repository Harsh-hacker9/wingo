# WinGo Application

A lottery/web gaming application built with Node.js, Express, and EJS.

## Deployment

### Deploy to Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Use the following settings:
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm run serve`
   - Environment Variables:
     - NODE_ENV: production
     - PORT: 10000

### Deploy to Firebase

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize Firebase: `firebase init functions`
4. Deploy: `firebase deploy`

## Scripts

- `npm start`: Start the development server with nodemon
- `npm run serve`: Start the production server
- `npm run database`: Create database tables
- `npm run build`: Install dependencies

## Environment Variables

- `PORT`: Port number for the server (defaults to 3000)
- `NODE_ENV`: Environment mode (development/production)