import nodemailer from 'nodemailer';
import { logger } from './logger.js';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Send email function
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error(`Email send error: ${error.message}`);
    return { success: false, error: error.message };
  }
};

// Send contact form notification
export const sendContactNotification = async (messageData) => {
  const { name, email, subject, message } = messageData;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Contact Form Message</h2>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="background: white; padding: 15px; border-radius: 5px;">${message}</p>
      </div>
      <p style="color: #666; font-size: 12px;">This message was sent from your portfolio contact form.</p>
    </div>
  `;

  return await sendEmail({
    to: process.env.EMAIL_USER,
    subject: `Portfolio Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    html,
  });
};

// Send auto-reply to user
export const sendAutoReply = async (email, name) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Thank You for Contacting Me!</h2>
      <p>Hi ${name},</p>
      <p>Thank you for reaching out. I've received your message and will get back to you as soon as possible.</p>
      <p>Best regards,<br/>Your Name</p>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        <p>This is an automated response. Please do not reply to this email.</p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: email,
    subject: 'Thank you for your message',
    text: `Hi ${name},\n\nThank you for reaching out. I've received your message and will get back to you as soon as possible.\n\nBest regards,\nYour Name`,
    html,
  });
};
