const scrap = require('./scrap');

const ranking = function (rtm, period, channel) {
  console.log('진수당 메뉴 평가입니다.');
  try {
    if (period === 'today') {
      const data = scrap.getTodayRank();
      console.log(data);
      rtm.sendMessage(data, channel);
    } if (period === 'week') {
      const dayRank = scrap.getWeekRank();
      console.log(dayRank[0]);
      console.log(dayRank[1]);
      console.log(dayRank[2]);
      console.log(dayRank[3]);
      console.log(dayRank[4]);
      rtm.sendMessage(`월 - ${dayRank[0]}\n화 - ${dayRank[1]}\n수 - ${dayRank[2]}\n목 - ${dayRank[3]}\n금 - ${dayRank[4]}`, channel);
    }
    return Promise.resolve('success');
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};

module.exports = ranking;
