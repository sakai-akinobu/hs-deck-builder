const express = require('express');
const cardsRouter = require('./routers/cards');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Content-Type', 'application/json');
  next();
});

app.use('/api/v1', cardsRouter);

const PORT = 3000;
app.listen(PORT);
