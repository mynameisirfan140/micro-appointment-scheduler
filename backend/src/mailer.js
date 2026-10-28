```javascript
// backend/src/mailer.js
const nodemailer = require('nodemailer');

/**
 * Create a nodemailer transporter using SMTP configuration from environment variables.
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send an email via the configured transporter.
 * @param {Object} options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text body
 * @param {string} [options.html] - HTML body (optional)
 */
async function sendEmail({ to, subject, text, html }) {
  const mailOptions = {
    from: `"Micro-Appointment Scheduler" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

/**
 * Send a confirmation email for a new appointment.
 * @param {Object} params
 * @param {Object} params.appointment - Appointment record (includes start_time, end_time, provider_id, client_name, status)
 * @param {string} params.recipientEmail - Email address to send the confirmation to
 */
async function sendAppointmentConfirmation({ appointment, recipientEmail }) {
  const startStr = new Date(appointment.start_time).toLocaleString();
  const endStr = new Date(appointment.end_time).toLocaleString();

  const subject = 'Appointment Confirmation';
  const text = `
Hello,

Your appointment has been confirmed:

Provider: ${appointment.provider_id}
Client: ${appointment.client_name}
Date & Time: ${startStr} – ${endStr}
Status: ${appointment.status}

You will receive a reminder 15 minutes before the appointment.

Thank you,
Micro-Appointment Scheduler
`;

  const html = `
<p>Hello,</p>
<p>Your appointment has been confirmed:</p>
<ul>
  <li><strong>Provider:</strong> ${appointment.provider_id}</li>
  <li><strong>Client:</strong> ${appointment.client_name}</li>
  <li><strong>Date & Time:</strong> ${startStr} – ${endStr}</li>
  <li><strong>Status:</strong> ${appointment.status}</li>
</ul>
<p>You will receive a reminder 15 minutes before the appointment.</p>
<p>Thank you,<br/>Micro-Appointment Scheduler</p>
`;

  await sendEmail({
    to: recipientEmail,
    subject,
    text,
    html,
  });
}

/**
 * Send a reminder email for an upcoming appointment.
 * @param {Object} params
 * @param {Object} params.appointment - Appointment record
 * @param {string} params.recipientEmail - Email address to send the reminder to
 */
async function sendAppointmentReminder({ appointment, recipientEmail }) {
  const startStr = new Date(appointment.start_time).toLocaleString();

  const subject = 'Appointment Reminder';
  const text = `
This is a reminder for your upcoming appointment:

Provider: ${appointment.provider_id}
Client: ${appointment.client_name}
Time: ${startStr}
Status: ${appointment.status}

See you soon!
`;

  const html = `
<p>This is a reminder for your upcoming appointment:</p>
<ul>
  <li><strong>Provider:</strong> ${appointment.provider_id}</li>
  <li><strong>Client:</strong> ${appointment.client_name}</li>
  <li><strong>Time:</strong> ${startStr}</li>
  <li><strong>Status:</strong> ${appointment.status}</li>
</ul>
<p>See you soon!</p>
`;

  await sendEmail({
    to: recipientEmail,
    subject,
    text,
    html,
  });
}

module.exports = {
  sendEmail,
  sendAppointmentConfirmation,
  sendAppointmentReminder,
};