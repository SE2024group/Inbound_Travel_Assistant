import {
  getSearchHistory,
  getSearchPopular,
} from '../../../services/good/fetchSearchHistory';

Page({
  data: {
    historyWords: [],
    popularWords: [],
    searchValue: '',
    dialog: {
      title: '确认删除当前历史记录',
      showCancelButton: true,
      message: '',
    },
    dialogShow: false,
    filter: false, // 初始的 filter 参数
    filterActive: false // 用于控制 checkbox 是否勾选
  },

  deleteType: 0,
  deleteIndex: '',
  onLoad: function (options) {
    // 获取传递的 keyword 参数
    let keyword = decodeURIComponent(options.keyword || "");
    if (!keyword) {
      keyword = "";
    }

    this.setData({
      searchValue: keyword,
    });
    console.log('传递的 keyword:', keyword);
  },

  toggleFilter: function (event) {
    // 获取 checkbox 是否被选中的状态
    const isChecked = event.detail.value.length > 0;

    // 更新页面的 `filter` 和 `filterActive` 参数
    this.setData({
      filter: isChecked,
      filterActive: isChecked
    });
  },
  onShow() {
    this.queryHistory();
    this.queryPopular();
  },

  async queryHistory() {
    try {
      const data = await getSearchHistory();
      const code = 'Success';
      if (String(code).toUpperCase() === 'SUCCESS') {
        const {
          historyWords = []
        } = data;
        this.setData({
          historyWords,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },

  async queryPopular() {
    try {
      const data = await getSearchPopular();
      const code = 'Success';
      if (String(code).toUpperCase() === 'SUCCESS') {
        const {
          popularWords = []
        } = data;
        this.setData({
          popularWords,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },

  confirm() {
    const {
      historyWords
    } = this.data;
    const {
      deleteType,
      deleteIndex
    } = this;
    historyWords.splice(deleteIndex, 1);
    if (deleteType === 0) {
      this.setData({
        historyWords,
        dialogShow: false,
      });
    } else {
      this.setData({
        historyWords: [],
        dialogShow: false
      });
    }
  },

  close() {
    this.setData({
      dialogShow: false
    });
  },

  handleClearHistory() {
    const {
      dialog
    } = this.data;
    this.deleteType = 1;
    this.setData({
      dialog: {
        ...dialog,
        message: 'clear history?',
      },
      dialogShow: true,
    });
  },

  deleteCurr(e) {
    const {
      index
    } = e.currentTarget.dataset;
    const {
      dialog
    } = this.data;
    this.deleteIndex = index;
    this.setData({
      dialog: {
        ...dialog,
        message: 'clear history',
        deleteType: 0,
      },
      dialogShow: true,
    });
  },

  handleHistoryTap(e) {
    const {
      historyWords
    } = this.data;
    const {
      dataset
    } = e.currentTarget;
    const _searchValue = historyWords[dataset.index || 0] || '';
    if (_searchValue) {
      console.log(`/pages/goods/result/index?searchValue=${_searchValue}`);
      wx.navigateTo({
        url: `/pages/goods/result/index?searchValue=${_searchValue}`,
      });
    }
  },

  handleSubmit(e) {
    console.log('submit event detail:', e.detail); // 调试事件数据
    const {
      value
    } = e.detail;
    console.log(`/pages/goods/result/index?searchValue=${value}`);
    // if (value.length === 0) return;
    wx.navigateTo({
      url: `/pages/goods/result/index?searchValue=${value}`,
    });
  },
});