const express = require('express');
const router = express.Router();

const mailjet = require('node-mailjet').connect('05b5666055bbf6dfe42636ff494e1f8e', '7d062374300e5e363c4e1efb32ae61a6');

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.post('/', async (req, res) => {
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'adilkhansatemirov@gmail.com',
          Name: 'Speakia.kz',
        },
        To: [
          {
            Email: 'akmor.shokparbay@nu.edu.kz',
            // Email: '170103156@stu.sdu.edu.kz',
            Name: 'Adilkhan',
          },
        ],
        Subject: 'Новая заявка Speakia.kz',
        TextPart: `Заявка от ${req.body.name}, номер: ${req.body.phoneNumber}`,
        HTMLPart:
          `<p>Заявка от <strong>${req.body.name}</strong>, номер: <strong>${req.body.phoneNumber}</strong></p>`,
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
