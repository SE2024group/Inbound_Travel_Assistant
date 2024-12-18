// pages/appDetail/appDetail.js
Page({
  data: {
    id: null,
    items: {
      gaode: {
        title: 'Gaode Map',
        image: 'https://cloud.tsinghua.edu.cn/f/024c76f8b1234965b23b/?dl=1',
        label: ['detailed map', 'precise navigation'],
        download_link: 'https://mobile.amap.com/',
        description: 'Gaode Map (Amap) is a popular Chinese mapping and navigation application developed by Alibaba Group.\n It provides users with detailed maps, real-time traffic updates, and precise navigation features for driving, walking, and public transportation. With a wide range of functionalities, Gaode Map is known for its user-friendly interface and accurate location services.\n It offers features such as voice-guided navigation, 3D map views, route planning, and points of interest (POI) search, making it an essential tool for everyday travel in China.\n Additionally, it supports offline maps, which is particularly useful in areas with poor internet connectivity.'
      },
      huazhuhui: {
        title: 'Huazhu Club',
        image: 'https://cloud.tsinghua.edu.cn/f/d56fe614d79c4d7a855c/?dl=1',
        label: ['hotel booking', 'budget-friendly'],
        download_link: 'https://campaign.huazhu.com/static/2018/app-general/',
        description: 'The Huazhu Club app, is a comprehensive hotel booking platform primarily designed for Chinese travelers.\n The app offers access to over a thousand hotels under the Huazhu brand, including well-known chains like Hanting, Joya, and Citadines. Users can browse hotel options, make reservations, and manage their bookings all in one place.\n The app provides a loyalty program, allowing users to earn points on bookings that can be redeemed for discounts, upgrades, and exclusive member benefits. Additionally, it includes features such as contactless check-in and checkout, personalized travel recommendations, and special deals.\n With a user-friendly interface and a range of hotel options from budget-friendly to luxury, the Huazhu Club app has become an essential tool for millions of travelers in China.'
      },
      xiecheng: {
        title: 'Ctrip',
        image: "https://cloud.tsinghua.edu.cn/f/75818e8dc9ca4f669a71/?dl=1",
        label: ['travel booking', '24/7 customer service'],
        download_link: 'https://app.ctrip.com/',
        description: '"Ctrip App" is a leading online travel agency in China, offering a comprehensive suite of travel services through its mobile app.\n It provides users with the ability to book hotels, flights, trains, and tours with ease. The app is known for its extensive selection of travel options, competitive pricing, and user-friendly interface.\n "Ctrip" features real-time search and booking capabilities, 24/7 customer service support, and a variety of payment methods. Additionally, the app offers travel guides, reviews, and promotions, making it a one-stop-shop for all travel needs within and from China.\n With its multi-language support, "Ctrip" is also a preferred choice for international travelers visiting China.'
      },
      didi: {
        title: 'DiDi',
        image: "https://cloud.tsinghua.edu.cn/f/b4e13ab6a8e34b5ebb55/?dl=1",
        label: ['ride-hailing', 'real-time tracking'],
        download_link: 'https://www.didiglobal.com/download',
        description: '“DiDi” is a leading ride-hailing platform in China, offering a wide range of on-demand transportation services through its mobile app.\n Users can easily hail taxis, private cars, and other vehicles with just a few taps. The app is renowned for its convenient booking process, fast response times, and safe travel experience.\n DiDi provides various services including express rides, premium rides, carpooling, and even bike-sharing. With real-time tracking, in-app communication, and multiple payment options, DiDi ensures a seamless travel experience for its users.\n Additionally, the app offers promotions and discounts, making it an affordable and reliable choice for daily commuting and travel in China. DiDi’s commitment to innovation and customer satisfaction has made it a staple in the transportation industry.'
      },
      Alipay: {
        title: 'Alipay',
        image: "https://cloud.tsinghua.edu.cn/f/adcccc71704c443fb23f/?dl=1",
        label: ['mobile wallet', 'QR code payment'],
        download_link: 'https://render.alipay.com/p/s/download?form=chinese',
        description: 'Alipay is a widely-used digital payment platform in China, developed by Ant Group. It allows users to make fast, secure, and convenient payments from their mobile devices.\n Alipay offers a variety of financial services, including money transfers, bill payments, and online shopping. The platform supports QR code scanning for payments at physical stores and online transactions.\n Alipay also provides a digital wallet, where users can store money, earn interest, and manage their finances.\n With its robust security features and extensive network of partners, Alipay has become an integral part of daily life for millions of Chinese consumers.'
      },
      Taobao: {
        title: 'Taobao',
        image: "https://cloud.tsinghua.edu.cn/f/401b82016bfd4b39a9e0/?dl=1",
        label: ['online shopping', 'retail marketplace'],
        download_link: 'https://mpage.taobao.com/hd/download.html',
        description: 'Taobao is one of the largest online retail platforms in China, owned by Alibaba Group. It is a marketplace where millions of individuals and businesses buy and sell a wide range of products, including clothing, electronics, home goods, and more.\n Taobao offers a user-friendly shopping experience with advanced search filters, product reviews, and buyer protection policies. The platform is known for its vast selection, competitive pricing, and interactive features like live streaming and virtual stores.\n Taobao also provides various payment options, including Alipay, and offers a comprehensive after-sales service, making it a preferred choice for online shoppers in China.'
      },
      meituan: {
        title: 'Meituan',
        image: "https://cloud.tsinghua.edu.cn/f/61a7cf1e477147c8992b/?dl=1",
        label: ['food delivery', 'on-demand services'],
        download_link: 'https://www.meituan.com/',
        description: "Meituan is a leading on-demand service platform in China, offering a diverse range of services including food delivery, restaurant reservations, movie ticketing, hotel bookings, and various local services.\n The platform connects users with local businesses, providing convenience and value through its mobile app. Meituan is known for its extensive network of partner merchants, which offers users a wide array of choices and competitive deals.\n The app features user-friendly navigation, real-time order tracking, and reliable customer service. With its commitment to enhancing local life, Meituan has become an essential tool for both consumers and businesses in China, facilitating daily activities and promoting local economic growth."
      },
      dianping: {
        title: 'Dianping',
        image: "https://cloud.tsinghua.edu.cn/f/de3ff8e17b984fc9a34b/?dl=1",
        label: ['user ratings', 'deals and discounts'],
        download_link: 'https://apps.apple.com/cn/app/%E5%A4%A7%E4%BC%97%E7%82%B9%E8%AF%84-%E7%BE%8E%E9%A3%9F%E6%97%85%E6%B8%B8%E6%94%BB%E7%95%A5%E9%80%9B%E5%90%83%E5%BF%85%E5%A4%87/id351091731',
        description: "Dianping is a popular platform in China for local reviews and information, providing a comprehensive guide to dining, shopping, entertainment, and lifestyle services.\n Users can browse through millions of reviews and ratings to discover the best local businesses, from restaurants and cafes to spas and salons. Dianping offers a social component, allowing users to share their experiences and tips with others.\n The platform also provides deals and discounts, making it a valuable resource for finding the best offers in town. With its mobile app, Dianping enables users to make reservations, order food, and even pay for services, all while accessing the latest reviews and recommendations from the community."
      },
      redbook: {
        title: 'Red Book',
        image: "https://cloud.tsinghua.edu.cn/f/877cad3a4b82467a8466/?dl=1",
        label: ['social media', 'travel tips'],
        download_link: 'https://oia.xiaohongshu.com/oia',
        description: "Xiaohongshu, also known as RED or Little Red Book, is a social media and e-commerce platform that combines content sharing with online shopping.\n It is particularly popular among young Chinese consumers for its user-generated content, which includes product reviews, travel tips, fashion, beauty, and lifestyle advice.\n Xiaohongshu allows users to create and share posts, photos, and videos, building a community-driven environment where users can discover and recommend products and experiences. The platform’s e-commerce feature enables users to purchase items directly through the app, often at discounted prices.\n With its focus on authenticity and trust, Xiaohongshu has become a influential platform for product discovery and a key channel for brands to engage with their target audience."
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id;
    const item = this.data.items[id];

    if (item && item.description) {
      // 将 description 按 \n 分割成数组
      const descriptionArray = item.description.split('\n').map(p => p.trim());
      this.setData({
        id: id,
        [`items.${id}.descriptionArray`]: descriptionArray
      });
    }
  },

  copyLink() {
    const { id, items } = this.data;
    const url = items[id]?.download_link;

    if (url) {
      // 复制链接到剪切板
      wx.setClipboardData({
        data: url,
        success: () => {
          wx.showModal({
            title: '链接已复制',
            content: '请打开浏览器并粘贴链接访问。',
            showCancel: false, // 不需要取消按钮
            confirmText: '知道了'
          });
        },
        fail: () => {
          wx.showToast({
            title: '复制失败，请重试',
            icon: 'none'
          });
        }
      });
    } else {
      wx.showToast({
        title: '下载链接不存在',
        icon: 'none'
      });
    }
  },

  toOut(event) {
    const {
      id,
      items
    } = this.data;
    const url = items[id].download_link;

    if (url) {
      wx.navigateTo({
        url: `/pages/out/out?url=${encodeURIComponent(url)}`
      });
    } else {
      wx.showToast({
        title: '下载链接不存在',
        icon: 'none'
      });
    }
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
