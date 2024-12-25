// pages/accountInfo/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    userName: '',
    loggedBy: '',
    registeredAt: '',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    // 同时读取多个存储数据
    try {
      const userName = wx.getStorageSync('userName') || 'Unknown User'; // 如果不存在则设为默认值
      const loggedBy = wx.getStorageSync('loggedBy') || 'Unknown Method';
      const registeredAt = wx.getStorageSync('registeredAt') || 'Not Available';
      console.log('registered at', registeredAt),

        // 更新 data 数据
        this.setData({
          userName,
          loggedBy,
          registeredAt,
        });
    } catch (err) {
      console.error('Failed to read storage:', err);
    }
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