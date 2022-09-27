import dotenv from 'dotenv';
dotenv.config();
import redisClient from './redisClient.js';

// load the twitch_access_token from redis and use it to fetch data from twitch
let twitch_access_token = null;
const loadTwitchTokenFromRedis = async () => {
  try {
    await redisClient.connect();
    twitch_access_token = await redisClient.get('twitch_access_token');
    await redisClient.quit();
    return twitch_access_token;
  } catch (error) {
    console.log('error in loadTwitchTokenFromRedis: ', error);
  }
};

export default loadTwitchTokenFromRedis;
