import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendOtpEmail = async (mailOptions) => {
    console.log("Sending email with the following options:", mailOptions);

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error("Error sending OTP email:", err);
        throw new Error('Failed to send OTP email');
    }
};
