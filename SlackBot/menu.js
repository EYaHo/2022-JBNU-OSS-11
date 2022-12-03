const axios = require('axios');
const cheerio = require('cheerio');

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
let selector;
const getTodayMenu = () => {
  const now = new Date();
  const day = now.getDay();
  const mon = 'table:first>tbody>tr:first td:eq(0)>ul li span';
  const tue = 'table:first>tbody>tr:first td:eq(1)>ul li font';
  const wed = 'table:first>tbody>tr:first td:eq(2)>ul li font';
  const thu = 'table:first>tbody>tr:first td:eq(3)>ul li font';
  const fri = 'table:first>tbody>tr:first td:eq(4)>ul li font';
  switch (day) {
    case 1:
      selector = mon;
      break;
    case 2:
      selector = tue;
      break;
    case 3:
      selector = wed;
      break;
    case 4:
      selector = thu;
      break;
    case 5:
      selector = fri;
      break;
    default:
      selector = '';
  }
  return selector;
};
selector = getTodayMenu();
selector = 'table:first>tbody>tr:first td:eq(4)>ul li font';

webScraping(url, selector).then((res) => {
  console.log(res);
});

const menu = function (rtm, channel) {
  console.log('진수당 메뉴입니다.');
  try {
    rtm.sendMessage('hi', channel);
    return Promise.resolve('success');
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};

module.exports = menu;
