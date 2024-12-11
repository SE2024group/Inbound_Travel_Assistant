import {
  login
} from '../../services/login/login'

Page({
  data: {
    isLoad: false,
    isAgreed: false, // 记录用户是否同意用户使用规则
    username: '', // 存储输入的用户名
    password: '',
  },

  // 获取输入框中的用户名
  onUsernameInput(e) {
    this.setData({
      username: e.detail.value,
    });
  },

  // 获取输入框中的密码
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value,
    });
  },

  onRegister() {
    wx.navigateTo({
      url: '/pages/register/index',
    })
  },


  onLogin() {
    const {
      username,
      password,
      isAgreed
    } = this.data;

    // 前端验证
    if (!username) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
      });
      return;
    }

    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
      });
      return;
    }

    if (!isAgreed) {
      wx.showModal({
        title: '提示',
        content: '请同意用户使用规则',
        showCancel: false,
        confirmText: '确定'
      });
      return;
    }

    // 显示加载
    wx.showLoading({
      title: '登录中...',
      mask: true, // 防止用户操作
    });


    // 调用 login 函数
    login(username, password)
      .then((token) => {
        wx.hideLoading();
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000,
        });
        // 跳转到主页面
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/navigation/navigation',
          });
        }, 2000);
      })
      .catch((error) => {
        wx.hideLoading();
        wx.showModal({
          title: '登录失败',
          content: error,
          showCancel: false,
          confirmText: '确定'
        });
        console.error('登录失败:', error);
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
        title: 'Notice',
        content: 'You haven\'t read\'User Terms and Conditions\'. Unable to login. ',
        showCancel: false,
        confirmText: 'OK'
      });
      return;
    }

    const {
      username
    } = this.data;
    console.log('username entered is ', username);

    if (this.data.username == '') {
      console.log('havent enter username')
      wx.showToast({
        title: 'Haven\'t entered username\n, treated as \'Tourist\'.',
        icon: 'none',
        duration: 500,
      });
      this.setData({
        username: 'Tourist',
      });
      console.log('username is ', this.data.username);
    };

    wx.showToast({
      title: 'Logged in',
      icon: 'success',
    });

    console.log('tourist');

    wx.setStorage({
      key: 'userName',
      data: `${this.data.username}`,
    });
    wx.setStorage({
      key: 'loggedBy',
      data: `tourist`,
    });
    wx.setStorage({
      key: 'registeredAt',
      data: new Date().toISOString() + " GMT",
    });
    wx.setStorageSync('isLoggedIn', true);
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/navigation/navigation',
      });
    }, 500);
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

  },





});