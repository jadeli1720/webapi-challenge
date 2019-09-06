const express = require('express');
const projectsRouter = require('./projectsRouter');
const actionsRouter = require('./actionsRouter');

console.log('environment', process.env.NODE_ENV);

const server = express();

//custom middleware
function logger(req, res, next) {
    console.log(
      `${req.method} to ${req.url} at ${new Date().toISOString()}`
      );
      next();
  };
  server.use(logger);
  

//Making sure the server is listening
server.get('/', (req, res) => {
    res.send(`<h2>It's Working! It's Working!</h2>`)
  });

  server.use('/projects', projectsRouter );
  server.use('/actions', actionsRouter );


module.exports = server;