import dotenv from 'dotenv';
dotenv.config();
import loadTwitchTokenFromRedis from '../utils/loadTwitchTokenFromRedis.js';

// load the twitch_access_token from redis and use it to fetch data from twitch
export const checkSubs = async (req, res) => {
  let twitch_access_token = await loadTwitchTokenFromRedis();
  const promiseData = await fetch(
    'https://api.twitch.tv/helix/eventsub/subscriptions',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${twitch_access_token}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID_TEST,
      },
    }
  );
  const data = await promiseData.json();
  console.log('data !!: ', data);
  res.status(200).json({ data });
};
