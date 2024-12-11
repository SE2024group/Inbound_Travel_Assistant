// /services/login/login.js

export function login(username, password) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://1.15.174.177/api/login/',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        username: username,
        password: password,
      },
      success: (response) => {
        console.log('response code = ', response.statusCode);
        if (response.statusCode === 200) {
          console.log('response', response);
          const token = response.data.token;
          // 将 authToken 存储到本地
          wx.setStorage({
            key: 'authToken',
            data: `Token ${token}`,
            success: () => {
              // 设置 loggedBy 为 'auth'
              wx.setStorage({
                key: 'loggedBy',
                data: 'auth',
                success: () => {
                  resolve(token);
                },
                fail: () => {
                  reject('设置登录方式失败');
                }
              });
            },
            fail: () => {
              reject('存储 authToken 失败');
            }
          });
          console.log('data = Bearer', token);
        } else {
          // 根据 API 文档，可能返回具体的错误信息
          if (response.data && response.data.error) {
            reject(response.data.error);
          } else {
            reject(`登录失败: ${response.statusCode}`);
          }
        }
      },
      fail: (error) => {
        reject(`请求失败: ${error}`);
      },
    });
  });
}