import dotenv from 'dotenv';
dotenv.config();
import loadTwitchTokenFromRedis from './loadTwitchTokenFromRedis.js';

// Notification request headers
const TWITCH_MESSAGE_ID = 'Twitch-Eventsub-Message-Id'.toLowerCase();
const TWITCH_MESSAGE_TIMESTAMP =
  'Twitch-Eventsub-Message-Timestamp'.toLowerCase();
const TWITCH_MESSAGE_SIGNATURE =
  'Twitch-Eventsub-Message-Signature'.toLowerCase();
const MESSAGE_TYPE = 'Twitch-Eventsub-Message-Type'.toLowerCase();

// Notification message types
const MESSAGE_TYPE_VERIFICATION = 'webhook_callback_verification';
const MESSAGE_TYPE_NOTIFICATION = 'notification';
const MESSAGE_TYPE_REVOCATION = 'revocation';

// load the twitch_access_token from redis and use it to fetch data from twitch
export const handleEventSub = async (req, res) => {
  let notification = JSON.parse(req.body);

  if (req.headers[MESSAGE_TYPE] === MESSAGE_TYPE_NOTIFICATION) {
    // TODO: Do something with the event's data.

    console.log(JSON.stringify(notification, null, 4));

    res.sendStatus(204);
  } else if (req.headers[MESSAGE_TYPE] === MESSAGE_TYPE_VERIFICATION) {
    res.status(200).send(notification.challenge);
  } else {
    res.status(500).send('Unknown message type');
  }
};
