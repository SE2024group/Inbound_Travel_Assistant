export function fetchUserData(token) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://1.15.174.177/api/user/',
      method: 'GET',
      header: {
        Authorization: token,
      },
      success: (response) => {
        if (response.statusCode === 200) {
          const {
            avatar,
            nickname,
            username,
            personality_description,
            id,
          } = response.data;
          resolve({
            avatar,
            nickname,
            username,
            personality_description,
            id,
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