Page({
  data: {
    imageSrc: '', // 接收的图片路径
    options: [], // 动态生成的滑动条选项
    selectedUrl: '', // 存储选中选项的 URL
    buttonActive: false, // 控制按钮激活状态
  },

  onLoad() {
    const eventChannel = this.getOpenerEventChannel();

    // 使用 eventChannel 接收数据
    eventChannel.on('sendWordsData', (data) => {
      const {
        imagePath,
        wordsData = []
      } = data;

      // 检查数据
      if (!Array.isArray(wordsData) || wordsData.length === 0) {
        console.error('No valid wordsData provided!');
        return;
      }

      // 动态创建选项
      const options = wordsData.map((item) => ({
        image: item.imageURL, // 使用每项中的图片URL  
        description: item.name, // 使用每项的名称
        rectangle: item.rectangle,
        ID: item.ID
      }));

      // 更新数据
      this.setData({
        imageSrc: imagePath,
        options: options,
      });
      this.drawImageToCanvas(imagePath);
      console.log('Options set:', this.data.options);
    });
  },
  drawImageToCanvas(imagePath) {
    const query = wx.createSelectorQuery().in(this);
    query.select('#rectCanvas')
      .node()
      .exec((res) => {
        if (!res[0]) {
          console.error('Canvas node not found');
          return;
        }

        const canvas = res[0].node;
        canvas.width = 300; // 设置 Canvas 宽度
        canvas.height = 500; // 设置 Canvas 高度

        const ctx = canvas.getContext('2d');
        const img = canvas.createImage(); // 创建图片对象
        // 计算适应画布的图片尺寸
        // 确保图片完整显示在画布中，且保持图片的宽高比
        let imgWidth = img.width;
        let imgHeight = img.height;

        // ratio = canvas.height / imgHeight

        img.onload = () => {
          console.log('Image loaded successfully:', img.width, img.height);
          ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 绘制图片
        };

        img.onerror = (err) => {
          console.error('Failed to load image:', err);
        };

        console.log('Setting image source to:', imagePath);
        img.src = imagePath; // 设置图片路径
        //this.uploadImage(imagePath)
      });
  },
  onOptionTap(e) {
    const index = e.currentTarget.dataset.index;
    const rect = this.data.options[index].rectangle;

    // 更新选中的矩形数据
    this.setData({
      selectedRect: rect,
      buttonActive: true,
      selectedUrl: "dbio",
    }, () => {
      this.drawRectangle(rect);
    });

    wx.showToast({
      title: `You selected: ${this.data.options[index].description}`,
      icon: 'none',
    });

  },
  onButtonTap() {
    if (this.data.buttonActive) {
      console.log(this.data.selectedUrl)
    }
  },
  drawRectangle(rect) {
    console.log("画长方形了")
    const query = wx.createSelectorQuery().in(this);
    query.select('#rectCanvas')
      .node()
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');

        // 清除画布内容
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log("清除画布");
        //重新绘制图片（ 确保背景恢复到裁剪框绘制前的状态）
        const img = canvas.createImage();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 绘制图片
          //console.log('Image redrawn, ready for the new crop frame.');

          // 绘制实时裁剪框
          ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'; // 半透明红框
          ctx.lineWidth = 2;
          ctx.strokeRect(rect.topLeft.x,
            rect.topLeft.y,
            rect.topRight.x - rect.topLeft.x,
            rect.bottomLeft.y - rect.topLeft.y);
        };
        img.src = this.data.imageSrc; // 确保绘制图片的路径有效
      });

  }
});