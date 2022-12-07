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

const getMenu = (day) => {
  let selector;
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
      break;
  }
  return selector;
};

const week = [[], [], [], [], []];

let selector;
for (let i = 0; i < 5; i += 1) {
  selector = getMenu(i + 1);
  webScraping(url, selector).then((res) => {
    week[i] = res;
  });
}

const menuToText = function (scrapedMenu) {
  let text = '';
  scrapedMenu.forEach((value, index) => {
    text += value;
    if (index < scrapedMenu.length - 1) {
      text += ', ';
    }
  });
  return text;
};

const getTodayMenu = function () {
  const now = new Date();
  const day = now.getDay();
  console.log(day);
  let res;
  if (day < 6) {
    const todayMenu = week[day - 1];
    res = menuToText(todayMenu);
  } else {
    res = '주말은 운영하지 않습니다.';
  }
  return res;
};

const getWeekMenu = function () {
  let weekMenu = '';
  const day = ['월', '화', '수', '목', '금'];
  for (let i = 0; i < 5; i += 1) {
    const dayMenu = menuToText(week[i]);
    weekMenu += `${day[i]} : ${dayMenu}\n`;
  }
  console.log('이번주 메뉴 및 평점');
  return weekMenu;
};

const countingStar = function (res) {
  let star = '';
  if (res >= 0 && res <= 20) {
    star = '★☆☆';
  } else if (res > 20 && res <= 30) {
    star = '★★☆';
  } else if (res > 30) {
    star = '★★★';
  }
  return star;
};

const getTodayRank = function () {
  const leng = getTodayMenu().length;
  console.log(leng);
  const star = countingStar(leng);
  return star;
};

const dayRank = [];
const getWeekRank = function () {
  for (let i = 0; i < 5; i += 1) {
    const todayMenu = week[i];
    const res = menuToText(todayMenu).length;
    const star = countingStar(res);
    dayRank[i] = star;
  }
  return dayRank;
};

const scrap = function (period) {
  if (period === 'today') {
    return getTodayMenu();
  } if (period === 'week') {
    return getWeekMenu();
  }
  return 'error';
};

module.exports = {
  scrap,
  getTodayRank,
  getWeekRank,
};
