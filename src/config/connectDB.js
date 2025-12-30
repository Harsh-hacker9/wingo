const mysql = require('mysql2/promise');

// First create connection without database to create the database if it doesn't exist
const createDatabaseIfNotExists = async () => {
    try {
        const tempConnection = await mysql.createConnection({
            host: process.env.DATABASE_HOST || 'localhost',
            user: process.env.DATABASE_USER || 'root',
            password: process.env.DATABASE_PASSWORD || '',
        });
        
        await tempConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE_NAME || 'tri'}\``);
        await tempConnection.end();
    } catch (error) {
        console.log('Database already exists or error creating database:', error.message);
    }
};

// Create the main connection pool
const connection = mysql.createPool({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'tri',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Create database if it doesn't exist
createDatabaseIfNotExists();

export default connection;