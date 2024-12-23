import {
  fetchComments
} from '../../../services/comments/fetchComments';
import {
  fetchCommentsCount
} from '../../../services/comments/fetchCommentsCount';

const layoutMap = {
  0: 'vertical',
};
Page({
  data: {
    pageLoading: false,
    commentList: [],
    pageNum: 1,
    myPageNum: 1,
    pageSize: 10,
    total: 0,
    myTotal: 0,
    hasLoaded: false,
    layoutText: layoutMap[0],
    loadMoreStatus: 0,
    myLoadStatus: 0,
    spuId: '1060004',
    commentLevel: '',
    hasImage: '',
    commentType: '',
    totalCount: 0,
    countObj: {
      badCount: '0',
      commentCount: '0',
      goodCount: '0',
      middleCount: '0',
      hasImageCount: '0',
      uidCount: '0',
    },
  },
  onLoad(options) {
    this.getCount(options);
    this.getComments(options);
  },
  async getCount(options) {
    try {
      const result = await fetchCommentsCount({
        spuId: options.spuId,
      }, {
        method: 'POST',
      }, );
      this.setData({
        countObj: result,
      });
    } catch (error) {}
  },
  generalQueryData(reset) {
    const {
      hasImage,
      pageNum,
      pageSize,
      spuId,
      commentLevel
    } = this.data;
    const params = {
      pageNum: 1,
      pageSize: 30,
      queryParameter: {
        spuId,
      },
    };
    if (
      Number(commentLevel) === 3 ||
      Number(commentLevel) === 2 ||
      Number(commentLevel) === 1
    ) {
      params.queryParameter.commentLevel = Number(commentLevel);
    }
    if (hasImage && hasImage === '1') {
      params.queryParameter.hasImage = true;
    } else {
      delete params.queryParameter.hasImage;
    }
    // 重置请求
    if (reset) return params;

    return {
      ...params,
      pageNum: pageNum + 1,
      pageSize,
    };
  },
  async init(reset = true) {
    const {
      loadMoreStatus,
      commentList = []
    } = this.data;
    const params = this.generalQueryData(reset);

    // 在加载中或者无更多数据，直接返回
    if (loadMoreStatus !== 0) return;

    this.setData({
      loadMoreStatus: 1,
    });
    try {
      const code = 'Success';
      wx.request({
        url: `http://1.15.174.177/api/dish/${this.data.spuId}/comments/`,
        method: 'GET',
        header: {
          'Content-Type': 'application/json', // 请求头
        },
        success: (res) => {
          // if (res.statusCode === 200 && code.toUpperCase() === 'SUCCESS') {
          //   const data = res.data; // 获取返回的数据
          //   console.log(data);
          //   const nextState = {
          //     commentList: data.map((item) => {
          //       return {
          //         goodsSpu: item.id, // 假设 id 作为 goodsSpu
          //         userName: item.username || '',
          //         userHeadUrl: item.avatar,
          //         commentScore: item.rating, // 使用 rating 替代 commentScore
          //         commentContent: item.comment || '用户未填写评价',
          //         userHeadUrl: item.avatar || this.anonymityAvatar, // 如果没有头像，使用匿名头像
          //         commentResources: item.images.map((resource) => ({
          //           // src: 'https://cloud.tsinghua.edu.cn/f/e0d6af7b94574b06b4ee/?dl=1',
          //           src: resource.image, // 使用 item.images 作为 src
          //           type: 'image', // 默认 type 为 'image'
          //         })),
          //       };
          //     }),
          //   };
          //   this.setData(
          //     nextState
          //   ); // 更新数据
          //   console.log("commentList");
          //   console.log(this.data.commentList);
          // }
          if (res.statusCode === 200 && code.toUpperCase() === 'SUCCESS') {
            const data = res.data; // 获取返回的数据
            if (data && data.length > 0) {
              const firstComment = data[0]; // 只取第一条评论
              console.log(firstComment);
              const nextState = {
                commentList: [{
                  goodsSpu: firstComment.id, // 假设 id 作为 goodsSpu
                  userName: firstComment.username || '',
                  commentScore: firstComment.rating, // 使用 rating 替代 commentScore
                  commentContent: firstComment.comment || '用户未填写评价',
                  userHeadUrl: firstComment.avatar || this.anonymityAvatar, // 如果没有头像，使用匿名头像
                  commentResources: firstComment.images.map((image) => ({
                    src: image.image, // 使用 item.images 作为 src
                    type: 'image', // 默认 type 为 'image'
                  })),
                }],
              };
              this.setData(nextState); // 更新数据
            }
          }
        },
        fail: (error) => {
          console.error('comments error:', error);
        },
      });
    } catch (error) {
      console.error('comments error:', error);
    }
    this.setData({
      hasLoaded: true,
      loadMoreStatus: 2,
    });
  },
  getScoreArray(score) {
    var array = [];
    for (let i = 0; i < 5; i++) {
      if (i < score) {
        array.push(2);
      } else {
        array.push(0);
      }
    }
    return array;
  },
  getComments(options) {
    const {
      commentLevel = -1, spuId, hasImage = ''
    } = options;
    if (commentLevel !== -1) {
      this.setData({
        commentLevel: commentLevel,
      });
    }
    this.setData({
      hasImage: hasImage,
      commentType: hasImage ? '4' : '',
      spuId: spuId,
    });
    this.init(true);
  },
  changeTag(e) {
    var {
      commenttype
    } = e.currentTarget.dataset;
    var {
      commentType
    } = this.data;
    if (commentType === commenttype) return;
    this.setData({
      loadMoreStatus: 0,
      commentList: [],
      total: 0,
      myTotal: 0,
      myPageNum: 1,
      pageNum: 1,
    });
    if (commenttype === '' || commenttype === '5') {
      this.setData({
        hasImage: '',
        commentLevel: '',
      });
    } else if (commenttype === '4') {
      this.setData({
        hasImage: '1',
        commentLevel: '',
      });
    } else {
      this.setData({
        hasImage: '',
        commentLevel: commenttype,
      });
    }
    if (commenttype === '5') {
      this.setData({
        myLoadStatus: 1,
        commentType: commenttype,
      });
      this.getMyCommentsList();
    } else {
      this.setData({
        myLoadStatus: 0,
        commentType: commenttype,
      });
      this.init(true);
    }
  },
  onReachBottom() {
    const {
      total = 0, commentList
    } = this.data;
    if (commentList.length === total) {
      this.setData({
        loadMoreStatus: 2,
      });
      return;
    }

    this.init(false);
  },
});