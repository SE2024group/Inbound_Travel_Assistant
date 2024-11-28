// pages/setting/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    notificationsEnabled: true, // 开关默认状态
  },

  onNotificationToggle(e) {
    const isEnabled = e.detail.value; // 获取开关的状态
    this.setData({
      notificationsEnabled: isEnabled,
    });
    console.log('Notifications toggled:', isEnabled);
    // 这里可以添加逻辑，例如存储状态或通知服务器
  },

  // 跳转到账户信息
  goToInfo() {
    wx.navigateTo({
      url: '/pages/accountInfo/index'
    });
  },

  goToTerms() {
    wx.navigateTo({
      url: '/pages/userRule/index'
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})