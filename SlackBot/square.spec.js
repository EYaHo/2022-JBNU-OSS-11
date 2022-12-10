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
const square = require('./square');

const testNum = [-5, 0, 1, 7];

testNum.forEach((value) => {
  describe('테스트를 시작합니다.', async () => {
    let res;
    before(async () => { res = await square(rtm, value, channel); });

    it('제곱 모듈 테스트', (done) => {
      console.log(res);
      assert.equal(res, `success: ${value * value}`);
      done();
    });
  });
});
