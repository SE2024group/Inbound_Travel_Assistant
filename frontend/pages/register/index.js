Page({
  data: {
    isAgreed: false, // 记录用户是否同意用户使用规则
    username: '', // 用户名
    password: '',
    password2: '',
    nickname: '',
    personality_description: '',
    avatarPath: '', // 头像图片路径
  },

  // 获取用户名输入
  onUsernameInput(e) {
    this.setData({
      username: e.detail.value.trim(),
    });
  },

  // 获取密码输入
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value,
    });
  },

  // 获取确认密码输入
  onPassword2Input(e) {
    this.setData({
      password2: e.detail.value,
    });
  },

  // 获取昵称输入
  onNicknameInput(e) {
    this.setData({
      nickname: e.detail.value.trim(),
    });
  },

  // 获取个性描述输入
  onPersonalityInput(e) {
    this.setData({
      personality_description: e.detail.value.trim(),
    });
  },

  // 选择头像
  chooseAvatar() {
    wx.chooseMedia({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          avatarPath: res.tempFilePaths[0],
        });
      },
      fail: (err) => {
        console.error('选择头像失败:', err);
      }
    });
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

  // 返回登录页面
  goToLogin() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 注册按钮点击事件
  onRegister() {
    const {
      username,
      password,
      password2,
      isAgreed,
      avatarPath
    } = this.data;

    // 前端验证
    if (!username) {
      wx.showToast({
        title: 'Username cannot be empty\.',
        icon: 'none',
      });
      return;
    }

    if (!password) {
      wx.showToast({
        title: 'Password cannot be empty\.',
        icon: 'none',
      });
      return;
    }

    if (password.length < 8) {
      wx.showToast({
        title: 'Password must be at least 8 characters\.',
        icon: 'none',
      });
      return;
    }

    if (password !== password2) {
      wx.showToast({
        title: 'Passwords do not match\.',
        icon: 'none',
      });
      return;
    }

    if (!isAgreed) {
      wx.showToast({
        title: 'Please read User Terms and Conditions\.',
        icon: 'none',
      });
      return;
    }

    // 显示加载
    wx.showLoading({
      title: 'Excecuting Registration...',
    });

    if (avatarPath) {
      // 如果有头像，则使用 wx.uploadFile
      wx.uploadFile({
        url: 'http://1.15.174.177/api/register/',
        filePath: avatarPath,
        name: 'avatar',
        formData: {
          username: username,
          password: password,
          password2: password2,
          nickname: this.data.nickname,
          personality_description: this.data.personality_description,
        },
        header: {
          'Content-Type': 'multipart/form-data',
        },
        success: (res) => {
          wx.hideLoading();
          const data = JSON.parse(res.data);
          if (res.statusCode === 201) {
            wx.showToast({
              title: 'Successfully registered!',
              icon: 'success',
              duration: 2000,
            });
            // 存储 authToken 和用户信息
            wx.setStorageSync('authToken', `Token ${data.token}`);
            wx.setStorageSync('user', data.user);
            wx.setStorageSync('loggedBy', 'auth'); // 标记为认证登录
            // 跳转到主页面
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/navigation/navigation',
              });
            }, 2000);
          } else {
            // 处理错误
            const errorMsg = Object.values(data).flat().join('\n');
            wx.showModal({
              title: 'Registration failed\.',
              content: errorMsg,
              showCancel: false,
              confirmText: 'OK'
            });
          }
        },
        fail: (err) => {
          wx.hideLoading();
          console.error('注册请求失败:', err);
          wx.showToast({
            title: 'Registration request failed\.',
            icon: 'none',
          });
        }
      });
    } else {
      // 如果没有头像，使用 wx.request
      wx.request({
        url: 'http://1.15.174.177/api/register/',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        data: {
          username: username,
          password: password,
          password2: password2,
          nickname: this.data.nickname,
          personality_description: this.data.personality_description,
        },
        success: (res) => {
          wx.hideLoading();
          if (res.statusCode === 201) {
            wx.showToast({
              title: 'Successful Registration',
              icon: 'success',
              duration: 2000,
            });
            // 存储 authToken 和用户信息
            wx.setStorageSync('authToken', `Token ${res.data.token}`);
            wx.setStorageSync('user', res.data.user);
            wx.setStorageSync('loggedBy', 'auth'); // 标记为认证登录
            // 跳转到主页面
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/navigation/navigation',
              });
            }, 2000);
          } else {
            // 处理错误
            const errorMsg = Object.values(res.data).flat().join('\n');
            wx.showModal({
              title: 'Registration failed\.',
              content: errorMsg,
              showCancel: false,
              confirmText: 'OK'
            });
          }
        },
        fail: (err) => {
          wx.hideLoading();
          console.error('注册请求失败:', err);
          wx.showToast({
            title: 'Registration request failed\.',
            icon: 'none',
          });
        }
      });
    }
  },
});