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
      mediaType: ['image'], // 如果你只需要图片，可以明确指定
      success: (res) => {
        if (res.tempFiles && res.tempFiles.length > 0) {
          this.setData({
            avatarPath: res.tempFiles[0].tempFilePath,
          });
        } else {
          console.error('选择的文件为空');
        }
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

    // 先使用 wx.request
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
          // 如果有头像路径，则上传头像
          if (avatarPath) {
            this.uploadAvatar(avatarPath, res.data.token);
          } else {
            // 跳转到主页面
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/navigation/navigation',
              });
            }, 2000);
          }
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
  },
  // 上传头像的函数，使用 PATCH 方法
  uploadAvatar(avatarPath, token) {
    return new Promise((resolve, reject) => {
      const boundary = '----WebKitFormBoundary' + Math.random().toString(16);

      // 读取文件数据
      wx.getFileSystemManager().readFile({
        filePath: avatarPath,
        encoding: 'binary',
        success: (fileData) => {
          const avatarBinary = fileData.data;

          // 构建 multipart/form-data 的请求体
          let body = '';
          // 添加 avatar 文件
          body += `--${boundary}\r\n`;
          body += `Content-Disposition: form-data; name="avatar"; filename="avatar.jpg"\r\n`;
          body += `Content-Type: image/jpeg\r\n\r\n`;
          const avatarBuffer = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(avatarBinary));
          const avatarBytes = wx.base64ToArrayBuffer(avatarBuffer);

          // 转换为 ArrayBuffer
          const encoder = new TextEncoder();
          const header = encoder.encode(body);
          const footer = encoder.encode(`\r\n--${boundary}--\r\n`);

          // 合并所有部分
          const combined = new Uint8Array(header.byteLength + avatarBytes.byteLength + footer.byteLength);
          combined.set(new Uint8Array(header.buffer), 0);
          combined.set(new Uint8Array(avatarBytes), header.byteLength);
          combined.set(new Uint8Array(footer.buffer), header.byteLength + avatarBytes.byteLength);

          // 发送 PATCH 请求
          wx.request({
            url: 'http://1.15.174.177/api/user/',
            method: 'PATCH',
            header: {
              'Content-Type': `multipart/form-data; boundary=${boundary}`,
              'Authorization': `Token ${token}`,
            },
            data: combined.buffer,
            success: (res) => {
              if (res.statusCode === 200) {
                wx.showToast({
                  title: '头像上传成功!',
                  icon: 'success',
                  duration: 2000,
                });
                // 更新存储的用户信息
                const user = wx.getStorageSync('user');
                user.avatar = res.data.avatar;
                wx.setStorageSync('user', user);
                resolve();
              } else {
                const errorMsg = Object.values(res.data).flat().join('\n');
                wx.showModal({
                  title: '头像上传失败',
                  content: errorMsg,
                  showCancel: false,
                  confirmText: '确定'
                });
                reject(errorMsg);
              }
            },
            fail: (err) => {
              console.error('头像上传请求失败:', err);
              reject(err);
            }
          });
        },
        fail: (err) => {
          console.error('读取头像文件失败:', err);
          reject(err);
        }
      });
    });
  },
});