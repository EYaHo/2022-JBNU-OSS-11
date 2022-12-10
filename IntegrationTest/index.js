require('dotenv').config();

const axios = require('axios');
const cheerio = require('cheerio');

const { RTMClient } = require('@slack/rtm-api');

const fs = require('fs');

let token;

try {
  token = fs.readFileSync(`${__dirname}/token`).toString('utf-8');
} catch (err) {
  console.error(err);
}

token = token.trim();

let testChannel;

try {
  testChannel = fs.readFileSync(`${__dirname}/channelID`).toString('utf-8');
} catch (err) {
  console.error(err);
}

let testID;

try {
  testID = fs.readFileSync(`${__dirname}/botID`).toString('utf-8');
} catch (err) {
  console.error(err);
}

console.log(token);

const scrap = [];

async function webScraping(url, selector) {
  const res = [];
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);

  $(selector).each((i, elem) => {
    res[i] = $(elem).text();
  });

  return res;
}

const url = 'https://sobi.jbnu.ac.kr/menu/week_menu.php';

const selector = [
  'table:first>tbody>tr:first td:eq(0)>ul li span',
  'table:first>tbody>tr:first td:eq(1)>ul li font',
  'table:first>tbody>tr:first td:eq(2)>ul li font',
  'table:first>tbody>tr:first td:eq(3)>ul li font',
  'table:first>tbody>tr:first td:eq(4)>ul li font'];

const menuToText = (scrapedMenu) => {
  let text = '';
  scrapedMenu.forEach((value, index) => {
    text += value;
    if (index < scrapedMenu.length - 1) {
      text += ', ';
    }
  });
  return text;
};

const countingStar = (res) => {
  let star = '';
  if (res >= 0 && res <= 15) {
    star = '☆☆☆';
  } else if (res > 15 && res <= 20) {
    star = '★☆☆';
  } else if (res > 20 && res <= 30) {
    star = '★★☆';
  } else if (res > 30) {
    star = '★★★';
  }
  return star;
};

const test2Data = {
  학사일정: null,
  '10/15': '10/15은 개교기념일입니다.',
  '8월4일': '잘못된 입력입니다.',
  '8/1': '저장된 일정이 없습니다..',
  '9/2': '9/2은 2학기 수강신청 변경 기간입니다.',
  '9/7': '9/7은 2학기 수강신청 변경 기간입니다.',
  '9/1': '9/1은 2학기 개강입니다.,9/1은 2학기 수강신청 변경 기간입니다.',
  '9/4': '9/4은 2학기 수강신청 변경 기간입니다.,9/4은 지식재산권의 날입니다.',
  '10/19': '10/19은 (대학원) 석사학위 논문 심사 신청입니다.',
  '10/21': '10/21은 (대학원) 석사학위 논문 심사 신청입니다.',
};

const test3Data = {
  '오늘 밥 뭐야': null,
  '이번주 뭐 나와': null,
};

const test4Data = {
  학과사무실안내: null,
  'Architectural Engineering': 'The office of Architectural Engineering is located in: College of Engineering Building No. 1, room: 132',
  'Korean Language and Literature': 'The office of Korean Language and Literature is located in: College of Humanities, room: 320',
  Engineering: 'Urban Engineering을(를) 말씀하시는 건가요?\nCollege of Engineering Building No. 9, room: 917 입니다.',
  compute: 'Computer Science and Engineering을(를) 말씀하시는 건가요?\nCollege of Engineering Building No. 7, room: 224 입니다.',
};

const rtm = new RTMClient(token);

rtm.start();

async function test1(channel) { await rtm.sendMessage('hi', channel); }
async function test2(channel, i) { await rtm.sendMessage(Object.keys(test2Data)[i], channel); }
async function test3(channel, i) { await rtm.sendMessage(Object.keys(test3Data)[i], channel); }
async function test4(channel, i) { await rtm.sendMessage(Object.keys(test4Data)[i], channel); }

const testMap = {
  TEST1(channel) { test1(channel); },
  TEST2(channel, i) { test2(channel, i); },
  TEST3(channel, i) { test3(channel, i); },
  TEST4(channel, i) { test4(channel, i); },
};

const oneCaseTest2 = (text, res) => {
  console.log(`res: ${res}`);

  if (text !== res) {
    console.log('case 실패.');
    return false;
  }
  console.log('case 통과.');
  return true;
};

const oneCaseTest3 = (text, status) => {
  let res = '';
  const now = new Date();
  const day = now.getDay();
  const weekday = ['월', '화', '수', '목', '금'];
  switch (status) {
    case 0:
      if (day > 0 && day < 6) {
        res = scrap[day - 1];
      } else {
        res = '주말은 운영하지 않습니다.';
      }
      break;
    case 1:
      res = countingStar(text.length);
      break;
    case 2:
      for (let i = 0; i < 5; i += 1) {
        const dayMenu = menuToText(scrap[i]);
        res += `${weekday[i]} : ${dayMenu}\n`;
      }
      break;
    case 3:
      for (let i = 0; i < 5; i += 1) {
        res += `${weekday[i]} - ${countingStar(menuToText(scrap[i]).length)}`;
        if (i < 4) res += '\n';
      }
      break;
    default:
      res = 'error';
      break;
  }
  console.log(`res: ${res}`);
  if (text !== res) {
    console.log('case 실패.');
    return false;
  }
  console.log('case 통과.');
  return true;
};

const oneCaseTest4 = (text, i) => {
  if (text !== Object.values(test4Data)[i]) {
    console.log('case 실패.');
    return false;
  }
  console.log('case 통과.');
  return true;
};

let feature = 0;
const MAX_TEST1 = 10;

selector.forEach((value, index) => {
  webScraping(url, value).then((res) => {
    scrap[index] = res;
  });
});

rtm.on('ready', async () => {
  await rtm.sendMessage('테스트를 시작합니다.', testChannel);
  console.log('테스트 루틴 시작합니다.');
  feature = 1;

  for (let i = 0; i < MAX_TEST1; i += 1) {
    testMap.TEST1(testChannel);
  }

  for (let i = 0; i < Object.keys(test2Data).length - 1; i += 1) {
    testMap.TEST2(testChannel, 0);
    testMap.TEST2(testChannel, i + 1);
  }

  for (let i = 0; i < Object.keys(test3Data).length; i += 1) {
    testMap.TEST3(testChannel, i);
  }

  for (let i = 0; i < Object.keys(test4Data).length - 1; i += 1) {
    testMap.TEST4(testChannel, 0);
    testMap.TEST4(testChannel, i + 1);
  }
});

const successSet = [true, true, true, true];

let status1 = 0;
const success1Buffer = [false, false, false];

let status2 = 0;
let buffer2 = [];
let buffPointer = 0;

let status3 = 0;

let status4 = 0;

const successLog = (index) => {
  if (!successSet[index - 1]) {
    console.log(`테스트 #${index} 실패.`);
  } else {
    console.log(`테스트 #${index} 성공.`);
  }
};
const testFailed = (featureNum) => {
  successSet[featureNum - 1] = false;
};

rtm.on('message', (message) => {
  const { text } = message;

  console.log('받은 메시지: ', text);

  if (message.user === testID) {
    switch (feature) {
      case 1:
        if (status1 === 0) {
          console.log(feature);
        }
        if (text === '안녕하세요.') {
          success1Buffer[0] = true;
        }
        if (text === '반갑습니다.') {
          success1Buffer[1] = true;
        }
        if (text === '환영합니다.') {
          success1Buffer[2] = true;
        }

        if (status1 === MAX_TEST1) {
          if (success1Buffer.includes(false)) {
            testFailed(feature);
          }
          successLog(feature);
          feature = 2;
          console.log(feature);
        }
        status1 += 1;
        break;
      case 2:
        if (status2 % 2 === 1) {
          const value = Object.values(test2Data)[status2 - parseInt(status2 / 2, 10)];

          buffer2 = value.split(',');
          if (buffPointer < buffer2.length) {
            if (!oneCaseTest2(text, buffer2[buffPointer])) {
              testFailed(feature);
            }

            if (buffPointer < buffer2.length - 1) {
              buffPointer += 1;
              status2 -= 1;
            } else {
              buffer2.length = 0;
              buffPointer = 0;
            }
          }
        }
        if (status2 === (Object.keys(test2Data).length - 1) * 2 - 1) {
          successLog(feature);
          feature = 3;
          console.log(feature);
        }
        status2 += 1;
        break;
      case 3:
        if (!oneCaseTest3(text, status3)) {
          testFailed(feature);
        }
        if (status3 > 2) {
          successLog(feature);
          feature = 4;
          console.log(feature);
        }
        status3 += 1;
        break;
      case 4:
        if (status4 % 2 === 1) {
          if (!oneCaseTest4(text, status4 - parseInt(status4 / 2, 10))) {
            testFailed(feature);
          }
        }
        if (status4 === (Object.keys(test4Data).length - 1) * 2 - 1) {
          successLog(feature);
        }
        status4 += 1;
        break;
      default:
        break;
    }
  }
});
