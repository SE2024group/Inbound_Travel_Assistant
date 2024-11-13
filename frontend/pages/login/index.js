Page({
  data: {
    isLoad: false,
    isAgreed: false  // 记录用户是否同意用户使用规则
  },

  // 处理复选框状态变化
  onAgreementChange(e) {
    this.setData({
      isAgreed: e.detail.value.includes('agree')
    });
  },

  // 跳转到用户使用规则页面
  goToUserRule() {
    wx.navigateTo({
      url: '/pages/user_rule/user_rule'
    });
  },

  onLoad() {
    // 检查用户是否已经授权登录
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 用户已经授权过，可以直接使用微信信息
          wx.getUserInfo({
            success: res => {
              this.onWeChatLogin(res.userInfo);
            }
          });
        }
      }
    });
  },

  onWeChatLogin(userInfo) {
    if (!isLoad) {
      this.setData({ isLoad: true });
    } else if (!this.data.isAgreed) {
      wx.showModal({
        title: '提示',
        content: '您拒绝了授权，无法登录。',
        showCancel: false,
        confirmText: '知道了'
      });
      return;
    }
    wx.login({
      success: res => {
        if (res.code) {
          // 将 code 和用户信息传递到后端
          wx.request({
            url: 'http://1.15.174.177:3000/wechat-login',
            method: 'POST',
            data: {
              code: res.code,
              userInfo: userInfo
            },
            success: response => {
              // 将返回的令牌存储到本地
              wx.setStorage({
                key: "userToken",
                data: response.data.token
              });
              console.log("Login successful:", response.data);
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      },
      fail: () => {
        wx.showModal({
          title: '提示',
          content: '您拒绝了授权，无法登录。',
          showCancel: false,
          confirmText: '知道了'
        });
      }
    });
  },


  onPhoneLogin(e) {
    if (!this.data.isAgreed) {
      wx.showModal({
        title: '提示',
        content: '您拒绝了授权，无法登录。',
        showCancel: false,
        confirmText: '知道了'
      });
      return;
    }
    if (e.detail.iv && e.detail.encryptedData) {
      wx.login({
        success: res => {
          if (res.code) {
            wx.request({
              url: 'https://1.15.174.177:3000/phone-login',
              method: 'POST',
              data: {
                code: res.code,
                iv: e.detail.iv,
                encryptedData: e.detail.encryptedData
              },
              success: response => {
                console.log("Phone login successful:", response.data);
              }
            });
          }
        },
        fail: () => {
          wx.showModal({
            title: '提示',
            content: '您拒绝了授权，无法登录。',
            showCancel: false,
            confirmText: '知道了'
          });
        }
      });
    } else {
      console.log('用户拒绝手机号授权');
    }
  },
});
