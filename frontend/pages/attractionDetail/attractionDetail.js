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
    imgSrcs:{
      'Tiananmen-Square': [
        "https://cloud.tsinghua.edu.cn/f/e0d6af7b94574b06b4ee/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/806ca2b883094fd9a939/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/45177ba384bb4a8d8ff6/?dl=1"
      ],
      'National-Museum': [
        "https://cloud.tsinghua.edu.cn/f/a62961022d534dce8b6c/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/9fb7eaef64fc4b31b513/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/74a9311eea8d468aa951/?dl=1"
      ],
      'Tsinghua-University': [
        "https://cloud.tsinghua.edu.cn/f/fde04128f5bc47399bba/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/67c79d4151984f479d00/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/4940c99708a54e9db099/?dl=1"
      ],
      'The-Palace-Museum': [
        "https://cloud.tsinghua.edu.cn/f/0307e4d12af94eb1b2b4/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/5056579d76bc45f58732/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/2647f23564c24b4f8b9a/?dl=1"
      ],
      'The-Great-Wall': [
        "https://cloud.tsinghua.edu.cn/f/17b5df923f4e4d3da0df/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/3b8bd02834084915ba78/?dl=1",
        "https://cloud.tsinghua.edu.cn/f/c98f1742f64447828f3a/?dl=1"
      ]

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
    const imgSrcs = this.data.imgSrcs[attractionName];
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