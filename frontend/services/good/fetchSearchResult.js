/* eslint-disable no-param-reassign */
import {
  config
} from '../../config/index';

/** 获取搜索历史 */
function mockSearchResult(params) {
  const {
    delay
  } = require('../_utils/delay');
  const {
    getSearchResult
  } = require('../../model/search');

  const data = getSearchResult(params);

  if (data.spuList.length) {
    data.spuList.forEach((item) => {
      item.spuId = item.spuId;
      item.thumb = item.primaryImage;
      item.title = item.title;
      item.price = item.minSalePrice;
      item.originPrice = item.maxLinePrice;
      if (item.spuTagList) {
        item.tags = item.spuTagList.map((tag) => ({
          title: tag.title
        }));
      } else {
        item.tags = [];
      }
    });
  }
  return delay().then(() => {
    return data;
  });
}

/** 获取搜索历史 */
export function getSearchResult(params) {
  console.log(params)
  // if (config.useMock) {
  //   const result = mockSearchResult(params); // 获取模拟结果
  //   console.log('模拟数据:', result); // 打印模拟结果
  //   return result; // 返回模拟结果
  // }
  return new Promise((resolve, reject) => {
    const url = "http://1.15.174.177/api/dish/search/";
    const data = {
      // tags: [params.keyword], // Using params.keyword as the search query in tags
      "tags": ["辣", "海鲜"]
    };

    wx.request({
      url: url,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: data,
      success: (res) => {
        console.log('API返回的结果:', res.data); // 打印返回的结果
        if (res.data.code === 200) {
          resolve(res.data); // Return the result from the API
        } else {
          reject('API error: ' + res.data.message);
        }
      },
      fail: (error) => {
        reject('Network error: ' + error.errMsg);
      },
    });
  });


}