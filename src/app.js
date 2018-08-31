'use strict';

require('dotenv').config({ silent: true });

const express = require('express');
const { Wit, log } = require('node-wit');
const bot = require('bot');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
});

app.use(express.json({limit:process.env.BODY_LIMIT || '10mb',}));
// app.use(express.static('public'));

module.exports = app;
