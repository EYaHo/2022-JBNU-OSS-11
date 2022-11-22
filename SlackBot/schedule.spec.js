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

let channel;
try {
  channel = fs.readFileSync(`${__dirname}/channelID`).toString('utf-8');
} catch (err) {
  console.error(err);
}
console.log(channel);

let haksa;
try {
  haksa = fs.readFileSync(`${__dirname}/haksa.txt`).toString('utf-8');
} catch (err) {
  console.error(err);
}
const lines = haksa.split(/\r?\n/);
const academicSchedule = {};
lines.forEach((line) => {
  const pair = line.split(':');
  academicSchedule[pair[0].trim()] = pair[1].trim();
});

const rtm = new RTMClient(token);

(async () => {
  await rtm.start().catch(console.error);
})();

const assert = require('assert');
const schedule = require('./schedule');

const keys = Object.keys(academicSchedule);
keys.forEach((value) => {
  describe('테스트를 시작합니다.', async () => {
    let res;
    before(async () => { res = await schedule(rtm, value, channel); });

    it('학사 일정 테스트', (done) => {
      console.log(res);
      assert.equal(res, `success: ${academicSchedule[value]}`);
      done();
    });
  });
});
