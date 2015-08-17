// var envs = require('envs');
// var express = require('express');
// var env = require('../../.env');

// var app = express();

// test env api keys

// If NODE_ENV is not set,
// then this application will assume it's prod by default.
// app.set('environment', envs('NODE_ENV', 'production'));

// Usage examples:
// app.set('consumer_key', envs('CONSUMER_KEY'));


// console.log('CONSUMER_KEY',envs('CONSUMER_KEY'));
// console.log('CONSUMER_SECRET',envs('CONSUMER_SECRET'));
// console.log('ACCESS_TOKEN_KEY',envs('ACCESS_TOKEN_KEY'));
// console.log('ACCESS_TOKEN_SECRET',envs('ACCESS_TOKEN_SECRET'));


// envs('CONSUMER_KEY') = 'pKI2HJZDJueoYxbizvTYo2ssa';
// envs('CONSUMER_KEY') = 'hiDaveueoYxbizvTYo2ssa';

// console.log('CONSUMER_KEY-AFTER',envs('CONSUMER_KEY'));

console.log('CONSUMER_KEY',process.env.CONSUMER_KEY);
console.log('CONSUMER_SECRET',process.env.CONSUMER_SECRET);
console.log('ACCESS_TOKEN_KEY',process.env.ACCESS_TOKEN_KEY);
console.log('ACCESS_TOKEN_SECRET',process.env.ACCESS_TOKEN_SECRET);

