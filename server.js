'use strict';

require('dotenv').config({ silent: true });

const cluster = require('cluster');
const CPUs = require('os').cpus().length;

const app = require('./src/app');
const port = process.env.PORT || 3000;

const http = require('http');
const server = http.createServer(app);

/*
// For HTTPS comment codes at lines 11 and 12 and uncomment this code

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync(process.env.SSL_KEY),
  cert: fs.readFileSync(process.env.SSL_CER),

  // To test in localhost you can create self-sign certificate and add this in options
  // requestCert: false,
  // rejectUnauthorized: false,
}

const server = https.createServer(options, app);
*/


if (cluster.isMaster) {
  console.log('===================================');
  console.log('             WIT.AI (=             ');
  console.log('===================================');
  console.log('Running master processor');

  for (let cpu=0; i< CPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log('- WARNING -', `Worker ${worker.process.pid} die.`, `${code}`, `SIGNAL: ${signal}`);
    console.log('[WIT.AI] Initializing a new worker');
    cluster.fork();
  });

} else {
  server.listen(port, '0.0.0.0', () => {
    console.log(`[WIT.AI] Running on port ${port}`);
    console.log(`[WIT.AI] Running process ${cluster.isMaster ? '\'MASTER\'' : '\'CHILD\''}!\n`);
  });
}
