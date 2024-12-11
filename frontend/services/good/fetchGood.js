import {
  config
} from '../../config/index';

/** 获取商品列表 */
function mockFetchGood(ID = 0) {
  const {
    delay
  } = require('../_utils/delay');
  const {
    genGood
  } = require('../../model/good');
<<<<<<< HEAD
=======
  console.log("mockFetchGood")
>>>>>>> 171a678faa64b470aa2f1e4bb23a739d88c5c5dc
  return delay().then(() => genGood(ID));
}

/** 获取商品列表 */
export function fetchGood(ID = 0) {
  console.log("fetchGood")
  if (config.useMock) {
    return mockFetchGood(ID);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}