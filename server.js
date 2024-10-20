const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');  // Import CORS middleware

const app = express();
const port = 5000;

const secretKey = '6LdypGYqAAAAAChWdAMhYEX9fiLLnA4vH4NgmLS9'; // Replace with your Google reCAPTCHA secret key

// Enable CORS for all requests
app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.json());

app.post('/verify-recaptcha', (req, res) => {
  const { token } = req.body;

  // Verify the reCAPTCHA token with Google
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  axios
    .post(url)
    .then((response) => {
      const { success } = response.data;
      if (success) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ success: false });
      }
    })
    .catch((error) => {
      console.error('Error verifying reCAPTCHA:', error);
      return res.status(500).json({ success: false });
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
