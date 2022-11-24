const randomNumber = function () {
    try {
      const randomnum = Math.floor(Math.random() * (4 - 1) + 1);
      return randomnum;
    } catch (error) {
      console.log('error!', error.data);
      return Promise.resolve('error');
    }
  };
  
  module.exports = randomNumber;