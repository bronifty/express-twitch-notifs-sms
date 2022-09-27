// import dotenv from 'dotenv';
// dotenv.config();
// import loadTwitchTokenFromRedis from '../utils/loadTwitchTokenFromRedis.js';
// import saveTwitchTokenToRedis from './saveTwitchTokenToRedis.js';
// // load the twitch_access_token from redis and use it to fetch data from twitch
// // fetch(url, options)
// // options: {
// //   method: 'POST',
// //   headers: {
// //     Authorization: `Bearer ${twitch_access_token}`,
// //     'Client-Id': process.env.TWITCH_CLIENT_ID_TEST,
// //     'Content-Type': 'application/json',
// //   },
// //   body: JSON.stringify({
// //     type: 'stream.online',
// //     version: '1',
// //     condition: {
// //       broadcaster_user_id: process.env.TWITCH_BROADCASTER_ID_TEST,
// //     },
// //     transport: {
// //       method: 'webhook',
// //       callback: `${process.env.NGROK_HOST_NAME}/eventsub`,
// //       secret: process.env.TWITCH_SUBSCRIPTION_SECRET_PHRASE,
// //     },
// //   }),
// // }

// export const createSub = async (req, res) => {
//   try {
//     let twitch_access_token = await loadTwitchTokenFromRedis();
//     const newSub = await fetch(
//       'https://api.twitch.tv/helix/eventsub/subscriptions',
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${twitch_access_token}`,
//           'Client-Id': process.env.TWITCH_CLIENT_ID_TEST,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           type: 'stream.online',
//           version: '1',
//           condition: {
//             broadcaster_user_id: process.env.TWITCH_BROADCASTER_ID_TEST,
//           },
//           transport: {
//             method: 'webhook',
//             callback: `${process.env.NGROK_HOST_NAME}/eventsub`,
//             secret: process.env.TWITCH_SUBSCRIPTION_SECRET_PHRASE,
//           },
//         }),
//       }
//     );
//   } catch (error) {
//     await saveTwitchTokenToRedis();
//     console.log('error in createSub: ', error);
//   }
//   console.log('twitch_access_token in createSub: ', twitch_access_token);
//   res.status(200).json({ twitch_access_token });
// };

import dotenv from 'dotenv';
dotenv.config();
import loadTwitchTokenFromRedis from '../utils/loadTwitchTokenFromRedis.js';

// load the twitch_access_token from redis and use it to fetch data from twitch

export const createSub = async (req, res) => {
  let twitch_access_token = await loadTwitchTokenFromRedis();

  const url = `https://api.twitch.tv/helix/users?id=${process.env.TWITCH_BROADCASTER_ID_TEST}`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${twitch_access_token}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID_TEST,
    },
  };

  const promiseData = await fetch(url, options);
  const data = await promiseData.json();
  console.log('data !!: ', data);
  res.status(200).json(data);
};
