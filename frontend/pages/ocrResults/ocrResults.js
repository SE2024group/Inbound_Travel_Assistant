Page({
  data: {
    imageSrc: 'https://cloud.tsinghua.edu.cn/f/932d725daa7447508a67/?dl=1',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], // 滑动选项
  },

  onOptionTap(e) {
    const index = e.currentTarget.dataset.index;
    wx.showToast({
      title: `You selected: ${this.data.options[index]}`,
      icon: 'none',
    });
  },
});