import {
  config
} from '../../config/index';

/** 获取商品列表 */
// function mockFetchGoodsList(pageIndex = 1, pageSize = 20) {
//   console.log("mockFetchGoodsList")
//   const {
//     delay
//   } = require('../_utils/delay');
//   const {
//     getGoodsList
//   } = require('../../model/goods');
//   return delay().then(() =>
//     getGoodsList(pageIndex, pageSize).map((item) => {
//       return {
//         spuId: item.spuId,
//         thumb: item.primaryImage,
//         title: item.title,
//         price: item.minSalePrice,
//         originPrice: item.maxLinePrice,
//         tags: item.spuTagList.map((tag) => tag.title),
//       };
//     })
//   ).then((result) => {
//     // 打印最终返回的数据
//     console.log("Returned Goods List:", result);
//     return result; // 返回处理后的数据
//   });
// }

function mockFetchGoodsList(pageIndex = 1, pageSize = 20) {
  console.log("mockFetchGoodsList");
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
        // thumb: item.primaryImage,
        thumb: "https://cloud.tsinghua.edu.cn/f/699e94b18091454db7a8/?dl=1",
        title: item.title,
        tags: item.spuTagList.map((tag) => tag.title),
      }));
      console.log("Returned Goods List:", result);
      return result; // 返回处理后的数据
    });
}

/** 获取商品列表 */
export function fetchGoodsList(pageIndex = 1, pageSize = 20) {
  console.log("fetchGoodsList")
  if (config.useMock) {
    return mockFetchGoodsList(pageIndex, pageSize);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}