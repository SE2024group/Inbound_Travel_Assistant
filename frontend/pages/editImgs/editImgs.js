Page({
  data: {
    imageSrc: '', // 接收的图片路径
    options: [], // 动态生成的滑动条选项
    selectedUrl: '', // 存储选中选项的 URL
    buttonActive: false, // 控制按钮激活状态
    startX: 0, // 开始坐标
    startY: 0,
    cropWidth: 100, // 默认裁剪宽度
    cropHeight: 100,
    isTouching: false, // 是否正在触摸
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
        rectangle: item.rectangle
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
  // 结束触摸
  onTouchEnd(e) {
    console.log('Touch end');
    this.setData({
      isTouching: false, // 重置触摸状态
    });
  },


  // 手指开始触摸
  onTouchStart(e) {
    //console.log("开始触摸")
    this.setData({
      startX: e.touches[0].x,
      startY: e.touches[0].y,
    });
  },

  // 手指拖动调整裁剪区域
  onTouchMove(e) {
    const moveX = e.touches[0].x;
    const moveY = e.touches[0].y;
    // console.log("拖动")
    this.setData({
      cropWidth: Math.abs(moveX - this.data.startX),
      cropHeight: Math.abs(moveY - this.data.startY),
    });
    //console.log("设置好数据了")
    const query = wx.createSelectorQuery().in(this);
    query.select('#rectCanvas')
      .node()
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');

        // 清除画布内容
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 重新绘制图片（确保背景恢复到裁剪框绘制前的状态）
        const img = canvas.createImage();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 绘制图片
          //console.log('Image redrawn, ready for the new crop frame.');

          // 绘制实时裁剪框
          ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'; // 半透明红框
          ctx.lineWidth = 2;
          ctx.strokeRect(this.data.startX, this.data.startY, this.data.cropWidth, this.data.cropHeight);
        };
        img.src = this.data.imageSrc; // 确保绘制图片的路径有效
      });

  },

  cropImage() {
    const query = wx.createSelectorQuery().in(this);
    query.select('#rectCanvas')
      .node()
      .exec((res) => {
        if (!res[0]) {
          console.error('Canvas node not found');
          return;
        }

        const canvas = res[0].node;

        wx.canvasToTempFilePath({
          canvas,
          x: this.data.startX,
          y: this.data.startY,
          width: this.data.cropWidth,
          height: this.data.cropHeight,
          destWidth: this.data.cropWidth,
          destHeight: this.data.cropHeight,
          success: (res) => {
            console.log('Cropped image path:', res.tempFilePath);
            this.displayCroppedImage(res.tempFilePath); // 显示裁剪后的图片
            // console.log(url)
          },
          fail: (err) => {
            console.error('Crop image failed:', err);
          },
        });
      });
  },

  displayCroppedImage(imagePath) {
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
        canvas.height = 300; // 设置 Canvas 高度

        const ctx = canvas.getContext('2d');
        const img = canvas.createImage(); // 创建新的图片对象

        img.onload = () => {
          console.log('Image loaded successfully:', img.width, img.height);
          ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 绘制裁剪后的图片
        };

        img.onerror = (err) => {
          console.error('Failed to load image:', err);
        };

        img.src = imagePath; // 加载裁剪后的图片路径
        this.uploadImage(imagePath)
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
  // 上传图片并请求OCR
  uploadImage(filePath) {
    const self = this;

    // 读取图片为 Base64
    wx.getFileSystemManager().readFile({
      filePath: filePath,
      encoding: 'base64',
      success(res) {
        const base64Image = res.data;

        wx.request({
          url: 'https://api.ocr.space/parse/image', // OCR.space API 地址
          method: 'POST',
          header: {
            apikey: 'K82943261788957',
            'content-type': 'application/x-www-form-urlencoded',
          },
          data: {
            language: 'chs', // 设置语言
            isOverlayRequired: 'true', // 请求包含每个词的位置信息
            base64Image: `data:image/png;base64,${base64Image}`, // 将图片作为 Base64 发送
          },
          success(res) {
            console.log('OCR API Response:', res);

            //if (res.data && res.data.ParsedResults && res.data.ParsedResults.length > 0) {
            if (true) {
              // 提取每个词的五元组
              // const parsedResults = res.data.ParsedResults[0].TextOverlay.Lines || [];
              const wordsData = [];

              // parsedResults.forEach((line) => {
              //   if (line.Words) {
              //     line.Words.forEach((word) => {
              //       wordsData.push({
              //         WordText: word.WordText,
              //         Left: word.Left,
              //         Top: word.Top,
              //         Height: word.Height,
              //         Width: word.Width,
              //       });
              //     });
              //   }
              // });

              console.log('Extracted words data:', wordsData);
              const testArray = [{
                  imageURL: filePath, // 子图片地址
                  name: 'Image 1', // 图片名称
                  rectangle: {
                    topLeft: {
                      x: 50,
                      y: 50
                    }, // 长方形左上角
                    topRight: {
                      x: 150,
                      y: 50
                    }, // 长方形右上角
                    bottomLeft: {
                      x: 50,
                      y: 150
                    }, // 长方形左下角
                    bottomRight: {
                      x: 150,
                      y: 150
                    }, // 长方形右下角
                  },
                },
                {
                  imageURL: filePath, // 子图片地址
                  name: 'Image 2', // 图片名称
                  rectangle: {
                    topLeft: {
                      x: 20,
                      y: 20
                    },
                    topRight: {
                      x: 30,
                      y: 20
                    },
                    bottomLeft: {
                      x: 20,
                      y: 30
                    },
                    bottomRight: {
                      x: 30,
                      y: 30
                    },
                  },
                },
              ];
              // 跳转到新页面，并传递五元组数据
              wx.navigateTo({
                //url: '/pages/ocrResults/ocrResults',
                url: '/pages/ocrResults/ocrResults',
                success: (res) => {
                  res.eventChannel.emit('sendWordsData', {
                    wordsData: testArray,
                    imagePath: filePath,
                  });
                  console.log(filePath)
                },
              });
            } else {
              wx.showToast({
                title: 'OCR failed: No text parsed',
                icon: 'none',
              });
            }
          },
          fail(err) {
            console.error('OCR request failed:', err);
            wx.showToast({
              title: 'OCR request failed',
              icon: 'none',
            });
          },
        });
      },
      fail(err) {
        console.error('Failed to read file as Base64:', err);
        wx.showToast({
          title: 'Failed to process image',
          icon: 'none',
        });
      },
    });
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