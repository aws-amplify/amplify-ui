const express = require('express');

const app = express();

const server = app.listen(9091, '127.0.0.1', () => {
  console.log(
    `Running express server on '${JSON.stringify(server.address())}'`
  );
});

app.post('/', (req, res) => {
  res.status(200);
  res.send({});
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Trying to exit gracefully');
  server.close(() => {
    console.log('Express server closed. Asking process to exit.');
    process.exit();
  });
});
