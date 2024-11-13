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
export function fetchUserData() {
  return new Promise((resolve, reject) => {
    // 模拟获取用户数据
    resolve({
      avatar: 'https://cloud.tsinghua.edu.cn/f/9d512f8861a842f38d48/?dl=1',
      name: 'User Anonymous',
    });
  });
}