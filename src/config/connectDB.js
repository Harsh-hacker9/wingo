import admin from 'firebase-admin';
import mysql from 'mysql2/promise';

// Initialize Firebase Admin SDK
try {
  // Check if already initialized (for development environments)
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        "projectId": process.env.FIREBASE_PROJECT_ID || "bdgwin57",
        "privateKey": process.env.FIREBASE_PRIVATE_KEY,
        "clientEmail": process.env.FIREBASE_CLIENT_EMAIL
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL || "https://bdgwin57-default-rtdb.asia-southeast1.firebasedatabase.app"
    });
  }
} catch (error) {
  console.log("Firebase initialization error:", error.message);
  
  // For development without service account
  if (process.env.NODE_ENV !== 'production') {
    // This would only work in development with Firebase Emulator
    console.log("Running in development mode without Firebase credentials");
  }
}

// Firestore database instance
const db = admin.firestore();

// InfinityFree MySQL connection configuration
const connection = mysql.createPool({
  host: process.env.DATABASE_HOST || 'sql113.infinityfree.com', // Replace with your actual InfinityFree host
  user: process.env.DATABASE_USER || 'if0_37266337', // Replace with your actual InfinityFree username
  password: process.env.DATABASE_PASSWORD || 'your_password', // Replace with your actual InfinityFree password
  database: process.env.DATABASE_NAME || 'if0_37266337_wingo', // Replace with your actual InfinityFree database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
connection.getConnection((err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to InfinityFree MySQL database successfully');
  }
});

export default connection;
