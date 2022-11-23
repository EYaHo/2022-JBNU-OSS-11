const randomNumber = require('./randomNumber');

const feature1 = function (rtm, channel) {
  console.log('인사를 합시다.');
  const num = randomNumber();
  console.log(num);

  try {
    let greet = '';
    if (num === 1) {
      greet = '안녕하세요.';
    } if (num === 2) {
      greet = '반갑습니다.';
    } if (num === 3) {
      greet = '환영합니다.';
    }
    rtm.sendMessage(greet, channel);
    return greet;
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};

module.exports = feature1;
