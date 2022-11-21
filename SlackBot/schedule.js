/* eslint-disable no-restricted-syntax */
const fs = require('fs');

let haksa;

try {
  haksa = fs.readFileSync('haksa.txt').toString('utf-8');
} catch (err) {
  console.error(err);
}
const lines = haksa.split(/\r?\n/);
const keys = [];
const values = [];

for (const line of lines) {
  const pair = line.split(':');
  keys.push(pair[0].trim());
  values.push(pair[1].trim());
}
const academicSchedule = keys.reduce((acc, curr, idx) => {
  acc[curr] = values[idx];
  return acc;
}, {});

const schedule = function (rtm, channel) {
  console.log('학 사 일 정');
  rtm.sendMessage('안내 받을 날짜를 입력 해주세요.', channel);
  rtm.on('message', (date) => {
    const day = date.text;
    if (keys.includes(day)) {
      rtm.sendMessage(academicSchedule[day], channel);
    } else {
      rtm.sendMessage('잘못된 입력입니다.', channel);
    }
  });
};

module.exports = schedule;
