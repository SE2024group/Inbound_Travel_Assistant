// pages/myLikes/index.js

import {
  fetchFavoriteGoodsList
} from '../../services/good/fetchGoods'; // 假设有一个获取收藏列表的服务接口
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  /**
   * Page initial data
   */
  data: {
    goodsList: [],
    goodsListLoadStatus: 0, // 0: 可继续加载, 1: 加载中, 3: 加载失败
    pageLoading: false,
  },

  onLoad() {
    this.init();
  },

  onPullDownRefresh() {
    this.init();
  },

  // 初始化页面数据
  init() {
    wx.stopPullDownRefresh();
    this.setData({
      pageLoading: true
    });
    this.loadFavoriteGoodsList(true);
  },

  // 加载用户收藏的菜品列表，fresh为true表示重新加载数据
  async loadFavoriteGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({
      goodsListLoadStatus: 1
    });

    try {
      const nextList = await fetchFavoriteGoodsList();
      // 假设fetchFavoriteGoodsList()返回当前用户收藏的所有商品，不分页
      this.setData({
        goodsList: nextList,
        goodsListLoadStatus: 0,
        pageLoading: false,
      });
    } catch (err) {
      this.setData({
        goodsListLoadStatus: 3,
        pageLoading: false,
      });
    }
  },

  onReTry() {
    this.loadFavoriteGoodsList();
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

  goodListLikedHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '已收藏',
    });
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