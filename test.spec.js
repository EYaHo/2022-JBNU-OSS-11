require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');

const fs = require('fs');

const channel = 'C04AA8VUTML';

let token;

try {
  token = fs.readFileSync('token').toString('utf-8');
} catch (err) {
  console.error(err);
}

console.log(token);

const rtm = new RTMClient(token);

(async () => {
  await rtm.start()
    .catch(console.error);
})();

const assert = require('assert');
const greeting = require('./greeting');

let res;

describe('테 스 트 를  시 작 합 니 다 .', async () => {
  before(async () => { res = await greeting(rtm, channel); });

  it('인 사 모 듈 테 스 트', (done) => {
    console.log(res);
    assert.equal(res, 'success');
    done();
  });
});
