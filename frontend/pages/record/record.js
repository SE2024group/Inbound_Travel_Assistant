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
    isChineseMode: false, // 默认英文模式
    micButtonText: "Hold to Talk", // 麦克风按钮文字
    toggleButtonText: "Switch to Chinese Mode", // 切换按钮文字
    selectedText: "", // 大文本框内容
    clearText: "Clear",
    phrases: [
      { english: "Sorry, could you repeat that?", chinese: "对不起，你能再说一遍吗？" },
      { english: "Where is the restroom?", chinese: "洗手间在哪里？" },
      { english: "Thank you very much!", chinese: "非常感谢！" },
      { english: "Excuse me, can you help me?", chinese: "不好意思，你能帮我吗？" },
      { english: "How much does it cost?", chinese: "这个多少钱？" },
      { english: "Is there Wi-Fi here?", chinese: "这里有WI-FI吗？" },
    ], // 中英文短语对
    cphrases: [
      { english: "Sorry, could you repeat that?", chinese: "对不起，你能再说一遍吗？" },
      { english: "You're welcome.", chinese: "不用谢" },
      { english: "I didn't understand, could you explain it again?", chinese: "我没有理解，请再解释一下" },
      { english: "Sorry, I'm not sure about that.", chinese: "不好意思，我不清楚这个" },

    ], // 中英文短语对
    currentPhrases: [], // 当前显示的短语
  },

  onLoad() {
    this.setData({
      currentPhrases: this.data.phrases.map((phrase) => ({
        text: phrase.english,
      })),
    });
  },

  // 切换语言模式
  toggleLanguage() {
    const isChinese = !this.data.isChineseMode;
    this.setData({
      isChineseMode: isChinese,
      micButtonText: isChinese ? "按住说话" : "Hold to Talk",
      toggleButtonText: isChinese ? "切换到英语模式" : "Switch to Chinese Mode",
      clearText: isChinese ? "清除" : "Clear",
      currentPhrases: isChinese
        ? this.data.cphrases.map((phrase) => ({ text: phrase.chinese }))
        : this.data.phrases.map((phrase) => ({ text: phrase.english })),
    });
  },

  // 显示短语翻译
  showTranslation(e) {
    const index = e.currentTarget.dataset.index;
    const selectedPhrase = this.data.isChineseMode
      ? this.data.cphrases[index].english
      : this.data.phrases[index].chinese;
    this.setData({
      selectedText: selectedPhrase,
    });
  },

  clearText() {
    this.setData({
      selectedText: "", // 清空文本框内容
    });
  },

  // 开始录音
  startRecording() {
    this.setData({
      isPressed: true
    }); // 按下时设置状态
    recorderManager.start(options);
    recorderManager.onStart(() => {});
    recorderManager.onError((err) => {
      console.error('录音错误:', err);
      this.setData({
        isPressed: false
      });
    });
  },

  // 停止录音
  stopRecording() {
    this.setData({
      isPressed: false
    });
    recorderManager.stop();
    recorderManager.onStop((res) => {
      console.log('录音结束', res);
      const {
        tempFilePath
      } = res; // 获取临时文件路径
      this.setData({
        audioFilePath: tempFilePath
      }); // 更新录音文件路径
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
    const {
      audioFilePath
    } = this.data;
    if (!audioFilePath) {
      wx.showToast({
        title: '没有可播放的录音',
        icon: 'none'
      });
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