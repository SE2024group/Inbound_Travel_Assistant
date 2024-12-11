import {
  fetchUserData
} from '../../services/usercenter/fetchUsercenter';

Page({
  data: {
    userInfo: {},
  },
  // 定义一个递归函数来重试 fetchUserData
  retryFetchUserData(token, maxRetries, attempt = 1) {
    return new Promise((resolve, reject) => {
      fetchUserData(token).then((data) => {
        resolve(data); // 成功返回数据
      }).catch((error) => {
        if (attempt < maxRetries) {
          console.warn(`Attempt ${attempt} failed. Retrying...`);
          // 延迟一段时间后重试
          setTimeout(() => {
            this.retryFetchUserData(token, maxRetries, attempt + 1).then(resolve).catch(reject);
          }, 1000); // 1秒延迟（可调整）
        } else {
          reject(`Failed after ${maxRetries} attempts: ${error}`);
        }
      });
    });
  },
  onLoad() {
    const loggedBy = wx.getStorageSync('loggedBy') || '';
    if (!loggedBy) {
      wx.showToast({
        title: 'Login status error.',
        icon: 'error',
      });
    }
    console.log('logged by ', loggedBy);

    if (loggedBy === 'tourist') {
      const userInfo = {
        name: wx.getStorageSync('userName') || 'Tourist',
        avatar: '/pages/usercenter/avatar.jpeg'
      };
      this.setData({
        userInfo
      });
      console.log(this.data.userInfo);
    } else if (loggedBy === 'auth') {
      // 从本地存储中获取 authToken
      wx.getStorage({
        key: 'authToken',
        success: (res) => {
          const token = res.data;

          // 使用 authToken 调用 fetchUserData 并传递 token 参数
          this.retryFetchUserData(token, 5).then((data) => {
            this.setData({
              userInfo: data
            });
          }).catch((error) => {
            wx.showToast({
              title: 'Fail to load user info',
              icon: 'error',
            });
            console.error('Failed to load user data:', error);
          });
        },
        fail: () => {
          wx.showToast({
            title: 'Please login first.',
            icon: 'error',
          });
          // 如果没有找到 authToken，则重定向到登录页面
          wx.redirectTo({
            url: '/pages/login/login',
          });
        },
      });
    } else {
      // 处理其他登录方式或错误状态
      wx.showToast({
        title: 'Unknown login method.',
        icon: 'error',
      });
      wx.redirectTo({
        url: '/pages/login/login',
      });
    }
  },

  // 跳转到点赞页面
  goToLikes() {
    wx.navigateTo({
      url: '/pages/likes/index'
    });
  },
  // 跳转到浏览历史页面
  goToViewed() {
    wx.navigateTo({
      url: '/pages/viewed/index'
    });
  },
  // 跳转到我的笔记页面
  goToNotes() {
    wx.navigateTo({
      url: '/pages/notes/index'
    });
  },
  // 跳转到设置
  goToSetting() {
    wx.navigateTo({
      url: '/pages/setting/index'
    });
  },

  // 退出账户
  onQuitAccount() {
    const keysToRemove = ['authToken', 'user', 'loggedBy', 'userName', 'registeredAt'];

    const removePromises = keysToRemove.map((key) => {
      return new Promise((resolve, reject) => {
        wx.removeStorage({
          key: key,
          success: () => resolve(key),
          fail: () => reject(key),
        });
      });
    });

    Promise.all(removePromises)
      .then(() => {
        wx.showToast({
          title: '已退出账号',
          icon: 'success'
        });
        wx.redirectTo({
          url: '/pages/login/index'
        });
      })
      .catch((errKey) => {
        wx.showToast({
          title: `退出失败: ${errKey}`,
          icon: 'error'
        });
      });
  },

  // 清除全部 cookie
  onClearCookies() {
    wx.clearStorage({
      success: () => {
        wx.showToast({
          title: '已清除所有缓存',
          icon: 'success'
        });
      },
      fail: () => {
        wx.showToast({
          title: '清除缓存失败',
          icon: 'error'
        });
      },
    });
  },

  onShow() {
    this.getTabBar().init();
  }
});