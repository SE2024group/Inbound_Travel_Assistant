import Toast from 'tdesign-miniprogram/toast/index';
import {
  fetchGood
} from '../../../services/good/fetchGood';
import {
  fetchActivityList
} from '../../../services/activity/fetchActivityList';
import {
  getGoodsDetailsCommentList,
  getGoodsDetailsCommentsCount,
} from '../../../services/good/fetchGoodsDetailsComments';

import {
  cdnBase
} from '../../../config/index';

const imgPrefix = `${cdnBase}/`;

const recLeftImg = `${imgPrefix}common/rec-left.png`;
const recRightImg = `${imgPrefix}common/rec-right.png`;
const obj2Params = (obj = {}, encode = false) => {
  const result = [];
  Object.keys(obj).forEach((key) =>
    result.push(`${key}=${encode ? encodeURIComponent(obj[key]) : obj[key]}`),
  );

  return result.join('&');
};

Page({
  data: {
    image: "",
    good: {},
    commentsList: [],
    commentsStatistics: {
      badCount: 0,
      commentCount: 0,
      goodCount: 0,
      goodRate: 0,
      hasImageCount: 0,
      middleCount: 0,
    },
    isShowPromotionPop: false,
    activityList: [],
    recLeftImg,
    recRightImg,
    details: {},
    goodsTabArray: [{
        name: '商品',
        value: '', // 空字符串代表置顶
      },
      {
        name: '详情',
        value: 'goods-page',
      },
    ],
    jumpArray: [{
      title: '首页',
      url: '/pages/home/home',
      iconName: 'home',
    }, ],
    isStock: true,
    cartNum: 0,
    soldout: false,
    buttonType: 1,
    buyNum: 1,
    selectedAttrStr: '',
    skuArray: [],
    primaryImage: '',
    specImg: '',
    isSpuSelectPopupShow: false,
    isAllSelectedSku: false,
    buyType: 0,
    outOperateStatus: false, // 是否外层加入购物车
    operateType: 0,
    selectSkuSellsPrice: 0,
    list: [],
    spuId: '',
    navigation: {
      type: 'fraction'
    },
    current: 0,
    autoplay: true,
    duration: 500,
    interval: 5000,
  },
  onTagTap: function (event) {
    // 获取点击的按钮对应的 tag.title
    const title = event.currentTarget.dataset.title;

    // 跳转并传递参数
    wx.navigateTo({
      url: `/pages/goods/search/index?keyword=${encodeURIComponent(title)}`
    });
  },
  handlePopupHide() {
    this.setData({
      isSpuSelectPopupShow: false,
    });
  },
  goToCreateComment() {
    wx.navigateTo({
      url: `../comments/create/index?spuId=${this.data.spuId}`,
    });
  },
  addCartHandle(e) {
    // 1. 取到当前商品对象 (this.data.details 或 this.data.good)
    const dish = this.data.good; // 或 details
    const spuId = dish.spuId || dish.id;
    const isFavoriteNow = dish.isFavorite || false;

    // 2. 准备 token
    const authToken = wx.getStorageSync('authToken') || '';

    // 3. 调用接口
    if (!isFavoriteNow) {
      // => 添加收藏
      wx.request({
        url: `http://1.15.174.177/api/favorite/${spuId}/`,
        method: 'POST',
        header: {
          'Authorization': authToken
        },
        success: (res) => {
          // 更新 isFavorite
          this.setData({
            ['good.isFavorite']: true,
          });
          // 如果是 details 里在用，就写 ['details.isFavorite']: true
          //更新本地收藏 ID 列表
          const storedFavoriteIds = wx.getStorageSync('favoriteIds') || [];
          // 如果还没有这个 spuId，就 push 进去
          if (!storedFavoriteIds.includes(String(spuId))) {
            storedFavoriteIds.push(String(spuId));
            wx.setStorageSync('favoriteIds', storedFavoriteIds);
          }
        },
        fail: (err) => {
          console.error('添加收藏失败', err);
        },
      });
    } else {
      // => 移除收藏
      wx.request({
        url: `http://1.15.174.177/api/favorite/${spuId}/`,
        method: 'DELETE',
        header: {
          'Authorization': authToken
        },
        success: (res) => {
          // 更新 isFavorite
          this.setData({
            ['good.isFavorite']: false,
          });
          const storedFavoriteIds = wx.getStorageSync('favoriteIds') || [];
          const newFavoriteIds = storedFavoriteIds.filter(id => id !== String(spuId));
          wx.setStorageSync('favoriteIds', newFavoriteIds);
        },
        fail: (err) => {
          console.error('移除收藏失败', err);
        },
      });
    }
  },

  onNavigateButtonTap() {
    const self = this;
    const name = self.data.good.title_ch;
    const app = getApp(); // 获取全局应用实例

    wx.showModal({
      title: 'Confirmation',
      //image = this.data.image,
      content: `Go to translate page?`,
      success(res) {
        if (res.confirm) {
          // 用户点击确认，跳转页面并修改参数
          app.globalData.title = name;
          app.globalData.image = self.data.details.images[0];

          wx.switchTab({
            url: `/pages/record/record`,
          });
        }
        // 用户取消不执行操作
      },
    });
  },

  showSkuSelectPopup(type) {
    this.setData({
      buyType: type || 0,
      outOperateStatus: type >= 1,
      isSpuSelectPopupShow: true,
    });
  },

  buyItNow() {
    this.showSkuSelectPopup(1);
  },

  toAddCart() {
    this.showSkuSelectPopup(2);
  },

  toNav(e) {
    const {
      url
    } = e.detail;
    wx.switchTab({
      url: url,
    });
  },

  showCurImg(e) {
    const {
      index
    } = e.detail;
    this.setData({
      image: images[index],
    })

    const {
      images
    } = this.data.details;
    wx.previewImage({
      current: images[index],
      urls: images, // 需要预览的图片http链接列表
    });
  },

  onPageScroll({
    scrollTop
  }) {
    const goodsTab = this.selectComponent('#goodsTab');
    goodsTab && goodsTab.onScroll(scrollTop);
  },

  chooseSpecItem(e) {
    const {
      specList
    } = this.data.details;
    const {
      selectedSku,
      isAllSelectedSku
    } = e.detail;
    if (!isAllSelectedSku) {
      this.setData({
        selectSkuSellsPrice: 0,
      });
    }
    this.setData({
      isAllSelectedSku,
    });
    this.getSkuItem(specList, selectedSku);
  },

  getSkuItem(specList, selectedSku) {
    const {
      skuArray,
      primaryImage
    } = this.data;
    const selectedSkuValues = this.getSelectedSkuValues(specList, selectedSku);
    let selectedAttrStr = ` 件  `;
    selectedSkuValues.forEach((item) => {
      selectedAttrStr += `，${item.specValue}  `;
    });
    const skuItem = skuArray.filter((item) => {
      let status = true;
      (item.specInfo || []).forEach((subItem) => {
        if (
          !selectedSku[subItem.specId] ||
          selectedSku[subItem.specId] !== subItem.specValueId
        ) {
          status = false;
        }
      });
      if (status) return item;
    });
    this.selectSpecsName(selectedSkuValues.length > 0 ? selectedAttrStr : '');
    if (skuItem) {
      this.setData({
        selectItem: skuItem,
        selectSkuSellsPrice: skuItem.price || 0,
      });
    } else {
      this.setData({
        selectItem: null,
        selectSkuSellsPrice: 0,
      });
    }
    this.setData({
      specImg: skuItem && skuItem.skuImage ? skuItem.skuImage : primaryImage,
    });
  },

  // 获取已选择的sku名称
  getSelectedSkuValues(skuTree, selectedSku) {
    const normalizedTree = this.normalizeSkuTree(skuTree);
    return Object.keys(selectedSku).reduce((selectedValues, skuKeyStr) => {
      const skuValues = normalizedTree[skuKeyStr];
      const skuValueId = selectedSku[skuKeyStr];
      if (skuValueId !== '') {
        const skuValue = skuValues.filter((value) => {
          return value.specValueId === skuValueId;
        })[0];
        skuValue && selectedValues.push(skuValue);
      }
      return selectedValues;
    }, []);
  },

  normalizeSkuTree(skuTree) {
    const normalizedTree = {};
    skuTree.forEach((treeItem) => {
      normalizedTree[treeItem.specId] = treeItem.specValueList;
    });
    return normalizedTree;
  },

  selectSpecsName(selectSpecsName) {
    if (selectSpecsName) {
      this.setData({
        selectedAttrStr: selectSpecsName,
      });
    } else {
      this.setData({
        selectedAttrStr: '',
      });
    }
  },



  specsConfirm() {
    const {
      buyType
    } = this.data;
    if (buyType === 1) {
      this.gotoBuy();
    } else {
      this.addCart();
    }
    // this.handlePopupHide();
  },


  getGoodDetail(spuId) {
    const {
      genGood
    } = require('../../../model/good');
    return genGood(spuId) // 调用 genGood 方法生成商品
      .then((good) => {
        console.log("获取到的商品详情:", good);

        // 将商品详情设置到 data 中
        this.setData({
          good: good, // 将生成的商品对象存储到 goodDetails
        });
        console.log("this.data.good");
        console.log(this.data.good);
        return good; // 返回生成的商品对象
      })
      .catch((error) => {
        console.error("获取商品详情时出错:", error);
        throw error; // 抛出错误，方便调用方处理
      });
  },
  getDetail(spuId, favoriteIds) {
    Promise.all([fetchGood(spuId), fetchActivityList()]).then((res) => {
      // const [details, activityList] = res;
      const [details] = res;
      // const skuArray = [];
      const {
        // skuList,
        primaryImage,
      } = details;
      // 先看 goodDetail 里有没有 id
      const dishId = details.id || spuId;
      // 判断是否收藏
      const isFav = favoriteIds.includes(String(dishId));

      // 把 isFavorite 存到 details 里
      details.isFavorite = isFav;
      this.setData({
        ['good.isFavorite']: isFav,
      });

      this.setData({
        details,
        primaryImage,
      });
    });

    this.getGoodDetail(spuId);
  },

  async getCommentsList() {
    try {
      const code = 'Success';
      wx.request({
        url: `http://1.15.174.177/api/dish/${this.data.spuId}/comments/`,
        method: 'GET',
        header: {
          'Content-Type': 'application/json', // 请求头
        },
        success: (res) => {
          if (res.statusCode === 200 && code.toUpperCase() === 'SUCCESS') {
            const data = res.data; // 获取返回的数据
            if (data && data.length > 0) {
              const firstComment = data[0]; // 只取第一条评论

              const nextState = {
                commentsList: data.map((comment) => ({
                  goodsSpu: comment.id, // 假设 id 作为 goodsSpu
                  userName: comment.username || '',
                  commentScore: comment.rating, // 使用 rating 替代 commentScore
                  commentContent: comment.comment || '用户未填写评价',
                  userHeadUrl: comment.avatar || this.anonymityAvatar, // 如果没有头像，使用匿名头像
                  commentResources: comment.images.map((image) => ({
                    src: image, // 使用 comment.images 作为 src
                    type: 'image', // 默认 type 为 'image'
                  })),
                })),
              };

              this.setData(nextState); // 更新数据
            }
          }
        },
        fail: (error) => {
          wx.showToast({
            title: '加载评论失败，请稍后再试',
            icon: 'none',
            duration: 2000, // 显示2秒
          });
          console.error('comments error:', error);
        },
      });
    } catch (error) {
      wx.showToast({
        title: '系统错误，请稍后再试',
        icon: 'none',
        duration: 2000, // 显示2秒
      });
      console.error('comments error:', error);
    }
  },


  onShareAppMessage() {
    // 自定义的返回信息
    const {
      selectedAttrStr
    } = this.data;
    let shareSubTitle = '';
    if (selectedAttrStr.indexOf('件') > -1) {
      const count = selectedAttrStr.indexOf('件');
      shareSubTitle = selectedAttrStr.slice(count + 1, selectedAttrStr.length);
    }
    const customInfo = {
      imageUrl: this.data.details.primaryImage,
      title: this.data.details.title + shareSubTitle,
      path: `/pages/goods/details/index?spuId=${this.data.spuId}`,
    };
    return customInfo;
  },

  /** 获取评价统计 */
  async getCommentsStatistics() {
    try {
      const code = 'Success';
      const data = await getGoodsDetailsCommentsCount();
      if (code.toUpperCase() === 'SUCCESS') {
        const {
          badCount,
          commentCount,
          goodCount,
          goodRate,
          hasImageCount,
          middleCount,
        } = data;
        const nextState = {
          commentsStatistics: {
            badCount: parseInt(`${badCount}`),
            commentCount: parseInt(`${commentCount}`),
            goodCount: parseInt(`${goodCount}`),
            /** 后端返回百分比后数据但没有限制位数 */
            goodRate: Math.floor(goodRate * 10) / 10,
            hasImageCount: parseInt(`${hasImageCount}`),
            middleCount: parseInt(`${middleCount}`),
          },
        };
        this.setData(nextState);
      }
    } catch (error) {
      console.error('comments statiistics error:', error);
    }
  },

  /** 跳转到评价列表 */
  navToCommentsListPage() {
    wx.navigateTo({
      url: `/pages/goods/comments/index?spuId=${this.data.spuId}`,
    });
  },

  onLoad(query) {
    // 1. 保存 spuId
    const {
      spuId
    } = query;
    this.setData({
      spuId: spuId,
    });
    // 2. 从本地 Storage 拿到收藏 ID 列表
    const storedFavoriteIds = wx.getStorageSync('favoriteIds') || [];
    // 3. 获取商品详情
    this.getDetail(spuId, storedFavoriteIds);
    this.getCommentsList(spuId);
    this.getCommentsStatistics(spuId);
  },
});