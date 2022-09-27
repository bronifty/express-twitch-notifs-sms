import dotenv from 'dotenv';
dotenv.config();
import loadTwitchTokenFromRedis from './loadTwitchTokenFromRedis.js';
import saveTwitchTokenToRedis from './saveTwitchTokenToRedis.js';

// let twitch_access_token = null;
// load the twitch_access_token from redis and use it to fetch data from twitch
// export default async (req, res) => {
//   let twitch_access_token = null;
//   // let twitch_access_token = await loadTwitchAccessTokenFromRedis();
//   try {
//     let newToken = await saveTwitchTokenToRedis();
//     await redisClient.connect();
//     twitch_access_token = await redisClient.get('twitch_access_token');
//     await redisClient.quit();
//   } catch (error) {
//     console.log('error in createSub: ', error);
//   }
//   res.status(200).json({ twitch_access_token });
// };
// make a call to checkSubs to get the current subscriptions
// if the subscription already exists, return
// if the subscription does not exist, create it
// const currentSubs = async () => {};

// load the twitch_access_token from redis and use it to fetch data from twitch

// export default async (req, res) => {
//   const promiseData = await fetch(
//     'https://api.twitch.tv/helix/webhooks/subscriptions',
//     {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${twitch_access_token}`,
//         'Client-Id': process.env.TWITCH_CLIENT_ID_TEST,
//       },
//     }
//   );
//   const data = await promiseData.json();
//   console.log('data !!: ', data);
//   res.status(200).json({ data });
// };

// The single webhook we're subscribing to in this tutorial
// const webhook = {
//   channel: '551881465',
//   type: 'stream.online',
//   topic: 'https://api.twitch.tv/helix/users/follows?first=1&to_id=32168215',
// };

// -d '{"type":"user.update","version":"1","condition":{"user_id":"1234"},"transport":{"method":"webhook","callback":"https://this-is-a-callback.com","secret":"s3cre7"}}'

// create a subscription we can check for
export default async (req, res) => {
  let twitch_access_token;
  // Check if subscription both exists and has at least 2 hours remaining on the lease
  // const sub = res.data.find((item) => item.topic === webhook.topic);
  // if (sub && (new Date(sub.expires_at) - new Date()) / 3600000 > 2) return;

  try {
    twitch_access_token = await loadTwitchTokenFromRedis();

    const newSub = await fetch(
      'https://api.twitch.tv/helix/eventsub/subscriptions',
      {
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
            callback: `${process.env.NGROK_HOST_NAME}/eventsub`,
            secret: process.env.TWITCH_SUBSCRIPTION_SECRET_PHRASE,
          },
        }),
      }
    );
  } catch (error) {
    await saveTwitchTokenToRedis();
    console.log('error in createSub: ', error);
  }
  console.log('twitch_access_token in createSub: ', twitch_access_token);
  res.status(200).json({ twitch_access_token });
};

// const createSubscription = (res) => {
//   // Check if subscription both exists and has at least 2 hours remaining on the lease
//   const sub = res.data.find((item) => item.topic === webhook.topic);
//   if (sub && (new Date(sub.expires_at) - new Date()) / 3600000 > 2) return;

//   const options = {
//     url: 'https://api.twitch.tv/helix/webhooks/hub',
//     method: 'POST',
//     headers: {
//       Authorization: appToken,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       'hub.callback': `${process.env.domain}?channel=${webhook.channel}&type=${webhook.type}`,
//       'hub.mode': 'subscribe',
//       'hub.topic': webhook.topic,
//       'hub.lease_seconds': 86400,
//       'hub.secret': process.env.webhook_secret,
//     }),
//   };

//   return request(options);
// };

// curl -X POST 'https://api.twitch.tv/helix/eventsub/subscriptions' \
// -H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
// -H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz' \
// -H 'Content-Type: application/json' \
// -d '{"type":"user.update","version":"1","condition":{"user_id":"1234"},"transport":{"method":"webhook","callback":"https://this-is-a-callback.com","secret":"s3cre7"}}'
// # Twitch CLI example that
