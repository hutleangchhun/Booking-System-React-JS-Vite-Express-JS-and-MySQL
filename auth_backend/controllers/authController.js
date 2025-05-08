import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connection } from '../config/db.js';
import { sendOtpEmail } from '../utils/otpService.js';

// Function to generate OTP (example)
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};
export const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const otp = generateOtp();
        const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Insert new user with OTP and expiry into database
        connection.query(
            'INSERT INTO users (username, email, password, role, otp, otp_expiry, isVerified) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [username, email, hashedPassword, role, otp, otpExpiry, false],
            async (err, results) => {
                if (err) {
                    console.error('Database insertion error:', err);
                    return res.status(500).json({ message: 'Registration failed' });
                }

                // Send OTP Email after successful insertion
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Verify Your Email',
                    text: `Your OTP for email verification is: ${otp}`, // fallback for plain-text clients
                    html: `
                        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
                            <h2 style="color: #333;">Verify Your Email</h2>
                            <p style="font-size: 16px; color: #555;">
                                Your OTP for email verification is:
                                <strong style="color: #007bff; font-size: 18px;">${otp}</strong>
                            </p>
                            <p style="color: #999; font-size: 14px;">This OTP will expire in 10 minutes.</p>
                        </div>
                    `,
                };

                await sendOtpEmail(mailOptions);

                res.status(200).json({ message: 'OTP sent successfully' });
            }
        );
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Registration failed, please try again later' });
    }
};


// Login function
export const login = (req, res) => {
    const { email, password } = req.body;
    connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err || results.length === 0) {
            console.error(err); // Log the error for debugging
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};
// OTP Verification function
export const verifyOTP = (req, res) => {
    const { email, otp } = req.body;

    // Validate the email and OTP
    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Retrieve user data from the database to check OTP and expiry
    connection.query('SELECT otp, otp_expiry, isVerified FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = results[0];

        if (user.isVerified) {
            return res.status(400).json({ message: 'User is already verified' });
        }

        // ✅ FIXED OTP comparison
        if (Number(user.otp) !== Number(otp)) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (user.otp_expiry < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // Update user as verified
        connection.query('UPDATE users SET isVerified = true WHERE email = ?', [email], (err) => {
            if (err) {
                console.error('Error updating verification status:', err);
                return res.status(500).json({ message: 'Error verifying OTP' });
            }

            res.status(200).json({ message: 'Email verified successfully' });
        });
    });
};

