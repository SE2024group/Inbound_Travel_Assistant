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
    placeholderText: "Please enter text",
    sendButtonText: "Send",
    isInputFocused: false,
    phrases: [{
        english: "Sorry, could you repeat that?",
        chinese: "对不起，你能再说一遍吗？"
      },
      {
        english: "Where is the restroom?",
        chinese: "洗手间在哪里？"
      },
      {
        english: "Thank you very much!",
        chinese: "非常感谢！"
      },
      {
        english: "Excuse me, can you help me?",
        chinese: "不好意思，你能帮我吗？"
      },
      {
        english: "How much does it cost?",
        chinese: "这个多少钱？"
      },
      {
        english: "Is there Wi-Fi here?",
        chinese: "这里有WI-FI吗？"
      },
    ], // 中英文短语对
    cphrases: [{
        english: "Sorry, could you repeat that?",
        chinese: "对不起，你能再说一遍吗？"
      },
      {
        english: "You're welcome.",
        chinese: "不用谢"
      },
      {
        english: "I didn't understand, could you explain it again?",
        chinese: "我没有理解，请再解释一下"
      },
      {
        english: "Sorry, I'm not sure about that.",
        chinese: "不好意思，我不清楚这个"
      },
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
      placeholderText: isChinese ? "请输入文字" : "Please enter text",
      sendButtonText: isChinese ? "发送" : "Send",
      currentPhrases: isChinese ?
        this.data.cphrases.map((phrase) => ({
          text: phrase.chinese
        })) : this.data.phrases.map((phrase) => ({
          text: phrase.english
        })),
    });
  },

  // 显示短语翻译
  showTranslation(e) {
    const index = e.currentTarget.dataset.index;
    const selectedPhrase = this.data.isChineseMode ?
      this.data.cphrases[index].english :
      this.data.phrases[index].chinese;
    this.setData({
      selectedText: selectedPhrase,
    });
  },

  sendText: function () {
    // 获取文本框中的文本
    const textToUpload = this.data.selectedText;
    console.log("发送的文本：", textToUpload);

    // 构建请求参数
    const formData = {
      text: textToUpload,
      isChineseMode: this.data.isChineseMode
    };

    // 发送请求到服务器
    wx.request({
      url: 'http://1.15.174.177/api/voice-translation/', // 替换为实际服务器地址
      method: 'POST',
      data: formData,
      header: {
        'Content-Type': 'application/json' // 根据服务器要求设置
      },
      success: (res) => {
        console.log('文本发送成功', res);
        wx.showToast({
          title: '发送成功',
          icon: 'success'
        });
        // 处理服务器返回的数据
        this.handleServerResponse(res.data);
      },
      fail: (err) => {
        console.error('文本发送失败', err);
        wx.showToast({
          title: '发送失败',
          icon: 'none'
        });
      }
    });
  },

  clearText() {
    this.setData({
      selectedText: "", // 清空文本框内容
    });
  },

  // 处理输入框的输入事件
  onInputChange: function (event) {
    this.setData({
      selectedText: event.detail.value // 更新输入框内容
    });
  },

  // 你可以选择在点击文本框时自动聚焦
  focusInput: function () {
    this.setData({
      isInputFocused: true
    });
  },

  // 你可以选择在点击外部区域时取消聚焦
  blurInput: function () {
    this.setData({
      isInputFocused: false
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
        audioFilePath: tempFilePath,
      }); // 更新录音文件路径
      wx.showToast({
        title: '录音完成',
        icon: 'success'
      });
      // 上传录音文件
      this.uploadRecording(tempFilePath);
    });
  },

  // 上传录音文件到服务器
  uploadRecording: function(filePath) { // 明确使用 function 关键字
    console.log('上传录音文件，isChineseMode:', this.data.isChineseMode);
    
    wx.uploadFile({
      url: 'http://1.15.174.177/api/voice-translation/', // 替换为实际服务器地址
      filePath: filePath,
      name: 'voice_file',
      formData: {
        'isChineseMode': this.data.isChineseMode.toString(), // 确保发送的是字符串 'true' 或 'false'
      },
      success: (res) => {
        console.log('文件上传成功', res);
        wx.showToast({
          title: '上传成功',
          icon: 'success'
        });
        // 处理服务器返回的数据
        this.handleServerResponse(res.data);
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

  // 处理服务器返回的数据
  handleServerResponse: function(data) {
    // 假设服务器返回的数据是 JSON 格式
    try {
      const response = JSON.parse(data);
      console.log('response', response);

      if (response.code === 200) {
        const { cn_text, en_text, isChineseMode } = response.data;
        const textToDisplay = isChineseMode ? cn_text : en_text;
        
        console.log('显示的文本:', textToDisplay);

        this.setData({
          selectedText: textToDisplay
        });
      } else {
        console.error('服务器返回错误代码:', response.code, '消息:', response.message);
        wx.showToast({
          title: `error: ${response.message}`,
          icon: 'none'
        });
      }
    } catch (error) {
      console.error('解析服务器响应失败', error);
      wx.showToast({
        title: '解析响应失败',
        icon: 'none'
      });
    }
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