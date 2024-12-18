/**
 * 更新用户偏好设置
 * @param {Object} data - 需要更新的偏好数据
 */

export const updateUserPreferences = (preferences) => {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'authToken',
      success: (res) => {
        const token = res.data;
        wx.request({
          url: 'http://1.15.174.177/api/user/preferences/',
          method: 'PATCH',
          header: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          data: preferences,
          success: (response) => {
            if (response.statusCode === 200) {
              resolve(response.data);
            } else {
              reject(response.data.detail || 'Update failed');
            }
          },
          fail: (error) => {
            reject(error);
          }
        });
      },
      fail: () => {
        reject('No auth token found');
      },
    });
  });
};