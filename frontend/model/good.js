/**
 * @param {string} id
 * @param {number} [available] 库存, 默认1
 */

function fetchWithTimeout(url, options = {}, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      // 弹出提示框，显示超时错误信息
      wx.showToast({
        title: 'Request Timeout', // 英文提示信息
        icon: 'none', // 无图标
        duration: 2000 // 显示时间 2秒
      });

      reject(new Error('Request Timeout')); // Reject promise with error
    }, timeout);

    const authToken = wx.getStorageSync('authToken') || '';

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${authToken}`,
      ...options.header // 合并传入的 header
    };

    wx.request({
      url,
      method: options.method || 'GET',
      data: options.data || {},
      header: headers,
      success: (response) => {
        clearTimeout(timer);
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve(response.data);
        } else {
          reject(new Error(`HTTP error! status: ${response.statusCode}`));
        }
      },
      fail: (error) => {
        clearTimeout(timer);

        // 这里可以根据具体的错误信息显示不同的提示
        let errorMessage = "fail to load"; // 默认的错误提示

        // 检查错误类型，进行适当处理
        if (error.errMsg.includes('request:fail')) {
          if (error.errMsg.includes('net::ERR_INTERNET_DISCONNECTED')) {
            errorMessage = "Network disconnected. Please check your internet connection.";
          } else {
            errorMessage = "Network request failed. Please try again.";
          }
        } else {
          errorMessage = "An unknown error occurred.";
        }

        // 在小程序中显示弹窗提示
        wx.showToast({
          title: errorMessage,
          icon: 'none', // 使用默认的提示图标
          duration: 2000 // 设置显示时长
        });

        // 还可以选择将错误信息抛出或传递给其他地方进行处理
        reject(error);
      }
    });

  });
}



export function genGood(id, available = 1) {
  return new Promise((resolve, reject) => {
    if (id == 0) {
      id = 5;
    }
    fetchWithTimeout(`http://1.15.174.177/api/dish/${id}/`)
      // fetchWithTimeout(`http://1.15.174.177/api/dish/1/`)
      .then(response => {
        return response; // 直接返回响应
      })
      .then(apiData => {
        // 进行转换
        // console.log("成功获取数据:", apiData); // 输出获取的数据
        const transformedData = {
          spuId: String(apiData.id),
          title: apiData.name_en,
          title_ch: apiData.name,
          description: apiData.description_en,
          primaryImage: apiData.images[0].image_url,
          images: apiData.images.map(image => image.image_url),
          spuTagList: apiData.tags.map(tag => ({
            title: tag.name_en
          }))
        };


        // 解析 Promise，返回 transformedData
        resolve({
          ...transformedData,
          spuId: `${id}`,
          images: [transformedData?.primaryImage],
        });
      })
      .catch(error => {

        console.error('Error fetching data:', error);
        reject(error); // 拒绝 Promise，返回错误
      });
  });
}