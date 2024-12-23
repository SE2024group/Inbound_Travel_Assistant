import {
  config
} from '../../config/index';


function GoodsList(pageIndex = 1, pageSize = 20) {
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

  return GoodsList(pageIndex, pageSize);

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
        title: item.title,
        tags: item.spuTagList.map((tag) => tag.title),
      }));
      return result; // 返回处理后的数据
    });
}
