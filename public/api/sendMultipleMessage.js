/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable indent */
const client = require('twilio')(
    process.env.REACT_APP_TWILIO_ACCOUNT_SID,
    process.env.REACT_APP_TWILIO_AUTH_TOKEN,
);

export default async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accept', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    req.body.numbersToMessage.forEach((number) => {
        client.messages.create({
            messagingServiceSid: process.env.REACT_APP_TWILIO_MESSAGING,
            from: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
            to: number,
            body: req.body.body,
            statusCallback: 'https://mms-mvp-app.vercel.app/api/sendMultipleMessage',
          })
          .then((mess) => {
            console.log('200 OK', mess.sid);
            return await res.send(JSON.stringify({ success: true }));
          })
          .catch((err) => {
            console.log(err);
            return await res.send(JSON.stringify({ success: false }));
          }).done();
    });
};
