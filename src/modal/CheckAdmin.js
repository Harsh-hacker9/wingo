import connection from "../config/connectDB";
import md5 from "md5";

const checkAndCreateAdmin = async () => {
    try {
        // Check if admin user exists
        const [adminUsers] = await connection.query('SELECT * FROM users WHERE name_user = "Admin" OR level = 2 LIMIT 1');
        
        if (adminUsers.length > 0) {
            console.log("Admin user already exists:", adminUsers[0]);
            console.log("Admin login details:");
            console.log("Phone:", adminUsers[0].phone);
            console.log("Password: (original password is not shown for security)");
        } else {
            console.log("No admin user found. Creating default admin account...");
            
            // Create default admin account
            const adminPhone = "1234567890";  // Default admin phone
            const adminPassword = "admin123"; // Default admin password
            const adminName = "Admin";
            const adminCode = "ADMIN00001";   // Default admin code
            const now = Date.now();
            
            // Check if phone already exists
            const [existingUser] = await connection.query('SELECT * FROM users WHERE phone = ?', [adminPhone]);
            
            if (existingUser.length === 0) {
                const sql = "INSERT INTO users SET id_user = ?, phone = ?, name_user = ?, password = ?, plain_password = ?, money = ?, code = ?, invite = ?, ctv = ?, veri = ?, otp = ?, ip_address = ?, status = ?, time = ?, level = ?";
                await connection.execute(sql, [
                    "10001",           // id_user
                    adminPhone,        // phone
                    adminName,         // name_user
                    md5(adminPassword), // password (hashed)
                    adminPassword,     // plain_password
                    1000000,           // money
                    adminCode,         // code
                    "SYSTEM",          // invite
                    "",                // ctv
                    1,                 // veri
                    "123456",          // otp
                    "127.0.0.1",       // ip_address
                    1,                 // status
                    now,               // time
                    2                  // level (admin level)
                ]);
                
                console.log("Default admin account created successfully!");
                console.log("Admin Phone:", adminPhone);
                console.log("Admin Password:", adminPassword);
                console.log("Admin Code:", adminCode);
            } else {
                console.log("User with admin phone already exists, skipping admin creation.");
            }
        }
        
        // Also check if there are any regular users and create one if none exist
        const [allUsers] = await connection.query('SELECT COUNT(*) as count FROM users');
        if (allUsers[0].count === 0) {
            console.log("Creating a default regular user as well...");
            const userPhone = "9876543210";
            const userPassword = "user123";
            const userName = "Member12345";
            const userCode = "USER00001";
            const now = Date.now();
            
            const sql = "INSERT INTO users SET id_user = ?, phone = ?, name_user = ?, password = ?, plain_password = ?, money = ?, code = ?, invite = ?, ctv = ?, veri = ?, otp = ?, ip_address = ?, status = ?, time = ?, level = ?";
            await connection.execute(sql, [
                "10002",           // id_user
                userPhone,         // phone
                userName,          // name_user
                md5(userPassword), // password (hashed)
                userPassword,      // plain_password
                1000,              // money
                userCode,          // code
                "ADMIN00001",      // invite
                "",                // ctv
                1,                 // veri
                "123456",          // otp
                "127.0.0.1",       // ip_address
                1,                 // status
                now,               // time
                0                  // level (regular user)
            ]);
            
            console.log("Default regular user created successfully!");
        }
        
        process.exit(0);
    } catch (error) {
        console.error("Error checking/creating admin:", error);
        process.exit(1);
    }
};

checkAndCreateAdmin();