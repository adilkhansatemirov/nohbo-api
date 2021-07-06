const express = require('express');
const router = express.Router();

const mailjet = require('node-mailjet').connect('05b5666055bbf6dfe42636ff494e1f8e', '7d062374300e5e363c4e1efb32ae61a6');

router.get('/', (req, res) => {
  res.send('Hello world nohbo');
});

router.post('/', async (req, res) => {
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'adilkhansatemirov@gmail.com',
          Name: 'Nohbo.com',
        },
        To: [
          {
            // Email: 'akmor.shokparbay@nu.edu.kz',
            Email: '170103156@stu.sdu.edu.kz',
            Name: 'Adilkhan',
          },
        ],
        Subject: 'New message Nohbo.com',
        TextPart: `Message from ${req.body.firstName} ${req.body.lastName}, email: ${req.body.email}, message: ${req.body.message}`,
        HTMLPart: `<div>
                    <p>Message from <strong>${req.body.firstName} ${req.body.lastName}</strong>, email: <strong>${req.body.email}</strong></p>
                    <p>Message text: ${req.body.message}</p>
                  </div>`,
        CustomID: 'AppGettingStartedTest',
      },
    ],
  });

  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });

  res.json({ data: req.body });
});

module.exports = router;
