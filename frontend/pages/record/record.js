// pages/record/record.js
const recorderManager = wx.getRecorderManager();
const options = {
  duration: 60000, // 最长录制 1 分钟
  sampleRate: 44100, // 采样率
  numberOfChannels: 2, // 双声道
  encodeBitRate: 320000, // 比特率
  format: 'mp3' // 文件格式
};

Page({
  data: {
    isRecording: false,
    audioFilePath: '' // 存储录音文件路径
  },

  // 开始录音
  startRecording() {
    this.setData({ isRecording: true });
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('录音开始');
    });
    recorderManager.onError((err) => {
      console.error('录音错误:', err);
      this.setData({ isRecording: false });
    });
  },

  // 停止录音
  stopRecording() {
    this.setData({ isRecording: false });
    recorderManager.stop();
    recorderManager.onStop((res) => {
      console.log('录音结束', res);
      const { tempFilePath } = res; // 获取临时文件路径
      this.setData({ audioFilePath: tempFilePath }); // 更新录音文件路径
      wx.showToast({
        title: '录音完成',
        icon: 'success'
      });
      // 自动上传录音文件
      this.uploadRecording(tempFilePath);
    });
  },

   // 上传录音文件到服务器
   uploadRecording(filePath) {
    wx.uploadFile({
      url: 'https://example.com/upload', // 替换为实际服务器地址
      filePath: filePath,
      name: 'file',
      formData: {
        user: 'test_user' // 可根据需要传递额外参数
      },
      success: (res) => {
        console.log('文件上传成功', res);
        wx.showToast({
          title: '上传成功',
          icon: 'success'
        });
      },
      fail: (err) => {
        console.error('文件上传失败', err);
        wx.showToast({
          title: '上传失败',
          icon: 'none'
        });
      }
    });
  },

  // 播放录音
  playRecording() {
    const { audioFilePath } = this.data;
    if (!audioFilePath) {
      wx.showToast({ title: '没有可播放的录音', icon: 'none' });
      return;
    }
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = audioFilePath;
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放');
    });
    innerAudioContext.onError((err) => {
      console.error('播放错误:', err);
    });
  },
  
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab
    });
  },

  onShow() {
    this.getTabBar().init();
  },

});
