import express from 'express';
import {
  testHandler,
  getNewToken,
  handleEventSub,
  fetchTwitch,
  createSub,
  createSubTestHeader,
  checkSubs,
} from './utils/controllers.js';
const app = express();
app.use(
  express.raw({
    // Need raw message body for signature verification
    type: 'application/json',
  })
);

app.get('/', (req, res) => {
  res.send('hello world');
});
app.get('/fetchTwitch', fetchTwitch);
// app.get('/createSub', createSub);

app.post('/testHandler', testHandler);
app.post('/token', getNewToken);
app.post('/eventsub', handleEventSub);
app.post('/createSub', createSub);
app.post('/checkSubs', checkSubs);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
