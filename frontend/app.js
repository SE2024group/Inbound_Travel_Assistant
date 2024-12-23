import updateManager from './common/updateManager';

App({
  onLaunch: function () {
    // 检查用户登录状态
    // const isLoggedIn = wx.getStorageSync('isLoggedIn') || false;
    const isLoggedIn = false;

    if (!isLoggedIn) {
      // 如果未登录，跳转到登录页面
      wx.redirectTo({
        url: '/pages/login/index',
      });
    }
  },
  onShow: function () {
    updateManager();
  },
});