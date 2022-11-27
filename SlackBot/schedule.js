const readFile = require('./readFile');

const { haksa } = readFile('haksa.json');

const parseInput = function (text) {
  if (!text.includes('/')) {
    return false;
  }
  const input = text.split('/');

  if (input.length !== 2) {
    return false;
  }

  const inputNum = [];
  for (let i = 0; i < 2; i += 1) {
    inputNum.push(Number(input[i].toString()));
    if (Number.isNaN(inputNum[i])) {
      console.log('NaN');
      return false;
    }
  }
  let str = '2022';
  for (let i = 0; i < 2; i += 1) {
    str += '-';
    if (inputNum[i] < 10) {
      str += '0';
    }
    str += `${inputNum[i]}`;
  }

  const inputDate = new Date(str);
  return inputDate;
};

const schedule = function (rtm, text, channel) {
  console.log('학 사 일 정');
  const day = text.trim();
  const outputSchedule = [];

  try {
    const inputDate = parseInput(day);
    console.log(`inputDate: ${inputDate}`);
    if (!inputDate) {
      rtm.sendMessage('잘못된 입력입니다.', channel);
      return Promise.resolve('success: invalid input.');
    }

    for (let i = 0; i < haksa.length; i += 1) {
      const startDate = new Date(haksa[i].start);
      console.log('-------------------------');
      console.log(startDate);
      if (inputDate < startDate) {
        console.log('break');
        break;
      } else {
        const endDate = new Date(haksa[i].end);
        console.log(endDate);
        if (inputDate <= endDate) {
          outputSchedule.push(haksa[i].schedule);
          console.log(`find schedule: ${haksa[i].schedule}`);
        }
        console.log('continue searching...');
      }
    }

    if (outputSchedule.length > 0) {
      let promiseLog = '';
      for (let i = 0; i < outputSchedule.length; i += 1) {
        rtm.sendMessage(`${day}은 ${outputSchedule[i]}입니다.`, channel);
        if (i > 0) {
          promiseLog += `, ${outputSchedule[i]}`;
        } else {
          promiseLog += `${outputSchedule[i]}`;
        }
      }
      return Promise.resolve(`success: ${promiseLog}`);
    }
    rtm.sendMessage('저장된 일정이 없습니다..', channel);
    return Promise.resolve('success: no schedule');
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};

module.exports = schedule;
