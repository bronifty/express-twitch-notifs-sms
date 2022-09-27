import express from 'express';
import {
  testHandler,
  getNewToken,
  handleEventSub,
} from './utils/controllers.js';
import fetchTwitch from './utils/fetchTwitch.js';
const app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
});
app.get('/fetchTwitch', fetchTwitch);

app.post('/testHandler', testHandler);
app.post('/token', getNewToken);
app.post('/eventsub', handleEventSub);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
