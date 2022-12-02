const fs = require('fs');

const readFile = function (fileName) {
  let file;

  if (fileName.includes('.json')) {
    try {
      file = fs.readFileSync(`${__dirname}/${fileName}`).toString('utf-8');
    } catch (err) {
      console.error(err);
    }

    const dataJSON = file.toString();
    return JSON.parse(dataJSON);
  } else {
    try {
      file = fs.readFileSync(`${__dirname}/${fileName}`).toString('utf-8');
    } catch (err) {
      console.error(err);
    }
  
    return file;
  }
};

module.exports = readFile;
