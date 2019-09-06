const express = require('express');

console.log('environment', process.env.NODE_ENV);

const server = express();

//Making sure the server is listening
server.get('/', (req, res) => {
    res.send(`<h2>It's Working! It's Working!</h2>`)
  });

module.exports = server;