Page({
  data: {
    isLoad: false,
    isAgreed: false, // 记录用户是否同意用户使用规则
    username: '', // 存储输入的用户名
  },

  // 获取输入框中的用户名
  onUsernameInput(e) {
    this.setData({
      username: e.detail.value,
    });
  },

  // 登录按钮点击事件
  onTouristLogin() {
    if (!this.data.isLoad) {
      this.setData({
        isLoad: true
      });
    } else if (!this.data.isAgreed) {
      wx.showModal({
        title: '提示',
        content: '您尚未阅读《用户使用规则》，无法登录。',
        showCancel: false,
        confirmText: '知道了'
      });
      return;
    }

    const {
      username
    } = this.data;
    console.log('username is ', username);

    if (!username) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
      });
      return;
    }

    // 调用 login 函数并传递用户名
    login(username)
      .then((token) => {
        wx.showToast({
          title: '登录成功',
          icon: 'success',
        });
        // 登录成功后跳转到 usercenter 页面
        wx.navigateTo({
          url: '/pages/usercenter/usercenter',
        });
      })
      .catch((error) => {
        wx.showToast({
          title: '登录失败',
          icon: 'error',
        });
        console.error(error);
      });
    console.log('tourist');
    wx.setStorage({
      key: 'userName',
      data: `${username}`,
    });
    wx.setStorage({
      key: 'loggedBy',
      data: `tourist`,
    });
    wx.setStorage({
      key: 'registeredAt',
      data: new Date().toISOString(),
    });
    wx.setStorageSync('isLoggedIn', true);
    wx.switchTab({
      url: '/pages/navigation/navigation',
    })
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
      url: '/pages/userRule/index'
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
    if (!this.data.isLoad) {
      this.setData({
        isLoad: true
      });
    } else if (!this.data.isAgreed) {
      wx.showModal({
        title: '提示',
        content: '您尚未阅读《用户使用规则》，无法登录。',
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
          content: '您拒绝了授权，登录失败。',
          showCancel: false,
          confirmText: '知道了'
        });
      }
    });
  },


  onPhoneLogin(e) {
    if (!this.data.isLoad) {
      this.setData({
        isLoad: true
      });
    } else if (!this.data.isAgreed) {
      wx.showModal({
        title: '提示',
        content: '您尚未阅读《用户使用规则》，无法登录。',
        showCancel: false,
        confirmText: '知道了'
      });
      return;
    }
    console.log('e.detail', e.detail)
    if (e.detail.code) {
      wx.request({
        url: 'https://1.15.174.177:3000/phone-login',
        method: 'POST',
        data: {
          code: e.detail.code
        },
        success: response => {
          console.log("Phone login successful:", response.data);
          // 在此处处理登录成功后的逻辑，例如存储用户信息或跳转页面
        },
        fail: () => {
          wx.showModal({
            title: '提示',
            content: '登录失败，请重试。',
            showCancel: false,
            confirmText: '知道了'
          });
        }
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '获取手机号失败，请重试。',
        showCancel: false,
        confirmText: '知道了'
      });
    }
  }
});