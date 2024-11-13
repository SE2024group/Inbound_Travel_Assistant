import { fetchUserData } from '../../services/usercenter/fetchUsercenter';

Page({
  data: {
    userInfo: {},
  },
  onLoad() {
    fetchUserData().then((data) => {
      this.setData({ userInfo: data });
    });
  },
  // 跳转到点赞页面
  goToLikes() {
    wx.navigateTo({
      url: '/pages/likes/index'
    });
  },
  // 跳转到浏览历史页面
  goToViewed() {
    wx.navigateTo({
      url: '/pages/viewed/index'
    });
  },
  // 跳转到我的笔记页面
  goToNotes() {
    wx.navigateTo({
      url: '/pages/notes/index'
    });
  },
});
