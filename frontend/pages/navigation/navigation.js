  /**
   * 页面的初始数据
   */
  Page({
    data: {
      currentTab: 'App', // 当前选中的 Tab，默认为 App
      tripApps: [{
          icon: "https://cloud.tsinghua.edu.cn/f/024c76f8b1234965b23b/?dl=1",
          name: "Gaode Map",
          desc: "Navigation & Traffic",
          appId: "gaode" // 对应绑定的 app id
        },
        {
          icon: "https://cloud.tsinghua.edu.cn/f/d56fe614d79c4d7a855c/?dl=1",
          name: "Huazhu Club",
          desc: "Hotel Booking",
          appId: "huazhuhui"
        },
        {
          icon: "https://cloud.tsinghua.edu.cn/f/75818e8dc9ca4f669a71/?dl=1",
          name: "Ctrip",
          desc: "Travel & Booking",
          appId: "xiecheng"
        },
        {
          icon: "",
          name: "DiDi",
          desc: "Call Taxis and various cars, like Uber",
          appId: "didi"
        }
      ],
      pagedTripApps: [], // 分页后的数据
      shoppingApps: [{
          icon: "https://cloud.tsinghua.edu.cn/f/adcccc71704c443fb23f/?dl=1",
          name: "Alipay",
          desc: "Payments",
          appId: "Alipay"
        },
        {
          icon: "https://cloud.tsinghua.edu.cn/f/401b82016bfd4b39a9e0/?dl=1",
          name: "Taobao",
          desc: "Online Shopping",
          appId: "Taobao"
        },
        {
          icon: "https://cloud.tsinghua.edu.cn/f/61a7cf1e477147c8992b/?dl=1",
          name: "Meituan",
          desc: "Local Services",
          appId: "meituan"
        }
      ],
      pagedShoppingApps: [],
      recommendationApps: [{
          icon: "https://cloud.tsinghua.edu.cn/f/de3ff8e17b984fc9a34b/?dl=1",
          name: "Dianping",
          desc: "Biggest Restaurant Comment Platform",
          appId: "dianping"
        },
        {
          icon: "https://cloud.tsinghua.edu.cn/f/877cad3a4b82467a8466/?dl=1",
          name: "Red Book",
          desc: "Biggest Sharing Platform",
          appId: "redbook"
        }
      ],
      pagedRecommendationApps: [],
      attractions: [{
          icon: "https://example.com/icons/tiananmen-square.png",
          name: "Tiananmen Square",
          desc: "Historic city center and symbol of Beijing",
          appId: "Tiananmen-Square"
        },
        {
          icon: "https://example.com/icons/national-museum.png",
          name: "National Museum",
          desc: "Largest museum in China with extensive cultural exhibits",
          appId: "National-Museum"
        },
        {
          icon: "https://example.com/icons/tsinghua-university.png",
          name: "Tsinghua University",
          desc: "Top university in China with beautiful campus",
          appId: "Tsinghua-University"
        },
        {
          icon: "https://example.com/icons/the-palace-museum.png",
          name: "The Palace Museum",
          desc: "Famous Forbidden City with ancient imperial history",
          appId: "The-Palace-Museum"
        },
        {
          icon: "https://example.com/icons/the-great-wall.png",
          name: "The Great Wall",
          desc: "World-renowned architectural wonder and cultural symbol",
          appId: "The-Great-Wall"
        }
      ],
      pagedAttractions: []
    },

    // onAppTap: function (e) {
    //   const appId = e.currentTarget.dataset.appId; // 获取点击的 appId
    //   console.log("App ID:", appId);

    //   // 跳转逻辑
    //   if (appId === "gaode") {
    //     wx.navigateTo({
    //       url: '/pages/gaodeMap/gaodeMap' // 假设 Gaode Map 的页面路径为此
    //     });
    //   } else if (appId === "huazhuhui") {
    //     wx.navigateTo({
    //       url: '/pages/huazhuClub/huazhuClub'
    //     });
    //   } else if (appId === "xiecheng") {
    //     wx.navigateTo({
    //       url: '/pages/ctrip/ctrip'
    //     });
    //   } else {
    //     wx.showToast({
    //       title: '功能开发中',
    //       icon: 'none'
    //     });
    //   }
    // },




    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
      this.paginateTripApps();
      this.paginateShoppingApps();
      this.paginateRecommendationApps();
      this.initAttractions();
    },

    paginateTripApps() {
      const {
        tripApps
      } = this.data;
      const pageSize = 2; // 每页 2 个应用
      const pagedTripApps = [];

      for (let i = 0; i < tripApps.length; i += pageSize) {
        pagedTripApps.push(tripApps.slice(i, i + pageSize));
      }

      this.setData({
        pagedTripApps
      });
    },

    paginateShoppingApps() {
      const {
        shoppingApps
      } = this.data;
      const pageSize = 2; // 每页 2 个应用
      const pagedShoppingApps = [];

      for (let i = 0; i < shoppingApps.length; i += pageSize) {
        pagedShoppingApps.push(shoppingApps.slice(i, i + pageSize));
      }

      this.setData({
        pagedShoppingApps
      });
    },

    paginateRecommendationApps() {
      const {
        recommendationApps
      } = this.data;
      const pageSize = 2; // 每页 2 个应用
      const pagedRecommendationApps = [];

      for (let i = 0; i < recommendationApps.length; i += pageSize) {
        pagedRecommendationApps.push(recommendationApps.slice(i, i + pageSize));
      }

      this.setData({
        pagedRecommendationApps
      });
    },

    initAttractions() {
      const {
        attractions
      } = this.data;
      const pageSize = 5;
      const pagedAttractions = [];

      for (let i = 0; i < attractions.length; i += pageSize) {
        pagedAttractions.push(attractions.slice(i, i + pageSize));
      }

      this.setData({
        pagedAttractions
      });
    },

    // 功能函数

    switchTab(e) {
      const tab = e.currentTarget.dataset.tab;
      this.setData({
        currentTab: tab
      });
    },

    onAppTap(e) {
      const appId = e.currentTarget.dataset.appId;
      wx.navigateTo({
        url: `/pages/appDetail/appDetail?id=${appId}`
      });
    },

    onAttractionTap(e) {
      const name = e.currentTarget.dataset.appId;
      wx.navigateTo({
        url: `/pages/attractionDetail/attractionDetail?name=${name}`
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