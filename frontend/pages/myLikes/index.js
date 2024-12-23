// pages/myLikes/index.js

import Toast from 'tdesign-miniprogram/toast/index';

Page({
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
      pageLoading: true,
    });
    this.loadFavoriteGoodsList(true);
  },

  // 加载用户收藏的菜品列表，fresh为true表示重新加载数据
  async loadFavoriteGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0
      });
    }

    this.setData({
      goodsListLoadStatus: 1,
    });

    try {
      // 从后端获取用户收藏的菜品
      const nextList = await this.fetchFavoriteDishes();
      this.setData({
        goodsList: nextList,
        goodsListLoadStatus: 0,
        pageLoading: false,
      });
    } catch (err) {
      console.error('获取收藏菜品失败', err);
      this.setData({
        goodsListLoadStatus: 3,
        pageLoading: false,
      });
    }
  },

  onReTry() {
    this.loadFavoriteGoodsList();
  },

  // 点击商品卡片跳转到详情页面
  goodListClickHandle(e) {
    const {
      index
    } = e.detail;
    const {
      spuId
    } = this.data.goodsList[index] || {};
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },

  // 点赞/取消点赞的回调（如果需要与 redbook.js 类似的逻辑，这里也可以做二次请求）
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


  fetchFavoriteDishes() {
    return new Promise((resolve, reject) => {
      const authToken = wx.getStorageSync('authToken') || '';
      wx.request({
        url: 'http://1.15.174.177/api/favorites/',
        method: 'GET',
        header: {
          'Authorization': authToken
        },
        success: (res) => {
          const favorites = res.data || [];
          // 这里把后端的收藏列表映射成 goodsList 所需的格式
          const mapped = favorites.map(dish => ({
            spuId: String(dish.id),
            thumb: dish.images?.[0] || '',
            title: dish.name_en || dish.name,
            tags: [{
              "id": 14,
              "name": "麻",
              "name_en": "Numbing",
              "preference": "OTHER"
            }],
            // tags: dish.tags.map(t => t.name_en),
            isFavorite: true,
          }));
          const favoriteIds = favorites.map(dish => String(dish.id));
          wx.setStorageSync('favoriteIds', favoriteIds);
          resolve(mapped);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },

  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onReachBottom() {},
  onShareAppMessage() {},
});