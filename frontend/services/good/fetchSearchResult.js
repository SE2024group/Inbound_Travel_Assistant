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
export function getSearchResultFilter(params) {
  console.log(params);
  return new Promise((resolve, reject) => {
    const url = "http://1.15.174.177/api/dish/advanced_search/";
    const data = {
      text: params.keyword, // 使用传入的 keyword 作为搜索文本
      filter: [] // 初始化过滤条件为空数组
    };

    // 如果有过滤条件，构建 filter 数组
    if (params.filter && Array.isArray(params.filter)) {
      data.filter = params.filter.map(f => ({
        tag: f.tag, // 过滤标签
        preference: f.preference // 用户偏好，如 LIKE 或 DISLIKE
      }));
    }

    wx.request({
      url: url,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: data,
      success: (res) => {
        console.log('API 返回的结果:', res.data); // 打印返回的结果

        // 检查 API 返回的 code 是否为 200，表示成功
        if (res.data.code === 200) {
          resolve(res.data); // 返回结果
        } else {
          reject('API 错误: ' + res.data.message); // 返回错误信息
        }
      },
      fail: (error) => {
        reject('网络错误: ' + error.errMsg); // 处理网络错误
      },
    });
  });
}

export function getSearchResult(params) {

  console.log(params)
  return new Promise((resolve, reject) => {
    const url = "http://1.15.174.177/api/dish/advanced_search/";
    const data = {
      "text": params.keyword, // 使用 params.keyword 作为搜索的文本
      "filter": []
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
          resolve(res.data); // 返回 API 结果
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