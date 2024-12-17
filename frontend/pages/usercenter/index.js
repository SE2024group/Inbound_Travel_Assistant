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
    dietaryRestrictions: ['Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-Free', 'Lactose Intolerant', 'Other'],
    selectedReligiousBelief: '',
    selectedDietaryRestrictions: [],
    showDietaryModal: false, // For modal visibility
    dietarySelections: [], // Temporary storage for selections in modal
  },

  // Recursive function to retry fetchUserData
  retryFetchUserData(token, maxRetries, attempt = 1) {
    return new Promise((resolve, reject) => {
      fetchUserData(token).then((data) => {
        resolve(data); // Successfully returned data
      }).catch((error) => {
        if (attempt < maxRetries) {
          console.warn(`Attempt ${attempt} failed. Retrying...`);
          // Retry after a delay
          setTimeout(() => {
            this.retryFetchUserData(token, maxRetries, attempt + 1).then(resolve).catch(reject);
          }, 1000); // 1-second delay (adjustable)
        } else {
          reject(`Failed after ${maxRetries} attempts: ${error}`);
        }
      });
    });
  },

  onLoad() {
    const loggedBy = wx.getStorageSync('loggedBy') || '';
    if (!loggedBy) {
      wx.showToast({
        title: 'Login status error.',
        icon: 'error',
      });
    }
    console.log('logged by ', loggedBy);

    if (loggedBy === 'tourist') {
      const userInfo = {
        name: wx.getStorageSync('userName') || 'Tourist',
        avatar: 'https://cloud.tsinghua.edu.cn/f/9a5d8ec171fa4541a9f4/?dl=1',
        motto: wx.getStorageSync('userMotto') || 'Enjoy your journey!',
      };
      this.setData({
        userInfo
      });
      console.log(this.data.userInfo);
    } else if (loggedBy === 'auth') {
      // Retrieve authToken from local storage
      wx.getStorage({
        key: 'authToken',
        success: (res) => {
          const token = res.data;

          // Use authToken to call fetchUserData and pass the token
          this.retryFetchUserData(token, 5).then((data) => {
            this.setData({
              userInfo: data
            });
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
          // Redirect to login page if authToken is not found
          wx.redirectTo({
            url: '/pages/login/login',
          });
        },
      });
      wx.setStorageSync('registeredAt', this.userInfo.signup_date)
    } else {
      // Handle other login methods or error states
      wx.showToast({
        title: 'Unknown login method.',
        icon: 'error',
      });
      wx.redirectTo({
        url: '/pages/login/login',
      });
    }

    // Load dietary restrictions from local storage
    const storedReligiousBelief = wx.getStorageSync('religiousBelief') || '';
    const storedDietaryRestrictions = wx.getStorageSync('dietaryRestrictions') || [];
    this.setData({
      selectedReligiousBelief: storedReligiousBelief,
      selectedDietaryRestrictions: storedDietaryRestrictions,
    });
  },

  // Handle religious belief selection changes
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
          wx.setStorageSync('dietaryRestrictions', data.user.dietary_restrictions || []);
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


  // Open dietary restrictions selection modal
  openDietaryModal() {
    this.setData({
      showDietaryModal: true,
      dietarySelections: this.data.selectedDietaryRestrictions, // Initialize with current selections
    });
  },

  // Close dietary restrictions selection modal
  closeDietaryModal() {
    this.setData({
      showDietaryModal: false,
    });
  },

  // Handle dietary restrictions checkbox changes
  onDietaryCheckboxChange(e) {
    this.setData({
      dietarySelections: e.detail.value,
    });
  },

  // Save dietary restrictions selections
  saveDietaryRestrictions() {
    const selections = this.data.dietarySelections; // 已移除 'None'
    this.setData({
      selectedDietaryRestrictions: selections,
      showDietaryModal: false,
    });
    // 本地存储选择
    wx.setStorageSync('dietaryRestrictions', selections);

    // 调用后端API更新饮食禁忌
    updateUserPreferences({
        dietary_restrictions: selections
      })
      .then((data) => {
        wx.showToast({
          title: 'Diet updated\.',
          icon: 'success',
        });
        // 更新 userInfo 数据（如果后端返回更新后的用户信息）
        if (data.user) {
          this.setData({
            userInfo: data.user,
          });
          // 同步本地存储
          wx.setStorageSync('religiousBelief', data.user.religious_belief || '');
          wx.setStorageSync('dietaryRestrictions', data.user.dietary_restrictions || []);
        }
      })
      .catch((error) => {
        console.error('Failed to update dietary restrictions:', error);
        wx.showToast({
          title: error,
          icon: 'none',
        });
      });
  },

  // Check if a dietary restriction is selected
  isSelected(item) {
    return this.data.selectedDietaryRestrictions.includes(item);
  },

  // Navigate to Settings page
  goToSetting() {
    wx.navigateTo({
      url: '/pages/setting/index'
    });
  },

  // Logout account
  onQuitAccount() {
    const keysToRemove = ['authToken', 'user', 'loggedBy', 'userName', 'registeredAt', 'religiousBelief', 'dietaryRestrictions', 'userMotto'];

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

  // Clear all cookies/cache
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