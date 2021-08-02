const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 6700;

// place holder for the data
const users = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './out')));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './out/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});