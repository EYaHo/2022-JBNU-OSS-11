const scrap = require('./scrap');

const menu = function (rtm, period, channel) {
  console.log('진수당 메뉴입니다.');
  try {
    const data = scrap.scrap(period);
    rtm.sendMessage(data, channel);
    return Promise.resolve('success');
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};

module.exports = menu;
