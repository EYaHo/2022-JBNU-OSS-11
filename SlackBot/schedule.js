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

const schedule = function (rtm, text, channel) {
  console.log('학 사 일 정');
  try {
    if (Object.keys(academicSchedule).includes(text)) {
      rtm.sendMessage(`${text}은 ${academicSchedule[text]}입니다.`, channel);
    } else {
      rtm.sendMessage('잘못된 입력입니다.', channel);
    }
    return Promise.resolve(`success: ${academicSchedule[text]}`);
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};
module.exports = schedule;
