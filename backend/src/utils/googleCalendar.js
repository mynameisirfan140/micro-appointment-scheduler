```javascript
// backend/src/utils/googleCalendar.js
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Google OAuth2 configuration
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI; // e.g., http://localhost:3000/auth/callback

if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
  throw new Error('Google OAuth credentials are missing from environment variables.');
}

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Scopes required for calendar events
const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];

/**
 * Retrieves an authorized Google Calendar client.
 * For demo purposes, we load a saved token from a JSON file.
 * In production you would handle the OAuth2 flow to obtain and store the token.
 */
async function getCalendarClient() {
  const tokenPath = path.join(__dirname, 'token.json');

  let token;
  try {
    token = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
  } catch (e) {
    // If no token file exists, we need to generate an auth URL for the user to authorize.
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    throw new Error(`Please authorize this app at ${authUrl} and save the resulting token to ${tokenPath}`);
  }

  oauth2Client.setCredentials(token);
  return google.calendar({ version: 'v3', auth: oauth2Client });
}

/**
 * Syncs a single appointment to Google Calendar.
 * @param {Object} appointment - Appointment object with start_time and end_time as Date objects.
 */
async function syncAppointmentToCalendar(appointment) {
  const calendar = await getCalendarClient();

  const event = {
    summary: `${appointment.client_name} appointment`,
    description: `Provider ID: ${appointment.provider_id}`,
    start: {
      dateTime: appointment.start_time.toISOString(),
      timeZone: 'UTC', // Adjust to desired timezone if needed
    },
    end: {
      dateTime: appointment.end_time.toISOString(),
      timeZone: 'UTC',
    },
    // Optional: add reminders, location, etc.
  };

  await calendar.events.insert({
    calendarId: 'primary', // Change to a specific calendar ID if needed
    requestBody: event,
  });
}

/**
 * Syncs all pending appointments to Google Calendar.
 * This function can be called after creating/updating appointments.
 */
async function syncAllAppointments() {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  const pending = await prisma.appointment.findMany({
    where: { status: 'pending' },
  });

  for (const appt of pending) {
    try {
      await syncAppointmentToCalendar(appt);
    } catch (error) {
      console.error(`Failed to sync appointment ${appt.id}:`, error);
    }
  }
}

// Export the functions
module.exports = {
  syncAppointmentToCalendar,
  syncAllAppointments,
};