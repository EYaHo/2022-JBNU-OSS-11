require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');

const readFile = require('./readFile');

const token = readFile('token');
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

  if (askSchedule) {
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
    rtm.sendMessage('안내 받을 날짜를 입력 해주세요. ex) 9/4', channel);
    askSchedule = true;
  } else if (text === '오늘 밥 뭐야') {
    console.log('feature 3');
  } else {
    console.log('feature 4');
    const b = findDeptOffice(rtm, text, channel);
    console.log(b);

    if (!b) {
      rtm.sendMessage('I`m alive', channel);
    }
  }
});
