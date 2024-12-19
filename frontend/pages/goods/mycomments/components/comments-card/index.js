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
    // spuId: {
    //   type: Int,
    //   value: 0,
    // },
    // id: {
    //   type: Int,
    //   value: 0,
    // }
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
      console.log("dw");
      // 使用 wx.navigateTo 跳转到商品详情页面
      wx.navigateTo({
        // url: `/pages/goods/details/index?spuId=${spuId}`,
        url: `/pages/goods/details/index?spuId=1`,
      });
    },
    deleteComment: function () {
      const that = this;

      // if (!this.data.commentId) {
      //   wx.showToast({
      //     title: '评论信息缺失',
      //     icon: 'none',
      //   });
      //   return;
      // }
      const authToken = wx.getStorageSync('authToken') || '';
      wx.showModal({
        title: 'delete confirm',
        content: 'Are you sure you want to delete this comment？',
        success(res) {
          if (res.confirm) {
            // 调用删除评论 API
            wx.request({
              url: `http://1.15.174.177/api/comments/${that.data.commentId}/delete/`,
              //url: `http://1.15.174.177/api/comments/${id}/delete/`,
              method: 'DELETE',
              header: {
                'Authorization': authToken,
                'Content-Type': 'application/json',
              },
              success: function (response) {
                if (response.statusCode === 200) {
                  wx.showToast({
                    title: 'comments have been deleted',
                    icon: 'success',
                  });

                  // 如果需要，刷新页面或更新评论列表
                  that.refreshComments();
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