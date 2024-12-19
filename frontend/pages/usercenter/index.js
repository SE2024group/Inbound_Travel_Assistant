// /pages/usercenter/index.js

import {
  fetchUserData
} from '../../services/usercenter/fetchUsercenter';

import {
  updateUserPreferences
} from '../../services/usercenter/updateUserPreferences'

Page({
  data: {
    userInfo: {},
    religiousBeliefs: ['None', 'Christianity', 'Islam', 'Hinduism', 'Buddhism', 'Judaism', 'Other'],
    dietaryRestrictions: [], // 从 API 获取的饮食偏好标签
    selectedReligiousBelief: '',
    selectedDietaryPreferences: [], // [{ tag: 'Meat', preference: 'LIKE' }, ...]
    dietaryPreferencesMap: {},
    showDietaryModal: false, // For modal visibility
    isLoadingDietary: false, // 添加加载状态
  },

  // 递归函数重试获取用户数据
  retryFetchUserData(token, maxRetries, attempt = 1) {
    return new Promise((resolve, reject) => {
      fetchUserData(token).then((data) => {
        resolve(data); // 成功获取数据
      }).catch((error) => {
        if (attempt < maxRetries) {
          console.warn(`Attempt ${attempt} failed. Retrying...`);
          // 延迟后重试
          setTimeout(() => {
            this.retryFetchUserData(token, maxRetries, attempt + 1).then(resolve).catch(reject);
          }, 1000); // 1秒延迟（可调整）
        } else {
          reject(`Failed after ${maxRetries} attempts: ${error}`);
        }
      });
    });
  },

  // 辅助函数，用于创建标签偏好映射
  createDietaryPreferencesMap(preferences) {
    const map = {};
    preferences.forEach(pref => {
      map[pref.tag] = pref.preference;
    });
    return map;
  },

  onLoad() {
    const loggedBy = wx.getStorageSync('loggedBy') || '';
    if (!loggedBy) {
      wx.showToast({
        title: 'Login status error.',
        icon: 'error',
      });
      return; // 终止执行，避免后续逻辑出错
    }
    console.log('logged by ', loggedBy);

    // 调用获取饮食偏好的函数
    this.fetchDietaryRestrictions();

    if (loggedBy === 'tourist') {
      const userInfo = {
        name: wx.getStorageSync('userName') || 'Tourist',
        avatar: wx.getStorageSync('avatar') || 'https://cloud.tsinghua.edu.cn/f/9a5d8ec171fa4541a9f4/?dl=1',
        personality_description: wx.getStorageSync('userMotto') || 'Enjoy your journey!',
      };
      this.setData({
        userInfo,
        selectedReligiousBelief: wx.getStorageSync('religiousBelief') || '',
        selectedDietaryPreferences: wx.getStorageSync('dietaryPreferences') || [],
        dietaryPreferencesMap: this.createDietaryPreferencesMap(wx.getStorageSync('dietaryPreferences') || []),
      });
      console.log(this.data.userInfo);
    } else if (loggedBy === 'auth') {
      // Retrieve authToken from local storage
      wx.getStorage({
        key: 'authToken',
        success: (res) => {
          const token = res.data;

          // 使用 authToken 调用 fetchUserData 并传递 token
          this.retryFetchUserData(token, 5).then((data) => {
            this.setData({
              userInfo: data,
              selectedReligiousBelief: data.religious_belief || '',
              selectedDietaryPreferences: data.dietary_preferences || [],
              dietaryPreferencesMap: this.createDietaryPreferencesMap(data.dietary_preferences || []),
            });
            console.log("userinfo", this.data.userInfo);
            // 同步到本地存储
            wx.setStorageSync('religiousBelief', data.religious_belief || '');
            console.log("local religiousBelief", data.religious_belief);
            wx.setStorageSync('dietaryPreferences', data.dietary_preferences || []);
            console.log("local dietaryPreferences", data.dietary_preferences);
          }).catch((error) => {
            wx.showToast({
              title: 'Fail to load user info',
              icon: 'error',
            });
            console.error('Failed to load user data:', error);
          });
        },
        fail: () => {
          wx.showToast({
            title: 'Please login first.',
            icon: 'error',
          });
          // 如果 authToken 未找到，重定向到登录页面
          wx.redirectTo({
            url: '/pages/login/login',
          });
        },
      });
      wx.setStorageSync('registeredAt', this.userInfo.signup_date)
    } else {
      // 处理其他登录方式或错误状态
      wx.showToast({
        title: 'Unknown login method.',
        icon: 'error',
      });
      wx.redirectTo({
        url: '/pages/login/login',
      });
    }

    // 从本地存储加载宗教信仰和饮食偏好（仅适用于未通过 API 登录的情况）
    if (loggedBy !== 'auth') {
      const storedReligiousBelief = '';
      const storedDietaryPreferences = [];
      const dietaryPreferencesMap = this.createDietaryPreferencesMap(storedDietaryPreferences);
      this.setData({
        selectedReligiousBelief: storedReligiousBelief,
        selectedDietaryPreferences: storedDietaryPreferences,
        dietaryPreferencesMap: dietaryPreferencesMap,
      });
    }
  },

  // 获取饮食偏好数据的函数
  fetchDietaryRestrictions() {
    this.setData({
      isLoadingDietary: true
    });
    wx.request({
      url: 'http://1.15.174.177/api/tags/',
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          // 假设 API 返回的数据结构是 [{id, name, name_en}, ...]
          const dietaryTags = res.data.map(tag => tag.name_en); // 提取中文名称
          this.setData({
            dietaryRestrictions: dietaryTags,
            isLoadingDietary: false,
          });
        } else {
          wx.showToast({
            title: 'Failed to load dietary preferences.',
            icon: 'error',
          });
          this.setData({
            isLoadingDietary: false
          });
        }
      },
      fail: (error) => {
        console.error('API 请求失败:', error);
        wx.showToast({
          title: 'Failed to load dietary preferences.',
          icon: 'error',
        });
        this.setData({
          isLoadingDietary: false
        });
      }
    });
  },

  // 处理宗教信仰选择变化
  onReligiousChange(e) {
    const index = e.detail.value;
    const selected = this.data.religiousBeliefs[index];
    this.setData({
      selectedReligiousBelief: selected,
    });
    // 本地存储选择
    wx.setStorageSync('religiousBelief', selected);

    // 调用后端API更新宗教信仰
    updateUserPreferences({
        religious_belief: selected
      })
      .then((data) => {
        wx.showToast({
          title: 'Belief updated.',
          icon: 'success',
        });
        // 更新 userInfo 数据（如果后端返回更新后的用户信息）
        if (data.user) {
          this.setData({
            userInfo: data.user,
          });
          // 同步本地存储
          wx.setStorageSync('religiousBelief', data.user.religious_belief || '');
          wx.setStorageSync('dietaryPreferences', data.user.dietary_preferences || []);
        }
      })
      .catch((error) => {
        console.error('Failed to update religious belief:', error);
        wx.showToast({
          title: error,
          icon: 'none',
        });
      });
  },

  // 打开饮食偏好选择模态框
  openDietaryModal() {
    this.setData({
      showDietaryModal: true,
      // 不再需要 dietarySelections，因为我们直接在 modal 中操作 selectedDietaryPreferences
    });
  },

  // 关闭饮食偏好选择模态框
  closeDietaryModal() {
    this.setData({
      showDietaryModal: false,
    });
  },

  // 处理饮食偏好选择变化
  onPreferenceChange(e) {
    const tag = e.currentTarget.dataset.tag;
    const preference = e.detail.value; // 'LIKE' 或 'DISLIKE'
    let updatedPreferences = [...this.data.selectedDietaryPreferences];

    // 检查是否已经存在该标签的偏好
    const existingIndex = updatedPreferences.findIndex(item => item.tag === tag);
    if (existingIndex !== -1) {
      if (preference === 'OTHER') {
        // 如果选择了 'OTHER'，移除该偏好
        updatedPreferences.splice(existingIndex, 1);
      } else {
        // 更新现有的偏好
        updatedPreferences[existingIndex].preference = preference;
      }
    } else {
      if (preference !== 'OTHER') {
        // 添加新的偏好
        updatedPreferences.push({
          tag: tag,
          preference: preference
        });
      }
    }

    // 更新 dietaryPreferencesMap
    const dietaryPreferencesMap = this.createDietaryPreferencesMap(updatedPreferences);

    this.setData({
      selectedDietaryPreferences: updatedPreferences,
      dietaryPreferencesMap: dietaryPreferencesMap,
    });
    this.saveDietaryPreferences();
  },

  // 检查某个标签是否有特定的偏好
  isPreference(tag, preference) {
    const pref = this.data.selectedDietaryPreferences.find(item => item.tag === tag);
    console.log(tag);
    console.log(pref);
    return pref ? pref.preference === preference : false;
  },

  onSaveDietaryPreferences() {
    this.setData({
      showDietaryModal: false,
    });
    this.saveDietaryPreferences();
  },

  // 保存饮食偏好选择
  saveDietaryPreferences() {
    const preferences = this.data.selectedDietaryPreferences;
    // 本地存储选择
    wx.setStorageSync('dietaryPreferences', preferences);

    // 调用后端API更新饮食偏好
    const payload = {
      dietary_preferences: preferences
    };

    // 假设需要发送 Authorization Token，请确保 token 可用
    const authToken = wx.getStorageSync('authToken') || '';

    wx.request({
      url: 'http://1.15.174.177/api/user/preferences/',
      method: 'PATCH',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`
      },
      data: payload,
      success: (res) => {
        if (res.statusCode === 200) {
          // wx.showToast({
          //   title: 'Dietary preferences updated.',
          //   icon: 'none',
          // });
          // 更新 userInfo 数据（如果后端返回更新后的用户信息）
          if (res.data.user) {
            const newMap = this.createDietaryPreferencesMap(res.data.user.dietary_preferences || []);
            this.setData({
              userInfo: res.data.user,
              dietaryPreferencesMap: newMap,
            });
            console.log('local dietaryPre updated to:', newMap);
            // 同步本地存储
            wx.setStorageSync('religiousBelief', res.data.user.religious_belief || '');
            wx.setStorageSync('dietaryPreferences', res.data.user.dietary_preferences || []);
          }
        } else {
          wx.showToast({
            title: 'Failed to update dietary preferences.',
            icon: 'error',
          });
        }
      },
      fail: (error) => {
        console.error('API 请求失败:', error);
        wx.showToast({
          title: 'Failed to update dietary preferences.',
          icon: 'error',
        });
      }
    });
  },

  // 清除特定标签的偏好
  clearPreferenceItem(e) {
    const tag = e.currentTarget.dataset.tag;
    let updatedPreferences = this.data.selectedDietaryPreferences.filter(item => item.tag !== tag);
    const dietaryPreferencesMap = this.createDietaryPreferencesMap(updatedPreferences);
    this.setData({
      selectedDietaryPreferences: updatedPreferences,
      dietaryPreferencesMap: dietaryPreferencesMap,
    });
    // 更新本地存储
    wx.setStorageSync('dietaryPreferences', updatedPreferences);
    // 发送更新请求
    this.saveDietaryPreferences();
  },

  clearPreference(e) {
    const tag = e.currentTarget.dataset.tag;
    let updatedPreferences = this.data.selectedDietaryPreferences.filter(item => item.tag !== tag);
    const dietaryPreferencesMap = this.createDietaryPreferencesMap(updatedPreferences);
    this.setData({
      selectedDietaryPreferences: updatedPreferences,
      dietaryPreferencesMap: dietaryPreferencesMap,
    });
    // 更新本地存储
    wx.setStorageSync('dietaryPreferences', updatedPreferences);
    // 发送更新请求
    this.saveDietaryPreferences();
  },

  // 导航到设置页面
  goToSetting() {
    wx.navigateTo({
      url: '/pages/setting/index'
    });
  },

  // 导航到我的喜欢页面
  goToLikes() {
    wx.navigateTo({
      url: '/pages/myLikes/index'
    });
  },

  goToComments() {
    console.log("goToComments");
    wx.navigateTo({
      url: '/pages/goods/mycomments/index'
    });
  },

  // 登出账户
  onQuitAccount() {
    const keysToRemove = ['authToken', 'user', 'loggedBy', 'userName', 'registeredAt', 'religiousBelief', 'dietaryPreferences', 'userMotto'];

    const removePromises = keysToRemove.map((key) => {
      return new Promise((resolve, reject) => {
        wx.removeStorage({
          key: key,
          success: () => resolve(key),
          fail: () => reject(key),
        });
      });
    });

    Promise.all(removePromises)
      .then(() => {
        wx.showToast({
          title: 'Logged out successfully',
          icon: 'success'
        });
        wx.redirectTo({
          url: '/pages/login/index'
        });
      })
      .catch((errKey) => {
        wx.showToast({
          title: `Logout failed: ${errKey}`,
          icon: 'error'
        });
      });
  },

  // 清除所有缓存
  onClearCookies() {
    wx.clearStorage({
      success: () => {
        wx.showToast({
          title: 'All caches cleared',
          icon: 'success'
        });
      },
      fail: () => {
        wx.showToast({
          title: 'Failed to clear cache',
          icon: 'error'
        });
      },
    });
  },

  onShow() {
    this.getTabBar().init();
  }
});