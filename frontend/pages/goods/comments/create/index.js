// import { getCommentDetail } from '../../../../services/good/comments/fetchCommentDetail';
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
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
    console.log("Uploaded files:", files); // 打印文件信息，确认是否有 path 属性
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
    const temp = serviceRateValue && goodRateValue && conveyRateValue && textAreaValue;
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

    // 检查是否有上传文件
    if (uploadFiles.length > 0) {
      uploadFiles.forEach(file => {
        wx.uploadFile({
          url: 'http://1.15.174.177/api/comments/upload/',
          filePath: file.url, // 确保这里传递的是本地文件路径
          name: 'images', // 表单名，需和API端一致
          header: {
            'Authorization': 'Token 9c05df89dbc2e281c74827c35a968a98049b1163',
          },
          formData: {
            'dish': 1,
            'comment': this.textAreaValue,
            'rating': this.data.goodRateValue,
          },
          success: function (uploadRes) {
            console.log('上传成功', uploadRes);
            // 处理上传成功后的响应
          },
          fail: function (uploadErr) {
            console.log('上传失败', uploadErr);
            // 处理上传失败
          }
        });
      });
    } else {
      // 如果没有文件，则只上传评论数据
      wx.request({
        url: 'http://1.15.174.177/api/comments/upload/',
        method: 'POST',
        header: {
          'Authorization': 'Token 9c05df89dbc2e281c74827c35a968a98049b1163',
        },
        data: {
          'dish': 1,
          'comment': this.textAreaValue,
          'rating': this.data.goodRateValue,
        },
        success: function (res) {
          console.log('评论上传成功', res);
        },
        fail: function (err) {
          console.log('评论上传失败', err);
        }
      });
    }
  }

});