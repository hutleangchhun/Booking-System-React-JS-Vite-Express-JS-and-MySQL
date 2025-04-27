import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createUser, findByUsername } from '../models/authModel.js';

export const register = (req, res) => {
    const { username, password, role } = req.body;
    const hashed = bcrypt.hashSync(password, 8);
    createUser({ username, password: hashed, role }, (err) => {
        if (err) return res.status(500).json({ message: 'Error registering user' });
        res.status(201).json({ message: 'User created' });
    });
};

export const login = (req, res) => {
    const { username, password } = req.body;
    findByUsername(username, (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = results[0];
        if (!bcrypt.compareSync(password, user.password))
            return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user.id, username:user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};
