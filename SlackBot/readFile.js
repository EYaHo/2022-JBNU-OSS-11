const fs = require('fs');

const readFile = function (fileName) {
  let dataBuffer;

  if (fileName.includes('.json')) {
    try {
      dataBuffer = fs.readFileSync(`${__dirname}/${fileName}`).toString('utf-8');
    } catch (err) {
      console.error(err);
    }

    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  }

  try {
    dataBuffer = fs.readFileSync(`${__dirname}/${fileName}`).toString('utf-8');
  } catch (err) {
    console.error(err);
  }

  return dataBuffer;
};

module.exports = readFile;
