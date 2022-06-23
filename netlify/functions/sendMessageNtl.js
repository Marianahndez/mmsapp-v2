/* eslint-disable global-require */
/* eslint-disable func-names */
/* eslint-disable max-len */
/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable indent */

exports.handler = async function (event, context) {
  const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
  const authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  const eventTo = JSON.parse(event.body);
  console.log('event tkn: ', authToken);
  console.log('event sid: ', accountSid);
  console.log('event: ', eventTo);
  client.messages.create({
    from: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
    to: eventTo.to,
    body: eventTo.body,
  }).then((res) => console.log('res ', res));
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
