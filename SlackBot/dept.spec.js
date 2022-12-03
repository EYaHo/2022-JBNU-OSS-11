require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');

const assert = require('assert');

const readFile = require('./readFile');

const token = readFile('token');
console.log(token);
const channel = readFile('channelID');
console.log(channel);

const rtm = new RTMClient(token);

(async () => {
  await rtm.start().catch(console.error);
})();

const findDeptOffice = require('./dept');

const testDept = {
  'Architectural Engineering': 'College of Engineering Building No. 1, room: 132',
  'Korean Language and Literature': 'College of Humanities, room: 320',
};
const keys = Object.keys(testDept);
keys.forEach((dept) => {
  describe('테스트를 시작합니다.', async () => {
    let res;
    before(async () => { res = await findDeptOffice(rtm, dept, channel); });

    it('학과사무실 테스트', (done) => {
      console.log(res);
      assert.equal(res, `success: ${testDept[dept]}`);
      done();
    });
  });
});
