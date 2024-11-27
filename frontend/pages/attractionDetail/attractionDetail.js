// pages/attractionDetail/attractionDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attractionName: '',
    imgSrcs: [], // Array to hold image URLs

    current: 0, // Initial slide index
    autoplay: true, // Autoplay enabled
    duration: 500, // Transition duration (ms)
    interval: 3000, // Autoplay interval (ms)
    navigation: {
      type: 'fraction'
    }, // Show navigation arrows and indicators
    swiperImageProps: {
      mode: 'aspectFill' // Image mode for display
    },
    descriptions: {
      'Tiananmen-Square': 'Tiananmen Square, located in the center of Beijing, is one of the largest public squares in the world and holds significant cultural and historical importance in China. Originally built in 1651 and expanded in the 1950s, the square is surrounded by iconic landmarks, including the Tiananmen Gate, the Monument to the People\'s Heroes, and the Mausoleum of Mao Zedong. It has been the site of numerous important events in Chinese history and is a symbol of national pride. Every day, visitors gather to witness the flag-raising ceremony, and the square remains a popular destination for tourists from around the world who come to experience its grandeur and historical ambiance.',

      'National-Museum': 'The National Museum of China, situated on the eastern side of Tiananmen Square in Beijing, is one of the largest museums in the world and a treasure trove of Chinese history and culture. Established in 2003 through the merger of the National Museum of Chinese History and the National Museum of Chinese Revolution, it houses a vast collection of artifacts that span the entire history of China, from ancient times to the modern era. The museum’s architecture is a blend of traditional Chinese elements and modern design, reflecting its role as a bridge between the past and the present. With its extensive exhibitions and educational programs, the National Museum is a must-visit destination for those seeking to understand the rich tapestry of China’s heritage. It attracts millions of visitors annually, including locals and international tourists, who come to marvel at the exhibits and immerse themselves in the country’s storied past.',

      'Tsinghua-University': 'Tsinghua University, located in the Haidian District of Beijing, is one of the most prestigious universities in China and is renowned worldwide for its academic excellence, research contributions, and beautiful campus. Founded in 1911, Tsinghua has a long history of nurturing some of China’s most influential leaders, scholars, and innovators. The university is particularly noted for its strength in science, engineering, and technology, while also offering a comprehensive range of programs in the humanities, social sciences, and management. The campus, with its traditional Chinese architecture mixed with modern facilities, is a testament to the university’s blend of heritage and progress. Tsinghua University is a hub for international collaboration and is often ranked among the top universities globally, making it a sought-after destination for students and scholars from around the world.',

      'The-Palace-Museum': 'The Palace Museum, also known as the Forbidden City, is an imperial palace complex located in the heart of Beijing, China. It served as the home of emperors and the political center of Chinese government for nearly five centuries, from the Ming dynasty to the end of the Qing dynasty. Constructed in the 15th century, the palace is an architectural marvel, consisting of 980 buildings and covering an area of 72 hectares. It is renowned for its intricate traditional Chinese design, with red walls and golden roofs, and its historical and cultural significance is unparalleled. The Palace Museum houses an extensive collection of art, including paintings, calligraphy, ceramics, and imperial artifacts, making it one of the most important cultural heritage sites in the world. As a UNESCO World Heritage Site, it attracts millions of visitors each year who come to explore the grandeur of Chinese imperial history and the splendor of its ancient palatial life.',

      'The-Great-Wall': 'The Great Wall of China is one of the most iconic landmarks in the world, stretching over 13,000 miles from east to west across northern China. Built in several stages from the 7th century BC to the 16th century AD, the wall was originally constructed to protect Chinese states and empires against incursions by various nomadic groups of the Eurasian Steppe. The Great Wall is not a single continuous wall but a series of walls, watchtowers, and fortifications made of stone, brick, wood, and other materials. Its most famous sections, such as those near Beijing, have been extensively restored and are now major tourist attractions, drawing visitors with their stunning views and historical significance. A testament to human ingenuity and perseverance, the Great Wall is a symbol of Chinese strength and culture, and it is listed as a UNESCO World Heritage Site. Its grand scale and architectural achievements continue to inspire awe and fascination around the globe.'
    },
    imgSrcs: {
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
      'Tiananmen-Square': 'Daily: 8:00 AM - 6:00 PM',
      'National-Museum': 'Daily: 9:00 AM - 5:00 PM. Except Monday',
      'Tsinghua-University': 'Daily: All day',
      'The-Palace-Museum': 'Daily: 6:00 AM - 8:00 PM',
      'The-Great-Wall': 'Daily: 7:00 AM - 5:00 PM',
    },
    reservationLink: {
      'Tiananmen-Square': 'https://tickets.tiananmen.com',
      'National-Museum': 'https://tickets.tiananmen.com',
      'Tsinghua-University': 'https://tickets.tiananmen.com',
      'The-Palace-Museum': 'https://tickets.tiananmen.com',
      'The-Great-Wall': 'https://tickets.tiananmen.com',
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