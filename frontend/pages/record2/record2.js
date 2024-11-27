// pages/record2/record2.js

const recorderManager = wx.getRecorderManager();
const options = {
  duration: 60000, // 最长录制 1 分钟
  sampleRate: 44100, // 采样率
  numberOfChannels: 2, // 双声道
  encodeBitRate: 320000, // 比特率
  format: 'mp3' // 文件格式
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedText: "", // 初始文本框内容为空
    isPressed: false,
    audioFilePath: '', // 存储录音文件路径
    phrases: [
      { english: "Sorry, could you repeat that?", chinese: "对不起，你能再说一遍吗？" },
      { english: "Where is the restroom?", chinese: "洗手间在哪里？" },
      { english: "Thank you very much!", chinese: "非常感谢！" },
      { english: "Excuse me, can you help me?", chinese: "不好意思，你能帮我吗？" },
      { english: "How much does it cost?", chinese: "这个多少钱？" },
      { english: "I need help, please.", chinese: "请帮帮我。" },
    ],
  },

  onLoad(options) {
    // 接收传递的参数
    const text = decodeURIComponent(options.text || "");
    this.setData({
      selectedText: text, // 设置传递过来的文本框内容
    });
  },

  clearText() {
    this.setData({
      selectedText: "", // 清空文本框内容
    });
  },

  switchToEnglishPage() {
    const currentText = this.data.selectedText; // 获取当前大文本框的内容
    // 跳转到英文页面，并传递参数
    wx.navigateTo({
      url: `/pages/record/record?text=${encodeURIComponent(currentText)}`,
    });
  },

  showTranslation(e) {
    const index = e.currentTarget.dataset.index;
    const selectedPhrase = this.data.phrases[index].english; // 显示英文翻译
    this.setData({
      selectedText: selectedPhrase,
    });
  },

    // 开始录音
    startRecording() {
      this.setData({ isPressed: true }); // 按下时设置状态
      recorderManager.start(options);
      recorderManager.onStart(() => {
      });
      recorderManager.onError((err) => {
        console.error('录音错误:', err);
        this.setData({ isPressed: false }); 
      });
    },
  
    // 停止录音
    stopRecording() {
      this.setData({ isPressed: false }); 
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

})