// pages/attractionDetail/attractionDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attractionName: '',
    imgSrcs: [],                      // Array to hold image URLs
    current: 0,                       // Initial slide index
    autoplay: true,                   // Autoplay enabled
    duration: 500,                    // Transition duration (ms)
    interval: 3000,                   // Autoplay interval (ms)
    navigation: { type: 'fraction' }, // Show navigation arrows and indicators
    swiperImageProps: {
      mode: 'aspectFill'              // Image mode for display
    },
    descriptions: {
      'Tiananmen-Square': 'Tiananmen Square, located in the center of Beijing, is one of the largest public squares in the world and holds significant cultural and historical importance in China. Originally built in 1651 and expanded in the 1950s, the square is surrounded by iconic landmarks, including the Tiananmen Gate, the Monument to the People\'s Heroes, and the Mausoleum of Mao Zedong. It has been the site of numerous important events in Chinese history and is a symbol of national pride. Every day, visitors gather to witness the flag-raising ceremony, and the square remains a popular destination for tourists from around the world who come to experience its grandeur and historical ambiance.',

      'National-Museum': 'The National Museum offers a deep dive into China’s rich history, with exhibits spanning ancient artifacts to modern achievements.',
      'Tsinghua-University': 'Tsinghua University is one of China’s most prestigious institutions, renowned for its beautiful campus and academic excellence.',
      'The-Palace-Museum': 'Also known as the Forbidden City, this museum is a vast complex of ancient palaces with stunning architecture.',
      'The-Great-Wall': 'The Great Wall is a series of fortifications that stretches across northern China, symbolizing endurance and strength.'
    },

    openingHours: {
      'Tiananmen-Square':'Daily: 8:00 AM - 6:00 PM',
      'National-Museum':'Daily: 9:00 AM - 5:00 PM. Except Monday',
      'Tsinghua-University':'Daily: All day',
      'The-Palace-Museum':'Daily: 6:00 AM - 8:00 PM',
      'The-Great-Wall':'Daily: 7:00 AM - 5:00 PM',
    },
    reservationLink: {
      'Tiananmen-Square':'https://tickets.tiananmen.com',
      'National-Museum':'https://tickets.tiananmen.com',
      'Tsinghua-University':'https://tickets.tiananmen.com',
      'The-Palace-Museum':'https://tickets.tiananmen.com',
      'The-Great-Wall':'https://tickets.tiananmen.com',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const attractionName = options.name;
    const imageFolderPath = `/pages/attractionDetail/images/${attractionName}/`;
    const imgSrcs = [];

    for (let i = 1; i <= 3; i++) {
      const imagePath = `${imageFolderPath}image${i}.jpg`;
      imgSrcs.push(imagePath);
    }
    const description = this.data.descriptions[attractionName];
    const openingHours = this.data.openingHours[attractionName];
    const reservationLink = this.data.reservationLink[attractionName];

    this.setData({
      attractionName: attractionName,
      imgSrcs: imgSrcs,
      description: description,
      openingHours: openingHours,
      reservationLink: reservationLink
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