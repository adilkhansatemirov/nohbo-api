const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());

const mailRouter = require('./routes/mail');
app.use('/mail', mailRouter);

app.get('/', (req, res) => {
  res.send('Works');
});

app.listen(process.env.PORT || 3030, () => console.log('server started'));
