Component({
  externalClasses: ['wr-class'],
  options: {
    multipleSlots: true,
  },
  properties: {
    goodsDetailInfo: {
      type: String,
      value: '',
    },
    sellerReply: {
      type: String,
      value: '',
    },
    userHeadUrl: {
      type: String,
      value: '',
    },
    userName: {
      type: String,
      default: '',
    },
    commentContent: {
      type: String,
      value: '',
    },
    commentScore: {
      type: Number,
      value: 0,
    },
    commentTime: {
      type: String,
      value: '',
    },
    commentResources: {
      type: Array,
      value: [],
    },
    spuId: {
      type: Number,
      value: 0,
    },
    commentId: {
      type: Number,
      value: 0,
    },
  },

  data: {
    showMoreStatus: false,
    showContent: false,
    hideText: false,
    eleHeight: null,
    overText: false,
    isDisabled: true,
    startColors: ['#FFC51C', '#DDDDDD'],
  },
  methods: {
    viewGoods: function () {
      wx.navigateTo({
        url: `/pages/goods/details/index?spuId=${this.properties.spuId}`,
      });
    },
    deleteComment: function () {
      const that = this; // 将当前组件实例存储到that中
      const authToken = wx.getStorageSync('authToken') || '';
      wx.showModal({
        title: 'delete confirm',
        content: 'Are you sure you want to delete this comment？',
        success(res) {
          if (res.confirm) {
            console.log(that.properties.commentId);
            // 调用删除评论 API
            wx.request({
              url: `http://1.15.174.177/api/comments/${that.properties.commentId}/delete/`,
              method: 'DELETE',
              header: {
                'Authorization': authToken,
                'Content-Type': 'application/json',
              },
              success: function (response) {
                if (response.statusCode === 200) {
                  wx.showToast({
                    title: 'comment deleted',
                    icon: 'success',
                  });

                  // 如果需要，刷新页面或更新评论列表
                  that.triggerEvent('refreshParent', {
                    commentId: that.properties.commentId
                  });
                } else {
                  wx.showToast({
                    title: response.data.detail || 'fail to delete',
                    icon: 'none',
                  });
                }
              },
              fail: function () {
                wx.showToast({
                  title: 'request failed',
                  icon: 'none',
                });
              },
            });
          }
        },
      });
    },
  },

});