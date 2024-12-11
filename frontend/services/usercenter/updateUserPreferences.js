/**
 * 更新用户偏好设置
 * @param {Object} data - 需要更新的偏好数据
 */
export function updateUserPreferences(data) {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('authToken'); // 获取存储的认证Token

    if (!token) {
      reject('Authentication token not found. Please log in again.');
      return;
    }

    wx.request({
      url: 'http://1.15.174.177/api/user/preferences', // 替换为实际的API端点
      method: 'PATCH',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`, // 使用 'Token xxx' 认证方式
      },
      data: data,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res.data.error || 'Failed to update preferences.');
        }
      },
      fail: (err) => {
        reject('Network error. Please try again later.');
      }
    });
  });
}