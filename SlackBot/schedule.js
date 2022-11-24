const fs = require('fs');

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

const keys = Object.keys(academicSchedule);

const schedule = function (rtm, text, channel) {
  console.log('학 사 일 정');
  const day = text.trim();
  let answer;
  try {
    if (text.includes('/')) {
      if (keys.includes(day)) {
        answer = academicSchedule[day];
        rtm.sendMessage(`${day}은 ${answer}입니다.`, channel);
      } else {
        answer = '저장된 일정이 없습니다..';
        rtm.sendMessage(answer, channel);
      }
    } else {
      answer = '잘못된 입력입니다.';
      rtm.sendMessage(answer, channel);
    }
    return Promise.resolve(`success: ${answer}`);
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};
module.exports = schedule;
