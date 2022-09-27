import dotenv from 'dotenv';
dotenv.config();
import loadTwitchTokenFromRedis from '../utils/loadTwitchTokenFromRedis.js';
// import saveTwitchTokenToRedis from './saveTwitchTokenToRedis.js';

const SECRET_PHRASE = 'TWITCH_SUBSCRIPTION_SECRET_PHRASE'.toLowerCase();

export const createSub = async (req, res) => {
  // res.status(200).send(`${process.env.NGROK_HOST_NAME}/eventsub`);
  // if the request headers contains the correct secret, then create a subscription
  if (
    req.headers[SECRET_PHRASE] === process.env.TWITCH_SUBSCRIPTION_SECRET_PHRASE
  ) {
    try {
      let twitch_access_token = await loadTwitchTokenFromRedis();

      const url = `https://api.twitch.tv/helix/eventsub/subscriptions`;
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${twitch_access_token}`,
          'Client-Id': process.env.TWITCH_CLIENT_ID_TEST,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'stream.online',
          version: '1',
          condition: {
            broadcaster_user_id: process.env.TWITCH_BROADCASTER_ID_TEST,
          },
          transport: {
            method: 'webhook',
            callback: `https://${process.env.NGROK_HOST_NAME}/eventsub`,
            secret: process.env.TWITCH_SUBSCRIPTION_SECRET_PHRASE,
          },
        }),
      };

      const promiseData = await fetch(url, options);
      const data = await promiseData.json();
      console.log('data in createSub: ', data);
      res.status(200).json(data);
    } catch (error) {
      console.log('error in createSub: ', error);
      res.status(500).json({ msg: error });
    }
  } else {
    res.status(401).json({ msg: 'Unauthorized' });
  }
};

// export const createSub = async (req, res) => {
//   let twitch_access_token = await loadTwitchTokenFromRedis();

//   const url = `https://api.twitch.tv/helix/users?id=${process.env.TWITCH_BROADCASTER_ID}`;
//   const options = {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${twitch_access_token}`,
//       'Client-Id': process.env.TWITCH_CLIENT_ID_TEST,
//     },
//   };

//   const promiseData = await fetch(url, options);
//   const data = await promiseData.json();
//   console.log('data !!: ', data);
//   res.status(200).json(data);
// };
