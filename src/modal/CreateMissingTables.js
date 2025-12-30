import connection from "../config/connectDB.js";

// Create missing tables if they don't exist
const createMissingTables = async () => {
    try {
        // Create recharge table if it doesn't exist
        await connection.query(`
            CREATE TABLE IF NOT EXISTS recharge (
                id INT AUTO_INCREMENT PRIMARY KEY,
                id_order VARCHAR(255) DEFAULT NULL,
                transaction_id VARCHAR(255) DEFAULT NULL,
                phone BIGINT NOT NULL,
                money INT NOT NULL,
                type VARCHAR(50) NOT NULL,
                status INT NOT NULL DEFAULT 0,
                today VARCHAR(20) NOT NULL,
                url TEXT DEFAULT NULL,
                time VARCHAR(50) DEFAULT NULL,
                utr VARCHAR(255) DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        `);

        console.log("Recharge table created successfully");

        // Create withdraw table if it doesn't exist
        await connection.query(`
            CREATE TABLE IF NOT EXISTS withdraw (
                id INT AUTO_INCREMENT PRIMARY KEY,
                phone BIGINT NOT NULL,
                money INT NOT NULL,
                status INT NOT NULL DEFAULT 0,
                today VARCHAR(20) NOT NULL,
                time VARCHAR(50) DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        `);

        console.log("Withdraw table created successfully");

        // Create other potentially missing tables
        await connection.query(`
            CREATE TABLE IF NOT EXISTS user_bank (
                id INT AUTO_INCREMENT PRIMARY KEY,
                phone BIGINT NOT NULL,
                bank_name VARCHAR(100) NOT NULL,
                account_number VARCHAR(100) NOT NULL,
                account_holder VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
        `);

        console.log("User bank table created successfully");

        console.log("All missing tables created successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error creating tables:", error);
        process.exit(1);
    }
};

createMissingTables();