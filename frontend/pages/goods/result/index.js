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
    minVal: '',
    maxVal: '',
    minSalePriceFocus: false,
    maxSalePriceFocus: false,
    filter: false,
    hasLoaded: false,
    keywords: '',
    loadMoreStatus: 0,
    loading: true,
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
  },

  generalQueryData(reset = false) {
    const {
      filter,
      keywords,
      minVal,
      maxVal
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
      sort: 0, // 0 综合，1 价格
      pageNum: 1,
      pageSize: 30,
      keyword: keywords,
    };

    if (sorts) {
      params.sort = 1;
      params.sortType = sorts === 'desc' ? 1 : 0;
    }
    if (overall) {
      params.sort = 0;
    } else {
      params.sort = 1;
    }
    params.minPrice = minVal ? minVal * 100 : 0;
    params.maxPrice = maxVal ? maxVal * 100 : undefined;
    if (reset) return params;
    return {
      ...params,
      pageNum: pageNum + 1,
      pageSize,
    };
  },

  async init(reset = true) {
    console.log("init");
    const {
      loadMoreStatus,
      goodsList = []
    } = this.data;
    const params = this.generalQueryData(reset);
    console.log("params");
    // if (loadMoreStatus !== 0) return;
    this.setData({
      loadMoreStatus: 1,
      loading: true,
    });
    try {
      let result;
      if (this.data.filter) {
        console.log("true");
        result = await getSearchResultFilter(params);

      } else {
        console.log("false");
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
          this.total = totalCount;
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

  handleCartTap() {
    wx.switchTab({
      url: '/pages/cart/index',
    });
  },

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

  handleAddCart() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加购',
    });
  },

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

  showFilterPopup() {
    this.setData({
      show: true,
    });
  },

  showFilterPopupClose() {
    this.setData({
      show: false,
    });
  },

  onMinValAction(e) {
    const {
      value
    } = e.detail;
    this.setData({
      minVal: value
    });
  },

  onMaxValAction(e) {
    const {
      value
    } = e.detail;
    this.setData({
      maxVal: value
    });
  },

  reset() {
    this.setData({
      minVal: '',
      maxVal: ''
    });
  },

  confirm() {
    const {
      minVal,
      maxVal
    } = this.data;
    let message = '';
    if (minVal && !maxVal) {
      message = `价格最小是${minVal}`;
    } else if (!minVal && maxVal) {
      message = `价格范围是0-${minVal}`;
    } else if (minVal && maxVal && minVal <= maxVal) {
      message = `价格范围${minVal}-${this.data.maxVal}`;
    } else {
      message = '请输入正确范围';
    }
    if (message) {
      Toast({
        context: this,
        selector: '#t-toast',
        message,
      });
    }
    this.pageNum = 1;
    this.setData({
        show: false,
        minVal: '',
        goodsList: [],
        loadMoreStatus: 0,
        maxVal: '',
      },
      () => {
        this.init();
      },
    );
  },
});