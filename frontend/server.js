const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
  const { to, message } = req.body;

  client.messages
    .create({
      body: message,
      from: 'YOUR_TWILIO_PHONE_NUMBER',
      to: to
    })
    .then(message => res.send({ success: true, messageSid: message.sid }))
    .catch(error => res.status(500).send({ success: false, error: error.message }));

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
