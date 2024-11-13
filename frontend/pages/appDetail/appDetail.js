// pages/appDetail/appDetail.js
Page({
  data: {
    id: null,
    items: {
      gaode: {
        title: 'Gaode Map',
        image: '../navigation/image/gaode.png',
        label: ['detailed map','prcise navigation'],
        download_link: 'www.gaode.com',
        description:'Gaode Map (Amap) is a popular Chinese mapping and navigation application developed by Alibaba Group. It provides users with detailed maps, real-time traffic updates, and precise navigation features for driving, walking, and public transportation. With a wide range of functionalities, Gaode Map is known for its user-friendly interface and accurate location services. It offers features such as voice-guided navigation, 3D map views, route planning, and points of interest (POI) search, making it an essential tool for everyday travel in China. Additionally, it supports offline maps, which is particularly useful in areas with poor internet connectivity.'
      },
      huazhuhui: {
        title: 'Huazhu Club',
        image: '../navigation/image/huazhuhui.png',
        label: ['hotel booking','budget-friendly'],
        download_link: 'www.gaode.com',
        description: 'The Huazhu Club app, is a comprehensive hotel booking platform primarily designed for Chinese travelers. The app offers access to over a thousand hotels under the Huazhu brand, including well-known chains like Hanting, Joya, and Citadines. Users can browse hotel options, make reservations, and manage their bookings all in one place. The app provides a loyalty program, allowing users to earn points on bookings that can be redeemed for discounts, upgrades, and exclusive member benefits. Additionally, it includes features such as contactless check-in and checkout, personalized travel recommendations, and special deals. With a user-friendly interface and a range of hotel options from budget-friendly to luxury, the Huazhu Club app has become an essential tool for millions of travelers in China.'
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
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