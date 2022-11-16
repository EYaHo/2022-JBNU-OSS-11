const square = function (rtm, text, channel) {
  console.log('제곱을 실시합니다.');
  console.log(text);

  try {
    const res = text * text;
    rtm.sendMessage(`The result is ${res}`, channel);
    return Promise.resolve(`success: ${res}`);
  } catch (error) {
    console.log('error!', error.data);
    return Promise.resolve('error');
  }
};

module.exports = square;
