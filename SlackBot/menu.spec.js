/* eslint-disable prefer-arrow-callback */
const assert = require('assert');
const axios = require('axios');
const cheerio = require('cheerio');

async function webScraping(url, selector) {
  const res = [];
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  let noMenu = 0;

  $(selector).each((i, elem) => {
    res[i] = $(elem).text();
    console.log(res[i]);
  });
  if (res.length === 0) {
    noMenu = 1;
  }
  return noMenu;
}
const url = 'https://sobi.jbnu.ac.kr/menu/week_menu.php';
const selector = [
  'table:first>tbody>tr:first td:eq(0)>ul li span',
  'table:first>tbody>tr:first td:eq(1)>ul li font',
  'table:first>tbody>tr:first td:eq(2)>ul li font',
  'table:first>tbody>tr:first td:eq(3)>ul li font',
  'table:first>tbody>tr:first td:eq(4)>ul li font'];

selector.forEach((value) => {
  describe('메뉴 테스트를 시작합니다.', function() {
    let res;
    beforeEach(async function() {
      res = await webScraping(url, value);
    });
    it('메뉴 selector 테스트', function(done) {
      this.timeout(10000);
      assert.equal(res, 0);
      done();
    });
  });
});
