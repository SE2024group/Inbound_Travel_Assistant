Page({

  /**
   * 页面的初始数据
   */
  data: {
    attractions: [
      "Tiananmen-Square",
      "National-Museum",
      "Tsinghua-University",
      "The-Palace-Museum",
      "The-Great-Wall"
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  onAppTap(event) {
    // 获取被点击的app的标识
    const appId = event.currentTarget.dataset.appId;
    const url = '/pages/appDetail/appDetail?id=' + appId;
    // 使用wx.navigateTo进行页面跳转
    wx.navigateTo({
      url: url
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})