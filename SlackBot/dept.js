const readFile = require('./readFile');

const { deptOffice } = readFile('office.json');

const findDeptOffice = function (rtm, text, channel) {
  console.log('학과 사무실을 찾습니다.');
  console.log(text);

  try {
    let res;

    for (let i = 0; i < deptOffice.length; i += 1) {
      if (deptOffice[i].dept === text) {
        res = `${deptOffice[i].buildingName}`;
        if (deptOffice[i].buildingNumber !== '0') {
          res += ` No. ${deptOffice[i].buildingNumber}`;
        }
        res += `, room: ${deptOffice[i].roomNumber}`;
        break;
      }
    }

    if (res === undefined) {
      console.log(`${text}는 없는 학과입니다.`);
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
