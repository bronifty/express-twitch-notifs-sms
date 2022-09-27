import dotenv from 'dotenv';
dotenv.config();
import loadTwitchTokenFromRedis from './loadTwitchTokenFromRedis.js';
// import saveTwitchTokenToRedis from './saveTwitchTokenToRedis.js';

export const createSubTestHeader = async (req, res) => {
  // if the request headers contains the correct secret, then create a subscription
  const MESSAGE_TYPE = 'Twitch-Eventsub-Message-Type'.toLowerCase();
  const testHeader = req.headers['twitch_subscription_secret_phrase'];
  if (
    req.headers['twitch_subscription_secret_phrase'] ===
    process.env.TWITCH_SUBSCRIPTION_SECRET_PHRASE
  ) {
    res.status(200).json({ msg: 'success; matching header' });
    // try {
    //   let twitch_access_token = await loadTwitchTokenFromRedis();
    //   const url = `'https://api.twitch.tv/helix/eventsub/subscriptions'`;
    //   const options = {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${twitch_access_token}`,
    //       'Client-Id': process.env.TWITCH_CLIENT_ID_TEST,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       type: 'stream.online',
    //       version: '1',
    //       condition: {
    //         broadcaster_user_id: process.env.TWITCH_BROADCASTER_ID_TEST,
    //       },
    //       transport: {
    //         method: 'webhook',
    //         callback: `${process.env.NGROK_HOST_NAME}/eventsub`,
    //         secret: process.env.TWITCH_SUBSCRIPTION_SECRET_PHRASE,
    //       },
    //     }),
    //   };
    //   const promiseData = await fetch(url, options);
    //   const data = await promiseData.json();
    //   console.log('data in createSub: ', data);
    //   res.status(200).json(data);
    // } catch (error) {
    //   console.log('error in createSub: ', error);
    //   res.status(500).json({ msg: error });
    // }
  } else {
    console.log(req.headers);
    res.status(401).json({
      msg: 'Unauthorized',
      testHeader,
      secret: process.env.TWITCH_SUBSCRIPTION_SECRET_PHRASE,
    });
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
