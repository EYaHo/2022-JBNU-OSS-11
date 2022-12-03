const stringSimilarity = require('string-similarity');
const readFile = require('./readFile');

const { deptOffice } = readFile('office.json');

const findDeptOffice = function (rtm, text, channel) {
  console.log('학과 사무실을 찾습니다.');
  console.log(text);

  try {
    let res;

    for (let i = 0; i < deptOffice.length; i += 1) {
      if (deptOffice[i].dept.toLowerCase().replace(/ /g, '') === text.toLowerCase().replace(/ /g, '')) {
        res = `${deptOffice[i].buildingName}`;
        if (deptOffice[i].buildingNumber !== '0') {
          res += ` No. ${deptOffice[i].buildingNumber}`;
        }
        res += `, room: ${deptOffice[i].roomNumber}`;
        break;
      }
    }
    if (res === undefined) {
      let answer;
      let max = 0;
      for (let i = 0; i < deptOffice.length; i += 1) {
        const point = stringSimilarity.compareTwoStrings(text, deptOffice[i].dept);
        if (point > max) {
          max = point;
          answer = deptOffice[i].dept;
          res = `${deptOffice[i].buildingName}`;
          if (deptOffice[i].buildingNumber !== '0') {
            res += ` No. ${deptOffice[i].buildingNumber}`;
          }
          res += `, room: ${deptOffice[i].roomNumber}`;
        }
      }
      rtm.sendMessage(`${answer}을 말씀하시는 건가요?\n${res} 입니다.`, channel);
      console.log(`${text}와 유사한 답 출력`);
      return false;
    }
    rtm.sendMessage(`The office of ${text} is located in: ${res}`, channel);
    return Promise.resolve(`success: ${res}`);
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};

module.exports = findDeptOffice;
