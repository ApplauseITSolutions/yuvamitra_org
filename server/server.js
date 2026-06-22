import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from React build
app.use(express.static(join(__dirname, '../dist')));

// Middleware
app.use(cors());
app.use(express.json());

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('✅ Email server is ready');
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject = 'Website Inquiry', message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'Required fields missing: name, email, and message are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid email format'
      });
    }

    // HTML email template
    const htmlContent = `
      <div style='font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);'>
        <!-- Header -->
        <div style='background-color: #1f2f5f; padding: 20px; text-align: center;'>
          <h2 style='color: #ffffff; margin: 0;'>YUVA MITRA</h2>
        </div>
        
        <!-- Body -->
        <div style='padding: 25px; background-color: #ffffff;'>
          <p style='color: #666; font-size: 14px; margin-top: 0;'>Hello, you have received a new inquiry:</p>
          
          <table style='width: 100%; border-collapse: collapse; margin-bottom: 20px;'>
            <tr>
              <td style='padding: 8px 0; color: #888; font-size: 13px; width: 90px;'><strong>Name:</strong></td>
              <td style='padding: 8px 0; color: #333; font-size: 15px;'>${name}</td>
            </tr>
            <tr>
              <td style='padding: 8px 0; color: #888; font-size: 13px;'><strong>Email:</strong></td>
              <td style='padding: 8px 0; font-size: 15px;'><a href='mailto:${email}' style='color: #EF1C25; text-decoration: none;'>${email}</a></td>
            </tr>
            <tr>
              <td style='padding: 8px 0; color: #888; font-size: 13px;'><strong>Subject:</strong></td>
              <td style='padding: 8px 0; color: #333; font-size: 15px;'>${subject}</td>
            </tr>
          </table>

          <div style='background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 3px solid #EF1C25;'>
            <p style='margin: 0 0 5px; color: #888; font-size: 12px; text-transform: uppercase;'>Message</p>
            <p style='margin: 0; color: #444; font-size: 15px; line-height: 1.5;'>${message}</p>
          </div>
        </div>

        <!-- Footer -->
        <div style='background-color: #f4f4f4; padding: 12px; text-align: center; font-size: 11px; color: #999;'>
          This is an automated message from the Yuva Mitra Website.
        </div>
      </div>
    `;

    // Plain text version
    const textContent = `
New Website Enquiry from ${name} (${email}):

Subject: ${subject}

Message:
${message}
    `;

    // Email configuration
    const mailOptions = {
      from: `"Yuva Mitra Website" <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `New Website Enquiry: ${subject}`,
      html: htmlContent,
      text: textContent
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      status: 'success',
      message: 'Enquiry sent successfully'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to send email. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});