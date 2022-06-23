/* eslint-disable func-names */
/* eslint-disable max-len */
/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable indent */
const client = require('twilio')(
  process.env.REACT_APP_TWILIO_ACCOUNT_SID,
  process.env.REACT_APP_TWILIO_AUTH_TOKEN,
);

exports.handler = async function (event, context) {
  const eventTo = JSON.parse(event.body);
  client.messages.create({
    from: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
    to: eventTo.to,
    body: eventTo.body,
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
