import bcrypt from 'bcrypt';
import connection from '../config/db.js'; // MySQL connection

// Fetch user by ID
export const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        connection.query(query, [id], (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return reject('User not found');
            resolve(results[0]);
        });
    });
};

// Fetch all users
export const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users';
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// Create new user
export const createUser = (name, email, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return reject(err);

            const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?, ?)';
            connection.query(query, [username, email, hashedPassword], (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            });
        });
    });
};

// Update user details
export const updateUser = (id, username, password, role) => {
    return new Promise((resolve, reject) => {
        if (password) {
            // If password provided, hash and update all fields
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return reject(err);

                const query = 'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?';
                connection.query(query, [username, hashedPassword, role, id], (err, result) => {
                    if (err) return reject(err);
                    if (result.affectedRows === 0) return reject('User not found');
                    resolve();
                });
            });
        } else {
            // If no password provided, update only username and role
            const query = 'UPDATE users SET username = ?, role = ? WHERE id = ?';
            connection.query(query, [username, role, id], (err, result) => {
                if (err) return reject(err);
                if (result.affectedRows === 0) return reject('User not found');
                resolve();
            });
        }
    });
};

// Delete user by ID
export const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM users WHERE id = ?';
        connection.query(query, [id], (err, result) => {
            if (err) return reject(err);
            if (result.affectedRows === 0) return reject('User not found');
            resolve();
        });
    });
};
