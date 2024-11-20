export function login(username) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://1.15.174.177/api/login/',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        username: username,
      },
      success: (response) => {
        console.log('response code = ', response.statusCode);
        if (response.statusCode === 200) {
          console.log('response', response);
          const token = response.data.token;
          // 将 token 存储到本地
          wx.setStorage({
            key: 'authToken',
            data: `Bearer ${token}`,
          });
          console.log('data = Bearer ', token);
          resolve(token);
        } else {
          reject(`Login failed: ${response.statusCode}`);
        }
      },
      fail: (error) => {
        reject(`Request failed: ${error}`);
      },
    });
  });
}