require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');

const fs = require('fs');

let token;

try {
  token = fs.readFileSync('./token').toString('utf-8');
} catch (err) {
  console.error(err);
}

console.log(token);

const rtm = new RTMClient(token);

rtm.start();

const feature1 = require('./feature1');

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  switch (text) {
    case 'Hi':
      feature1(rtm, channel);
      break;
    default:
      rtm.sendMessage('I`m alive', channel);
  }
});
