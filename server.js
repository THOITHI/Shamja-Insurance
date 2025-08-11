const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shamjainsuranceageny@gmail.com',
        pass: process.env.EMAIL_PASSWORD // We'll set this as an environment variable
    }
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
    const { name, email, subject, message, feedbackType } = req.body;

    const mailOptions = {
        from: email,
        to: 'shamjainsuranceageny@gmail.com',
        subject: `[${feedbackType}] ${subject}`,
        html: `
            <h2>New Feedback from Website</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Type:</strong> ${feedbackType}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 