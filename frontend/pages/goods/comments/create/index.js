// import { getCommentDetail } from '../../../../services/good/comments/fetchCommentDetail';
import Toast from 'tdesign-miniprogram/toast/index';
// import {
//   noneParamsEaseFuncs
// } from 'XrFrame/xrFrameSystem';
Page({
  data: {
    spuId: 1,
    serviceRateValue: 1,
    goodRateValue: 1,
    conveyRateValue: 1,
    isAnonymous: false,
    uploadFiles: [],
    gridConfig: {
      width: 218,
      height: 218,
      column: 3,
    },
    isAllowedSubmit: false,
    imgUrl: '',
    title: '',
    goodsDetail: '',
    imageProps: {
      mode: 'aspectFit',
    },
  },

  onLoad(options) {
    this.setData({
      imgUrl: options.imgUrl,
      title: options.title,
      goodsDetail: options.specs,
      spuId: options.spuId,
    });
  },

  onRateChange(e) {
    const {
      value
    } = e?.detail;
    const item = e?.currentTarget?.dataset?.item;
    this.setData({
      [item]: value
    }, () => {
      this.updateButtonStatus();
    });
  },

  onAnonymousChange(e) {
    const status = !!e?.detail?.checked;
    this.setData({
      isAnonymous: status
    });
  },

  handleSuccess(e) {
    const {
      files
    } = e.detail;
    this.setData({
      uploadFiles: files,
    });
  },

  handleRemove(e) {
    const {
      index
    } = e.detail;

    const {
      uploadFiles
    } = this.data;
    uploadFiles.splice(index, 1);
    this.setData({
      uploadFiles,
    });
  },

  onTextAreaChange(e) {
    const value = e?.detail?.value;
    this.textAreaValue = value;
    this.updateButtonStatus();
  },

  updateButtonStatus() {
    const {
      serviceRateValue,
      goodRateValue,
      conveyRateValue,
      isAllowedSubmit
    } = this.data;
    const {
      textAreaValue
    } = this;
    const authed = (wx.getStorageSync('loggedBy') === 'auth');
    const temp = serviceRateValue && goodRateValue && conveyRateValue && textAreaValue && authed;
    if (temp !== isAllowedSubmit) this.setData({
      isAllowedSubmit: temp
    });
  },

  onSubmitBtnClick() {
    const {
      isAllowedSubmit,
      uploadFiles
    } = this.data;
    if (!isAllowedSubmit) return;

    Toast({
      context: this,
      selector: '#t-toast',
      message: 'Successfully posted your comment',
      icon: 'check-circle',
    });

    wx.navigateBack();
    const authToken = wx.getStorageSync('authToken') || '';
    console.log(authToken);
    // 如果有上传文件
    if (uploadFiles.length > 0) {
      // 将所有文件的路径作为一个数组传递
      const files = uploadFiles.map(file => file.url); // 获取所有文件路径

      // 构建 formData 中的 images 字段，支持多个文件
      const formData = {
        'dish': this.data.spuId,
        'comment': this.textAreaValue,
        'rating': this.data.goodRateValue,
      };


      const uploadPromises = files.map(filePath => {
        console.log(filePath);
        console.log("filePath");
        return new Promise((resolve, reject) => {
          wx.uploadFile({
            url: 'http://1.15.174.177/api/comments/upload/',
            filePath: filePath,
            name: 'images', // 这里的 `name` 要确保和 API 一致
            header: {
              'Authorization': authToken
            },
            formData: formData,
            success: (uploadRes) => {
              console.log('上传成功', uploadRes);
              wx.showModal({
                title: 'note',
                content: 'upload successfully',
                showCancel: false, // 不显示取消按钮
                confirmText: 'confirm', // 确认按钮文字
              });
              resolve(uploadRes);
            },
            fail: (uploadErr) => {
              console.log('上传失败', uploadErr);
              reject(uploadErr);
            }
          });
        });
      });

      // 使用 Promise.all 等待所有文件上传完成
      Promise.all(uploadPromises)
        .then(results => {
          console.log('所有文件上传成功:', results);
          // 处理上传成功后的响应
        })
        .catch(err => {
          console.log('文件上传失败:', err);
          // 处理上传失败
        });

    } else {
      // 如果没有文件，则只上传评论数据
      wx.request({
        url: 'http://1.15.174.177/api/comments/upload/',
        method: 'POST',
        header: {
          'Authorization': authToken,
          'Content-Type': 'application/x-www-form-urlencoded' // 使用 form-urlencoded 格式
        },
        data: {
          'dish': this.data.spuId,
          'comment': this.textAreaValue,
          'rating': this.data.goodRateValue,
        },
        success: function (res) {
          console.log('评论上传成功', res);
          wx.showModal({
            title: 'note',
            content: 'comment uploaded successfully',
            showCancel: false, // 不显示取消按钮
            confirmText: 'confirm', // 确认按钮文字
          });
        },
        fail: function (err) {
          console.log('评论上传失败', err);
          wx.showModal({
            title: 'error',
            content: 'comment upload failed',
            showCancel: false, // 不显示取消按钮
            confirmText: 'confirm', // 确认按钮文字
          });
        }
      });
    }


  }


});