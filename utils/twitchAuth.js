import dotenv from 'dotenv';
dotenv.config();

const getAccessTokenPromise = async () => {
  return await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.TWITCH_CLIENT_ID_TEST,
      client_secret: process.env.TWITCH_CLIENT_SECRET_TEST,
      grant_type: 'client_credentials',
    }),
  });
};

export default getAccessTokenPromise;

// {
// 	"access_token": "ybhmuhm46re3fnxqs9ty6are8qjkgn",
// 	"expires_in": 5441315,
// 	"token_type": "bearer"
// }
let t = new Date();
let expiryDateTime = new Date(
  t.setSeconds(t.getSeconds() + 5441315)
).toISOString();
// expiryDateTime.toISOString();
console.log('expiryDateTime: ', expiryDateTime);

// {
// 	"access_token": "ybhmuhm46re3fnxqs9ty6are8qjkgn",
// 	"expires_in": 5441315,
// 	"token_type": "bearer",
//   "expiryDateTime": "2021-03-26T21:00:00.000Z"
// }
