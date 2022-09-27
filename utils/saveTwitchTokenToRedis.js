import dotenv from 'dotenv';
dotenv.config();
import redisClient from './redisClient.js';
import getAccessTokenPromise from './twitchAuth.js';

const resolveAccessTokenPromise = async () => {
  let access_token_promise = await getAccessTokenPromise();
  let access_token_resolved = await access_token_promise.json();
  if (access_token_resolved) {
    console.log('access_token_resolved: ', access_token_resolved);
    return access_token_resolved;
  } else {
    console.log('could not resolve access token');
    return null;
  }
};

let twitch_access_token = null;
const saveTwitchTokenToRedis = async () => {
  twitch_access_token = await resolveAccessTokenPromise();
  console.log('twitch_access_token in run: ', twitch_access_token);
  if (twitch_access_token) {
    // write twitch access token to redis
    await redisClient.connect();
    await redisClient.set(
      'twitch_access_token',
      twitch_access_token.access_token
    );
    const redis_twitch_access_token = await redisClient.get(
      'twitch_access_token'
    );
    console.log('redis_twitch_access_token', redis_twitch_access_token);
    await redisClient.quit();
  }
  res.status(200).json({ message: 'successfully saved access token' });
};

export default saveTwitchTokenToRedis;
