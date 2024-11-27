Page({
  data: {
    imageSrc: '', // 接收的图片路径
    options: [], // 动态生成的滑动条选项
    selectedUrl: '', // 存储选中选项的 URL
    selectedIndex: null, // 当前选中索引
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
        const {
          pixelRatio,
          windowWidth,
          windowHeight
        } = wx.getWindowInfo();
        canvas.width = 300 * pixelRatio;
        canvas.height = 500 * pixelRatio;

        ctx.scale(pixelRatio, pixelRatio); // 按照像素比缩放
        // 计算适应画布的图片尺寸
        // 确保图片完整显示在画布中，且保持图片的宽高比
        let imgWidth = img.width;
        let imgHeight = img.height;

        // ratio = canvas.height / imgHeight

        img.onload = () => {
          // 获取图片的原始宽高
          const imgWidth = img.width;
          const imgHeight = img.height;

          // 获取画布的宽高
          const canvasWidth = canvas.width / pixelRatio;
          const canvasHeight = canvas.height / pixelRatio;

          // 计算缩放因子，确保图片不会超出画布
          const scaleFactor = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);

          // 根据缩放因子计算图片在画布上的宽高
          const drawWidth = imgWidth * scaleFactor;
          const drawHeight = imgHeight * scaleFactor;

          // 计算图片在画布上的居中偏移量
          const offsetX = (canvasWidth - drawWidth) / 2;
          //console.log(offsetX)
          const offsetY = (canvasHeight - drawHeight) / 2;
          console.log(canvasHeight)
          console.log(drawHeight)
          // 清空画布并绘制缩放后的图片
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetX, offsetY, drawWidth, drawHeight);
          //  ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 绘制图片
          //console.log('Image redrawn, ready for the new crop frame.');

          // // 绘制实时裁剪框
          // ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'; // 半透明红框
          // ctx.lineWidth = 2;
          // ctx.strokeRect(this.data.startX, this.data.startY, this.data.cropWidth, this.data.cropHeight);
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
      selectedIndex: index,
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
        const {
          pixelRatio,
          windowWidth,
          windowHeight
        } = wx.getWindowInfo();
        canvas.width = 300 * pixelRatio;
        canvas.height = 500 * pixelRatio;

        ctx.scale(pixelRatio, pixelRatio); // 按照像素比缩放
        img.onload = () => {
          // 图片加载完成后才能获取宽高
          console.log('Image loaded successfully:', img.width, img.height);

          const imgWidth = img.width;
          const imgHeight = img.height;

          const {
            pixelRatio
          } = wx.getWindowInfo();
          const canvasWidth = canvas.width / pixelRatio;
          const canvasHeight = canvas.height / pixelRatio;

          // 计算缩放因子，确保图片不会超出画布
          const scaleFactor = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);

          // 根据缩放因子计算图片在画布上的宽高
          const drawWidth = imgWidth * scaleFactor;
          const drawHeight = imgHeight * scaleFactor;

          // 计算图片在画布上的居中偏移量
          const offsetX = (canvasWidth - drawWidth) / 2;
          const offsetY = (canvasHeight - drawHeight) / 2;

          // 清空画布并绘制缩放后的图片
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetX, offsetY, drawWidth, drawHeight);
          ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'; // 半透明红框
          ctx.lineWidth = 2;
          ctx.strokeRect(rect.topLeft.x * scaleFactor + offsetX,
            rect.topLeft.y * scaleFactor + offsetY,
            rect.topRight.x * scaleFactor - rect.topLeft.x * scaleFactor,
            rect.bottomLeft.y * scaleFactor - rect.topLeft.y * scaleFactor);
        };

        img.onerror = (err) => {
          console.error('Failed to load image:', err);
        };


        // img.onload = () => {
        //   ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 绘制图片
        //   //console.log('Image redrawn, ready for the new crop frame.');

        //   // 绘制实时裁剪框
        //   ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'; // 半透明红框
        //   ctx.lineWidth = 2;
        //   ctx.strokeRect(rect.topLeft.x,
        //     rect.topLeft.y,
        //     rect.topRight.x - rect.topLeft.x,
        //     rect.bottomLeft.y - rect.topLeft.y);
        // };
        img.src = this.data.imageSrc; // 确保绘制图片的路径有效
      });

  }
});