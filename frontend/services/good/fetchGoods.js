import {
  config
} from '../../config/index';


function mockFetchGoodsList(pageIndex = 1, pageSize = 20) {
  const {
    delay
  } = require('../_utils/delay');
  const {
    getGoodsList
  } = require('../../model/goods');

  return delay()
    .then(() => getGoodsList(pageIndex, 20)) // 等待 getGoodsList 的 Promise 完成
    .then((goodsList) => {
      // 处理返回的商品列表
      const result = goodsList.map((item) => ({
        spuId: item.spuId,
        thumb: item.primaryImage,
        title: item.title,
        tags: item.spuTagList.map((tag) => tag.title),
      }));
      return result; // 返回处理后的数据
    });
}

/** 获取商品列表 */
export function fetchGoodsList(pageIndex = 1, pageSize = 20) {
  if (config.useMock) {
    return mockFetchGoodsList(pageIndex, pageSize);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}

export function fetchFavoriteGoodsList(pageIndex = 1, pageSize = 20) {
  const {
    delay
  } = require('../_utils/delay');
  const {
    getGoodsList
  } = require('../../model/goods');

  return delay()
    .then(() => getGoodsList(pageIndex, 20)) // 等待 getGoodsList 的 Promise 完成
    .then((goodsList) => {
      // 处理返回的商品列表
      const result = goodsList.map((item) => ({
        spuId: item.spuId,
        thumb: item.primaryImage,
        //thumb: "https://cloud.tsinghua.edu.cn/f/699e94b18091454db7a8/?dl=1",
        title: item.title,
        tags: item.spuTagList.map((tag) => tag.title),
      }));
      return result; // 返回处理后的数据
    });
}