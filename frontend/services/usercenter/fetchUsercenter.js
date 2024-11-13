import {
  config
} from '../../config/index';

/** 获取个人中心信息 */
function mockfetchUserData() {
  const {
    delay
  } = require('../_utils/delay');
  const {
    genUsercenter
  } = require('../../model/usercenter');
  return delay(200).then(() => genUsercenter());
}

/** 获取个人中心信息 */
export function fetchUserData(token) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://1.15.174.177/api/userinfo/',
      method: 'GET',
      header: {
        Authorization: token,
      },
      success: (response) => {
        if (response.statusCode === 200) {
          const {
            avatar,
            nickname
          } = response.data;
          resolve({
            avatar,
            name: nickname,
          });
        } else {
          reject(`Error: ${response.statusCode}`);
        }
      },
      fail: (error) => {
        reject(`Request failed: ${error}`);
      },
    });
  });
}