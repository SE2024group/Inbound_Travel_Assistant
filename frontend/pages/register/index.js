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
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/navigation/navigation',
              });
            }, 2000);
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
      // 生成一个唯一的边界字符串
      const boundary = '----WebKitFormBoundary' + Math.random().toString(16);

      // 读取头像文件的二进制数据
      wx.getFileSystemManager().readFile({
        filePath: avatarPath,
        encoding: 'binary', // 以二进制方式读取文件
        success: (fileData) => {
          const avatarBinary = fileData.data; // 二进制字符串

          // 将二进制字符串转换为 Uint8Array
          const avatarBytes = new Uint8Array(avatarBinary.length);
          for (let i = 0; i < avatarBinary.length; i++) {
            avatarBytes[i] = avatarBinary.charCodeAt(i);
          }

          // 构建 multipart/form-data 的头部
          let headerString = `--${boundary}\r\n`;
          headerString += `Content-Disposition: form-data; name="avatar"; filename="avatar.jpg"\r\n`;
          headerString += `Content-Type: image/jpeg\r\n\r\n`;
          const encoder = new TextEncoder();
          const header = encoder.encode(headerString);

          // 构建 multipart/form-data 的尾部
          const footer = encoder.encode(`\r\n--${boundary}--\r\n`);

          // 计算总长度并创建一个新的 Uint8Array 来存储完整的请求体
          const totalLength = header.length + avatarBytes.length + footer.length;
          const combined = new Uint8Array(totalLength);
          combined.set(header, 0);
          combined.set(avatarBytes, header.length);
          combined.set(footer, header.length + avatarBytes.length);

          // 发送 PATCH 请求上传头像
          wx.request({
            url: 'http://1.15.174.177/api/user/', // 确保这是正确的上传头像的端点
            method: 'PATCH',
            header: {
              'Content-Type': `multipart/form-data; boundary=${boundary}`,
              'Authorization': `Token ${token}`,
            },
            data: combined.buffer, // 使用 ArrayBuffer 发送数据
            success: (res) => {
              if (res.statusCode === 200) {
                wx.showToast({
                  title: '头像上传成功!',
                  icon: 'success',
                  duration: 2000,
                });
                // 更新存储的用户信息
                const user = wx.getStorageSync('user');
                user.avatar = res.data.avatar; // 根据后端返回的数据结构调整
                wx.setStorageSync('user', user);
                resolve();
              } else {
                // 解析并显示错误信息
                let errorMsg = '未知错误';
                try {
                  const errorData = JSON.parse(res.data);
                  errorMsg = Object.values(errorData).flat().join('\n') || errorMsg;
                } catch (e) {
                  console.error('解析错误响应失败:', e);
                }
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
              wx.showModal({
                title: '头像上传失败',
                content: '网络错误，请稍后再试。',
                showCancel: false,
                confirmText: '确定'
              });
              reject(err);
            }
          });
        },
        fail: (err) => {
          console.error('读取头像文件失败:', err);
          wx.showModal({
            title: '头像上传失败',
            content: '无法读取头像文件，请重试。',
            showCancel: false,
            confirmText: '确定'
          });
          reject(err);
        }
      });
    });
  },
});