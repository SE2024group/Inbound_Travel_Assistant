import {
  fetchHome
} from '../../services/home/home';
import {
  fetchGoodsList
} from '../../services/good/fetchGoods';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    ocrResult: '',
    imgSrcs: [],
    tabList: [],
    goodsList: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: '500',
    interval: 5000,
    isTouching: false, // 是否正在触摸

    navigation: {
      type: 'dots'
    },
    swiperImageProps: {
      mode: 'scaleToFill'
    },
    imagePath: '', // 用于存储选中的图片路径
  },

  goodListPagination: {
    index: 0,
    num: 20,
  },

  privateData: {
    tabIndex: 0,
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.init();
  },

  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      console.log('load status 0')
      this.loadGoodsList();
    }
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.loadHomePage();
  },
  onCameraButtonClick() {
    const self = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: (res) => {
        console.log(res.tempFiles[0]); // 打印检查 tempFiles 结构
        if (res.tempFiles.length > 0) {
          this.setData({
            imagePath: res.tempFiles[0].tempFilePath // 设置图片路径到数据

          });
          wx.navigateTo({
            //url: '/pages/ocrResults/ocrResults',
            url: '/pages/editImgs/editImgs',
            success: (res) => {
              res.eventChannel.emit('sendWordsData', {
                //wordsData: testArray,
                imagePath: this.data.imagePath,
              });
              //console.log(filePath)
            },
          })
          // self.uploadImage(res.tempFiles[0].tempFilePath);
          //self.drawImageToCanvas(res.tempFiles[0].tempFilePath);
        }
      },
      fail(err) {
        console.log("选择媒体失败", err);
      }
    });
  },

  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    fetchHome().then(({
      swiper,
      tabList
    }) => {
      this.setData({
        tabList,
        imgSrcs: swiper,
        pageLoading: false,
      });
      this.loadGoodsList(true);
    });

    // 1. 先拿到收藏列表ID
    fetchFavoriteIds()
      .then(favoriteIds => {
        // 2. 把它存到 data 或者存到 this.privateData
        this.privateData.favoriteIds = favoriteIds;
        // 3. 然后再去加载首页 & 商品列表
        // this.loadHomePage();
      })
      .catch(err => {
        // 如果失败，也可以继续加载，只不过 favoriteIds = []
        console.error('获取收藏ID失败', err);
        this.privateData.favoriteIds = [];
        // this.loadHomePage();
      });
  },

  tabChangeHandle(e) {
    this.privateData.tabIndex = e.detail;
    this.loadGoodsList(true);
  },

  onReTry() {
    this.loadGoodsList();
  },

  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({
      goodsListLoadStatus: 1
    });

    const pageSize = this.goodListPagination.num;
    let pageIndex = this.privateData.tabIndex * pageSize + this.goodListPagination.index + 1;
    if (fresh) {
      pageIndex = 0;
    }

    try {
      const nextList = await fetchGoodsList(pageIndex, pageSize);
      const {
        favoriteIds = []
      } = this.privateData;
      nextList.forEach(item => {
        if (favoriteIds.includes(String(item.spuId))) {
          item.isFavorite = true;
        } else {
          item.isFavorite = false;
        }
      });
      this.setData({
        goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
        goodsListLoadStatus: 0,
      });
      console.log("goodsList");
      console.log(this.data.goodsList);
      this.goodListPagination.index = pageIndex;
      this.goodListPagination.num = pageSize;
    } catch (err) {
      this.setData({
        goodsListLoadStatus: 3
      });
    }
  },

  goodListClickHandle(e) {
    const {
      index
    } = e.detail;
    const {
      spuId
    } = this.data.goodsList[index];
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },

  // redbook.js
  goodListLikedHandle(e) {
    // 从 e.detail 中拿到 index, goods
    const {
      index,
      goods
    } = e.detail;
    const spuId = goods.spuId; // 你的菜品 ID
    const isFavoriteNow = goods.isFavorite; // 当前是否收藏

    const authToken = wx.getStorageSync('authToken') || '';

    // 如果 isFavorite = true -> 调用删除收藏
    // 如果 isFavorite = false -> 调用添加收藏
    if (!isFavoriteNow) {
      // 添加收藏
      wx.request({
        url: `http://1.15.174.177/api/favorite/${spuId}/`,
        method: 'POST',
        header: {
          'Authorization': `${authToken}`
        },
        success: (res) => {
          // 接口成功后，需要更新本地的 isFavorite
          const newGoodsList = [...this.data.goodsList];
          newGoodsList[index].isFavorite = true;
          this.setData({
            goodsList: newGoodsList
          });
        },
        fail: (err) => {
          console.error('添加收藏失败', err);
        },
      });
    } else {
      // 移除收藏
      wx.request({
        url: `http://1.15.174.177/api/favorite/${spuId}/`,
        method: 'DELETE',
        header: {
          'Authorization': `${authToken}`
        },
        success: (res) => {
          const newGoodsList = [...this.data.goodsList];
          newGoodsList[index].isFavorite = false;
          this.setData({
            goodsList: newGoodsList
          });
        },
        fail: (err) => {
          console.error('移除收藏失败', err);
        },
      });
    }
  },

  navToSearchPage() {
    wx.navigateTo({
      url: '/pages/goods/search/index'
    });
  },

  navToActivityDetail({
    detail
  }) {
    const {
      index: promotionID = 0
    } = detail || {};
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  },
});

function fetchFavoriteIds() {
  const authToken = wx.getStorageSync('authToken') || '';
  // 1. 返回一个Promise，方便后续使用 then
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://1.15.174.177/api/favorites/',
      method: 'GET',
      header: {
        'Authorization': `${authToken}`,
      },
      success: (res) => {
        // 2. 接口返回的是收藏菜品列表数组，如 
        //  [ {id:3, name:'香辣牛蛙',...}, {id:23,name:'京酱肉丝',...} ]
        const favorites = res.data || [];

        // 3. 我们只需要提取所有已收藏菜品的 ID 做对比
        const favoriteIds = favorites.map(item => String(item.id));
        // 转成字符串，便于跟 spuId 字符串比对

        // 4. Promise 结束
        resolve(favoriteIds);
      },
      fail: (err) => {
        console.error('获取收藏列表失败', err);
        reject(err);
      }
    })
  });
}