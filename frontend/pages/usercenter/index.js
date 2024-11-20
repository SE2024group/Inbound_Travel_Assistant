import {
  fetchUserData
} from '../../services/usercenter/fetchUsercenter';

Page({
  data: {
    userInfo: {},
  },
  onLoad() {
    // 从本地存储中获取 authToken
    wx.getStorage({
      key: 'authToken',
      success: (res) => {
        const token = res.data;

        // 使用 authToken 调用 fetchUserData 并传递 token 参数
        fetchUserData(token).then((data) => {
          this.setData({
            userInfo: data, // 将用户数据存储在 userInfo 中
          });
        }).catch((error) => {
          wx.showToast({
            title: '加载用户信息失败',
            icon: 'error',
          });
          console.error('Failed to load user data:', error);
        });
      },
      fail: () => {
        wx.showToast({
          title: '请先登录',
          icon: 'error',
        });
        // 如果没有找到 authToken，则重定向到登录页面
        wx.redirectTo({
          url: '/pages/login/login',
        });
      },
    });
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
    wx.removeStorage({
      key: 'authToken',
      success: () => {
        wx.showToast({
          title: '已退出账号',
          icon: 'success',
        });
        wx.redirectTo({
          url: '/pages/login/index',
        });
      },
      fail: () => {
        wx.showToast({
          title: '退出失败',
          icon: 'error',
        });
      },
    });
  },

  // 清除全部 cookie
  onClearCookies() {
    wx.clearStorage({
      success: () => {
        wx.showToast({
          title: '已清除所有缓存',
          icon: 'success',
        });
      },
      fail: () => {
        wx.showToast({
          title: '清除缓存失败',
          icon: 'error',
        });
      },
    });
  },








  onShow() {
    this.getTabBar().init();
  }
});