/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable indent */
const client = require('twilio')(
    process.env.REACT_APP_TWILIO_ACCOUNT_SID,
    process.env.REACT_APP_TWILIO_AUTH_TOKEN,
);

export default async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    req.body.numbersToMessage.forEach((number) => {
        client.messages.create({
            from: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
            to: number,
            body: req.body.body,
          })
          .then((mess) => {
            res.send(JSON.stringify({ success: true }));
            console.log('200 OK', mess.sid);
          })
          .catch((err) => {
            console.log(err);
            res.send(JSON.stringify({ success: false }));
          }).done();
    });
};
