import db from '../config/db.js';

export const findByUsername = (username, cb) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], cb);
};

export const createUser = (user, cb) => {
    db.query('INSERT INTO users SET ?', user, cb);
};

