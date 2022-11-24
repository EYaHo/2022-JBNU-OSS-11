const fs = require('fs');

let dataBuffer;
try {
  dataBuffer = fs.readFileSync(`${__dirname}/office.json`).toString('utf-8');
} catch (err) {
  console.error(err);
}
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
const arr = data.deptOffice;

const findDeptOffice = function (rtm, text, channel) {
  console.log('학과 사무실을 찾습니다.');
  console.log(text);

  try {
    let res;

    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].dept === text) {
        res = `${arr[i].buildingName}`;
        if (arr[i].buildingNumber !== '0') {
          res += ` No. ${arr[i].buildingNumber}`;
        }
        res += `, room: ${arr[i].roomNumber}`;
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
