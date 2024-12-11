import {
  genGood
} from './good';

// export function getGoodsList(baseID = 0, length = 10) {
//   console.log("getGoodsList")
//   return new Array(length).fill(0).map((_, idx) => genGood(idx + baseID));
// }

// export const goodsList = getGoodsList();


export function getGoodsList(baseID = 0, length = 20) {
  // 生成一个 Promise 数组
<<<<<<< HEAD
=======
  console.log("进入getGoodList")
>>>>>>> 171a678faa64b470aa2f1e4bb23a739d88c5c5dc
  const promises = new Array(20).fill(0).map((_, idx) => genGood(idx + baseID));

  // 返回一个 Promise，使用 Promise.all 等待所有的 Promise 完成
  return Promise.all(promises);
}

// 使用示例
export const goodsList = getGoodsList()
  .then(goodsList => {
<<<<<<< HEAD
    // console.log("获取到的商品列表:", goodsList);
=======
    console.log("获取到的商品列表:", goodsList);
>>>>>>> 171a678faa64b470aa2f1e4bb23a739d88c5c5dc
  })
  .catch(error => {
    console.error("获取商品列表时出错:", error);
  });