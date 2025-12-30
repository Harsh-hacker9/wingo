import mysql from 'mysql2/promise';

// InfinityFree MySQL connection configuration
const connection = mysql.createPool({
  host: process.env.DATABASE_HOST || 'sql303.infinityfree.com',
  user: process.env.DATABASE_USER || 'if0_40746640',
  password: process.env.DATABASE_PASSWORD || 'McQEuhSrRm',
  database: process.env.DATABASE_NAME || 'if0_40746640_wingo',
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
