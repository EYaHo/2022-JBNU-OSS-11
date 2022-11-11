const greeting = function (rtm, channel) {
  console.log('인사를 합시다.');

  try {
    rtm.sendMessage('Hello!', channel);
    return Promise.resolve('success');
  } catch (error) {
    rtm.sendMessage('error!', channel);
    return Promise.resolve('error');
  }
};

module.exports = greeting;
