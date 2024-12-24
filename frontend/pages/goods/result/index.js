/* eslint-disable no-param-reassign */
import {
  getSearchResult
} from '../../../services/good/fetchSearchResult';
import {
  getSearchResultFilter
} from '../../../services/good/fetchSearchResult';

import {
  genGood
} from '../../../model/good';
import {
  fetchGoodsList
} from '../../../services/good/fetchGoods';
import Toast from 'tdesign-miniprogram/toast/index';

const initFilters = {
  overall: 1,
  sorts: '',
};

Page({
  data: {
    goodsList: [],
    sorts: '',
    overall: 1,
    show: false,
    keywords: '',
    loadMoreStatus: 0,
    loading: true,
    // TODO: 更换为软编码
    tags: ['新品', '热卖', '折扣', '限时', '推荐'], // 硬编码的一些标签
    selectedLikeTags: [], // 选中的喜欢标签
    selectedDislikeTags: [], // 选中的不喜欢标签
  },

  total: 0,
  pageNum: 1,
  pageSize: 30,

  onLoad(options) {
    // const {
    //   searchValue = '',
    //     filter
    // } = options || {};
    const searchValue = options.searchValue;
    const filter = options.filter === 'true'; // 将字符串 'true' 转换为布尔值 true
    this.setData({
        keywords: searchValue,
        filter: filter
      },
      () => {
        this.init(true);
      },
    );
    console.log('filter:', filter); // 显示传递的过滤值，布尔值
    this.setData({
      filter: filter
    });
    this.fetchTags();
  },

  async fetchTags() {
    try {
      const response = await wx.request({
        url: 'http://1.15.174.177/api/tags/', // 假设有一个获取标签的 API
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.code === 200) {
        this.setData({
          tags: response.data.data.tags, // 根据 API 返回的数据结构调整
        });
      } else {
        console.error('获取标签失败:', response.data.message);
      }
    } catch (error) {
      console.error('网络错误:', error);
    }
  },

  /**
   * 切换喜欢标签的选中状态
   */
  toggleLikeTag(e) {
    const tag = e.currentTarget.dataset.tag;
    let {
      selectedLikeTags
    } = this.data;
    if (selectedLikeTags.includes(tag)) {
      selectedLikeTags = selectedLikeTags.filter(t => t !== tag);
    } else {
      selectedLikeTags.push(tag);
    }
    this.setData({
      selectedLikeTags,
    });
    console.log('selectedLikeTags', this.data.selectedLikeTags)
  },

  /**
   * 切换不喜欢标签的选中状态
   */
  toggleDislikeTag(e) {
    const tag = e.currentTarget.dataset.tag;
    let {
      selectedDislikeTags
    } = this.data;
    if (selectedDislikeTags.includes(tag)) {
      selectedDislikeTags = selectedDislikeTags.filter(t => t !== tag);
    } else {
      selectedDislikeTags.push(tag);
    }
    this.setData({
      selectedDislikeTags,
    });
    console.log('selectedDislikeTags', this.data.selectedDislikeTags)
  },

  /**
   * 构建搜索参数
   */
  generalQueryData(reset = false) {
    const {
      filter,
      keywords,
      selectedLikeTags,
      selectedDislikeTags
    } = this.data;
    const {
      pageNum,
      pageSize
    } = this;
    const {
      sorts,
      overall
    } = filter;
    const params = {
      sort: 0, // 0 综合，1 价格 (价格已移除)
      pageNum: 1,
      pageSize: 30,
      keyword: keywords,
      filter: [], // 将根据选中的标签构建
    };

    // 添加喜欢的标签
    selectedLikeTags.forEach(tag => {
      params.filter.push({
        tag: tag,
        preference: 'LIKE'
      });
    });

    // 添加不喜欢的标签
    selectedDislikeTags.forEach(tag => {
      params.filter.push({
        tag: tag,
        preference: 'DISLIKE'
      });
    });

    if (sorts) {
      params.sort = 1;
      params.sortType = sorts === 'desc' ? 1 : 0;
    }
    if (overall) {
      params.sort = 0;
    } else {
      params.sort = 1;
    }

    if (reset) return params;
    return {
      ...params,
      pageNum: pageNum + 1,
      pageSize,
    };
  },

  /**
   * 初始化或加载更多数据
   */
  async init(reset = true) {
    console.log("init");
    const {
      loadMoreStatus,
      goodsList = []
    } = this.data;
    const params = this.generalQueryData(reset);
    console.log("params", params);
    // if (loadMoreStatus !== 0) return; // 可根据需要启用
    this.setData({
      loadMoreStatus: 1,
      loading: true,
    });
    try {
      let result;
      if (this.data.filter || this.data.selectedLikeTags.length > 0 || this.data.selectedDislikeTags.length > 0) {
        console.log("使用过滤条件");
        result = await getSearchResultFilter(params);
      } else {
        console.log("不使用过滤条件");
        result = await getSearchResult(params);
      }
      // const result = await getSearchResult(params);
      console.log(result);
      const code = 'Success';
      const data = result.data;
      if (code.toUpperCase() === 'SUCCESS') {
        const spuList = data.results;
        // const spuList = [7, 2]
        console.log("spuList");
        console.log(spuList);
        if (spuList.length === 0 && reset) {
          console.log("spuList.length === 0 && reset")
          this.total = data.totalCount || 0; // 假设API返回totalCount
          this.setData({
            emptyInfo: {
              tip: '抱歉，未找到相关商品',
            },
            hasLoaded: true,
            loadMoreStatus: 0,
            loading: false,
            goodsList: [],
          });
          return;
        }
        const promises = spuList.map(spu => genGood(spu));
        // 使用 Promise.all 来获取所有的结果
        Promise.all(promises)
          .then(results => {
            // 更新数据到 goodsList 和 loadMoreStatus
            if (results.length) {
              results.forEach((item) => {
                item.spuId = item.spuId;
                item.thumb = item.primaryImage;
                item.title = item.title;
                item.title_ch = item.title_ch;
                item.price = item.minSalePrice;
                item.originPrice = item.maxLinePrice;
                item.desc = '';
                if (item.spuTagList) {
                  item.tags = item.spuTagList.map((tag) => tag.title);
                } else {
                  item.tags = [];
                }
              });
            }
            this.setData({
              goodsList: this.data.goodsList.concat(results), // 将结果设置为 goodsList
              // loadMoreStatus: _loadMoreStatus, // 设置加载状态
            });

            this.setData({
              loadMoreStatus: 2,
            });
          })
          .catch(error => {
            console.error('发生错误:', error);
            // 如果需要设置加载失败的状态，也可以在这里更新
            this.setData({
              loadMoreStatus: '加载失败'
            });
          });

      } else {
        this.setData({
          loading: false,
        });
        wx.showToast({
          title: '查询失败，请稍候重试',
        });
      }
    } catch (error) {
      this.setData({
        loading: false,
      });
    }
    this.setData({
      hasLoaded: true,
      loading: false,
    });
  },

  /**
   * 处理购物车点击
   */
  handleCartTap() {
    wx.switchTab({
      url: '/pages/cart/index',
    });
  },

  /**
   * 处理搜索提交
   */
  handleSubmit() {
    this.setData({
        goodsList: [],
        loadMoreStatus: 0,
      },
      () => {
        this.init(true);
      },
    );
  },

  /**
   * 处理页面滚动到底部
   */
  onReachBottom() {
    const {
      goodsList
    } = this.data;
    const {
      total = 0
    } = this;
    if (goodsList.length === total) {
      this.setData({
        loadMoreStatus: 2,
      });
      return;
    }
    this.init(false);
  },

  /**
   * 处理添加到购物车
   */
  handleAddCart() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加购',
    });
  },

  /**
   * 跳转到商品详情
   */
  gotoGoodsDetail(e) {
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

  /**
   * 处理过滤器变化
   */
  handleFilterChange(e) {
    const {
      overall,
      sorts
    } = e.detail;
    const {
      total
    } = this;
    const _filter = {
      sorts,
      overall,
    };
    this.setData({
      filter: _filter,
      sorts,
      overall,
    });

    this.pageNum = 1;
    this.setData({
        goodsList: [],
        loadMoreStatus: 0,
      },
      () => {
        total && this.init(true);
      },
    );
  },

  /**
   * 显示过滤器弹窗
   */
  showFilterPopup() {
    this.setData({
      show: true,
    });
  },

  /**
   * 关闭过滤器弹窗
   */
  showFilterPopupClose() {
    this.setData({
      show: false,
    });
  },

  /**
   * 重置筛选条件
   */
  reset() {
    this.setData({
      selectedLikeTags: [],
      selectedDislikeTags: [],
      goodsList: [],
      loadMoreStatus: 0,
    }, () => {
      this.init(true);
    });
  },

  /**
   * 确认筛选条件
   */
  confirm() {
    // 不再需要验证价格范围，直接应用筛选
    this.pageNum = 1;
    this.setData({
      show: false,
      goodsList: [],
      loadMoreStatus: 0,
    }, () => {
      this.init();
    });
  },
});