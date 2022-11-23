require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');
const fs = require('fs');

let status = 0;

let token;
try {
  token = fs.readFileSync(`${__dirname}/tokentestbot`).toString('utf-8');
} catch (err) {
  console.error(err);
}

token = token.trim();
const testChannel = 'C04BHH34GGK';
const testuID = 'U047E3BBYAZ';

console.log(token);

const rtm = new RTMClient(token);
rtm.start();

rtm.on('ready', async () => {
  // eslint-disable-next-line no-unused-vars
  const rdy1 = await rtm.sendMessage('테 스 트 를 시작 한다', testChannel);
  console.log('테스트 루틴 시작함');

  // eslint-disable-next-line no-unused-vars
  const rdy2 = await rtm.sendMessage('hi', testChannel);
  status += 1;
});

rtm.on('message', (message) => {
  const { text } = message;

  console.log('받 은 메세 지 : ', text);

  if (message.user === testuID) {
    switch (status) {
      case 1:
        if (text === 'Hello') {
          console.log('테스트 #1 성공');
        } else {
          console.log('테스트 #1 실패');
          process.exit(1);
        }
        rtm.sendMessage('4', testChannel);
        status += 1;
        console.log('테스트 #2 시작');
        break;
      case 2:
        if (text === 'The result is 16') {
          console.log('#2 성공');
        } else {
          console.log('#2 실패');
          process.exit(1);
        }
        rtm.sendMessage('학사일정', testChannel);
        status += 1;
        break;
      case 3:
        rtm.sendMessage('10/15', testChannel);
        status += 1;
        break;
      case 4:
        if (text === '10/15은 개교기념일입니다.') {
          console.log('#3 성공');
        } else {
          console.log('#3 실패');
          process.exit(1);
        }
        break;
      default:
        console.log('test is over');
    }
  } else {
    rtm.sendMessage('sorry, only testbot', testChannel);
  }
});
