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

const testArr = [
  'Architectural Engineering',
  'Korean Language and Literature',
];
const resArr = [
  'College of Engineering Building No. 1, room: 132',
  'College of Humanities, room: 320',
];

const rtm = new RTMClient(token);

(async () => {
  await rtm.start().catch(console.error);
})();

const assert = require('assert');
const findDeptOffice = require('./dept');

testArr.forEach((value, index) => {
  describe('테스트를 시작합니다.', async () => {
    let res;
    before(async () => { res = await findDeptOffice(rtm, value, channel); });

    it('학과사무실 모듈 테스트', (done) => {
      console.log(res);
      assert.equal(res, `success: ${resArr[index]}`);
      done();
    });
  });
});
