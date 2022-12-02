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

const rtm = new RTMClient(token);

(async () => {
  await rtm.start().catch(console.error);
})();

const assert = require('assert');
const schedule = require('./schedule');

const testSchedule = {
  '10/15': '개교기념일',
  '8월4일': 'invalid input.',
  '8/1': 'no schedule',
  '9/2': '2학기 수강신청 변경 기간',
  '9/7': '2학기 수강신청 변경 기간',
  '9/1': '2학기 개강, 2학기 수강신청 변경 기간',
  '9/4': '2학기 수강신청 변경 기간, 지식재산권의 날',
  '10/19': '(대학원) 석사학위 논문 심사 신청',
  '10/21': '(대학원) 석사학위 논문 심사 신청',
};
const keys = Object.keys(testSchedule);
keys.forEach((date) => {
  describe('테스트를 시작합니다.', async () => {
    let res;
    before(async () => { res = await schedule(rtm, date, channel); });

    it('학사 일정 테스트', (done) => {
      console.log(res);
      assert.equal(res, `success: ${testSchedule[date]}`);
      done();
    });
  });
});
