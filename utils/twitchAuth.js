import dotenv from 'dotenv';
dotenv.config();

const getAccessTokenPromise = async () => {
  return await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.TWITCH_CLIENT_ID_TEST,
      client_secret: process.env.TWITCH_CLIENT_SECRET_TEST,
      grant_type: 'client_credentials',
    }),
  });
};

export default getAccessTokenPromise;
