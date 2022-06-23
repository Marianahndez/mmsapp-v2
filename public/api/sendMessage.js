/* eslint-disable max-len */
/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable indent */
const client = require('twilio')(
  process.env.REACT_APP_TWILIO_ACCOUNT_SID,
  process.env.REACT_APP_TWILIO_AUTH_TOKEN,
);

module.exports = async (req, res) => {
  // res.setHeader('Access-Control-Allow-Credentials', true);
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'POST');
  // res.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  // );
  // res.redirect('/');
  if (req.method === 'POST') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    client.messages.create({
      // messagingServiceSid: process.env.REACT_APP_TWILIO_MESSAGING,
      from: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body,
      // statusCallback: 'https://mms-mvp-app.vercel.app/api/sendMessage.js',
    })
    .then((mess) => await res.send({ success: true }))
    .catch((err) => res.send(JSON.stringify({ success: false })));
  }
};
