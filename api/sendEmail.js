/* eslint-disable quote-props */
/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
/* eslint-disable global-require */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-var-requires */
const sgMail = require('@sendgrid/mail');

export default async (req, response) => {
    sgMail.setApiKey(process.env.REACT_APP_SENDGRID_AUTH_TOKEN);
    const msg = {
      to: 'marianazamarripa.mz@gmail.com',
      from: { email: 'mariana.zamarripa@hittec.mx', name: 'Your contact form' },
      subject: 'Test email mss app',
      text: 'New email from my app',
    };
    try {
      await sgMail.send(msg);
      response.setStatusCode(200);
      response.setBody({ success: true });
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
        const message = error.response.body.errors[0];
      }

      response.setStatusCode(400);
      response.setBody({ success: false, error: 'err message' });
    //   return callback(null, errorResponse(response, error.response.body.errors[0]));
    }
  };
