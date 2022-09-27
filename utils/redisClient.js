import dotenv from 'dotenv';
dotenv.config();
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_CLIENT_URL,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

export default redisClient;
