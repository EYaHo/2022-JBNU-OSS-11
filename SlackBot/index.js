require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');
const fs = require('fs');

let token;

try {
  token = fs.readFileSync(`${__dirname}/token`).toString('utf-8');
} catch (err) {
  console.error(err);
}

console.log(token);

const rtm = new RTMClient(token);
rtm.start();

const greeting = require('./greeting');
const square = require('./square');

const findDeptOffice = require('./dept');

const schedule = require('./schedule');

let askSchedule = false;


rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  if(askSchedule) {
    schedule(rtm, text, channel);
    askSchedule = false;

  } else if (!Number.isNaN(Number(text))) {
    console.log('square');
    square(rtm, text, channel);

  } else if (text === 'Hi') {
    console.log('feature 1');
    greeting(rtm, channel);

  } else if (text === '학사일정') {
    console.log('feature 2');
    askSchedule = true;
    
  } else if (text === '오늘 밥 뭐야') {
    console.log('feature 3');

  } else {
    console.log('feature 4');
    const b = findDeptOffice(rtm, text, channel);

    if (!b) {
      rtm.sendMessage('I`m alive', channel);
    }
  }
});
