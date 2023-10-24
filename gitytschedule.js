const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

// Set up OAuth2 client with your client ID and client secret
const clientId = "clientId";
const clientSecret = "clientSecret";
const redirectUri = "http://localhost:3000/auth/google/callback"; // Set the same redirect URI as you defined in the Cloud Console

const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

// Define the TSV data
const tsvData = `
Schedule    Video/Podcast Topic    Basic Description    YouTube Shorts Ideas
);


// Split the TSV data into individual lines
const tsvLines = tsvData.split('\n');

// Function to create events based on TSV data
async function createEvents(auth) {
  const calendar = google.calendar({ version: 'v3', auth });

  const startDate = new Date('[Date]');
  const endDate = new Date('[Date]');

  // Loop through the TSV lines and create events
  for (let i = 0; i < tsvLines.length; i++) {
    const line = tsvLines[i];
    const [date, summary, description] = line.split('\t');
    const eventDate = new Date(startDate);
    eventDate.setDate(startDate.getDate() + i);

    // Define the event data
    const event = {
      summary,
      description,
      start: {
        dateTime: eventDate.toISOString(),
        timeZone: 'Europe/London', // Replace with your timezone, e.g., 'America/New_York'
      },
      end: {
        dateTime: new Date(eventDate.getTime() + 1 * 60 * 60 * 1000).toISOString(), // Assuming 1 hour event
        timeZone: 'Europe/London',
      },
    };

    // Insert the event into the calendar
    calendar.events.insert(
      {
        calendarId: 'primary', // 'primary' is the default calendar
        resource: event,
      },
      (err, event) => {
        if (err) {
          console.error('Error creating event:', err);
        } else {
          console.log('Event created: %s', event.data.htmlLink);
        }
      }
    );
  }
}

// Call the createEvents function after user authorization
async function main() {
  try {
    // ... User authorization code (as explained in previous responses) ...

    // Call the createEvents function with the authenticated client
    createEvents(oAuth2Client);
  } catch (error) {
    console.error('Authorization error:', error);
  }
}

main(); // Start the authorization process
