import connection from "../config/connectDB.js";
import md5 from "md5";

const createAdmin = async () => {
    try {
        const phone = '9452339615';
        const password = '9721';
        
        // Check if user already exists
        const [existingUser] = await connection.query('SELECT * FROM users WHERE phone = ?', [phone]);
        
        if (existingUser.length > 0) {
            console.log('User with this phone already exists');
            console.log('Existing user:', existingUser[0]);
        } else {
            const sql = 'INSERT INTO users SET phone = ?, name_user = ?, password = ?, plain_password = ?, money = ?, code = ?, invite = ?, ctv = ?, veri = ?, otp = ?, ip_address = ?, status = ?, time = ?, level = ?';
            const code = 'ADM' + Date.now().toString().slice(-5);
            
            await connection.execute(sql, [
                phone,                    // phone
                'AdminUser',             // name_user
                md5(password),          // password (hashed)
                password,               // plain_password
                1000000,                // money
                code,                   // code
                'SYSTEM',               // invite
                '',                     // ctv
                1,                      // veri
                '123456',              // otp
                '127.0.0.1',          // ip_address
                1,                      // status
                Date.now(),             // time
                2                       // level (admin level)
            ]);
            
            console.log('Admin account created successfully!');
            console.log('Phone:', phone);
            console.log('Password:', password);
            console.log('Code:', code);
            console.log('Level: 2 (Admin)');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();