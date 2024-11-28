Page({
  data: {
    imageSrc: '', // 接收的图片路径
    buttonActive: false, // 控制按钮激活状态
    startX: 0, // 开始坐标
    startY: 0,
    cropWidth: 255, // 默认裁剪宽度
    cropHeight: 425,
    isTouching: false, // 是否正在触摸
    isProcessing: false, // 是否正在处理，用于控制按钮状态和加载提示
  },
  stopTouchMove() {
    // 阻止默认滑动行为
    return false;
  },
  onLoad() {
    const eventChannel = this.getOpenerEventChannel();

    // 使用 eventChannel 接收数据
    eventChannel.on('sendWordsData', (data) => {
      const {
        imagePath,
        //wordsData = []
      } = data;

      // // 检查数据
      // if (!Array.isArray(wordsData) || wordsData.length === 0) {
      //   console.error('No valid wordsData provided!');
      //   return;
      // }



      // 更新数据
      this.setData({
        imageSrc: imagePath,
      });
      this.drawImageToCanvas(imagePath);
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
        const {
          pixelRatio,
          windowWidth,
          windowHeight
        } = wx.getWindowInfo();
        // const systemInfo = wx.getSystemInfoSync(); // 获取设备信息
        // const pixelRatio = systemInfo.pixelRatio; // 获取设备像素比

        // 设置高分辨率 Canvas
        canvas.width = 300 * pixelRatio;
        canvas.height = 500 * pixelRatio;

        ctx.scale(pixelRatio, pixelRatio); // 按照像素比缩放

        const img = canvas.createImage(); // 创建图片对象
        // 计算适应画布的图片尺寸
        // 确保图片完整显示在画布中，且保持图片的宽高比
        let imgWidth = img.width;
        let imgHeight = img.height;
        img.src = imagePath; // 设置图片路径
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
          // console.log(canvasHeight)
          // console.log(drawHeight)
          // 清空画布并绘制缩放后的图片
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetX, offsetY, drawWidth, drawHeight);
        };


        img.onerror = (err) => {
          console.error('Failed to load image:', err);
        };

        //console.log('Setting image source to:', imagePath);

        //this.uploadImage(imagePath)
      });
  },
  // 结束触摸
  onTouchEnd(e) {
    //console.log('Touch end');
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
        const {
          pixelRatio,
          windowWidth,
          windowHeight
        } = wx.getWindowInfo();
        // 清除画布内容
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 重新绘制图片（确保背景恢复到裁剪框绘制前的状态）
        const img = canvas.createImage();
        img.src = this.data.imageSrc; // 确保绘制图片的路径有效
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
          // console.log(canvasHeight)
          // console.log(drawHeight)
          // 清空画布并绘制缩放后的图片
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetX, offsetY, drawWidth, drawHeight);
          //  ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 绘制图片
          //console.log('Image redrawn, ready for the new crop frame.');

          // 绘制实时裁剪框
          ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'; // 半透明红框
          ctx.lineWidth = 2;
          ctx.strokeRect(this.data.startX, this.data.startY, this.data.cropWidth, this.data.cropHeight);
        };
        // img.src = this.data.imageSrc; // 确保绘制图片的路径有效
      });

  },

  cropImage() {
    this.setData({
      isProcessing: true
    });
    const query = wx.createSelectorQuery().in(this);
    query.select('#rectCanvas')
      .node()
      .exec((res) => {
        if (!res[0]) {
          console.error('Canvas node not found');
          return;
        }

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const {
          pixelRatio
        } = wx.getWindowInfo();

        // 设置画布大小
        const cropWidth = 300 * pixelRatio;
        const cropHeight = 500 * pixelRatio;

        canvas.width = cropWidth;
        canvas.height = cropHeight;

        const img = canvas.createImage();
        img.src = this.data.imageSrc;

        // 确保图片加载完成后处理
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
          const offsetY = (canvasHeight - drawHeight) / 2;

          // 清空画布并绘制缩放后的图片
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetX, offsetY, drawWidth * pixelRatio, drawHeight * pixelRatio);

          // 在绘制完成后导出图片
          wx.canvasToTempFilePath({
            canvas,
            x: this.data.startX - offsetX,
            y: this.data.startY - offsetY,
            width: this.data.cropWidth,
            height: this.data.cropHeight,
            success: (res) => {
              console.log('Cropped image path:', res.tempFilePath);
              this.displayCroppedImage(res.tempFilePath); // 显示裁剪后的图片
            },
            fail: (err) => {
              console.error('Crop image failed:', err);
            },
          });
        };
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
        //console.log(imagePath)
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const img = canvas.createImage(); // 创建新的图片对象
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
          //ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetX, offsetY, drawWidth, drawHeight);
          ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetX, offsetY, drawWidth, drawHeight);
          // ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetX, offsetY, drawWidth * pixelRatio, drawHeight * pixelRatio);
          // 上传图片
          this.uploadImage(imagePath);
        };

        img.onerror = (err) => {
          console.error('Failed to load image:', err);
        };

        // 设置图片路径，触发加载
        img.src = imagePath;
      });
  },


  // 上传图片并请求OCR
  uploadImage(filePath) {
    const self = this;
    // const testArray = [{
    //     imageURL: filePath, // 子图片地址
    //     name: 'Image 1', // 图片名称
    //     rectangle: {
    //       topLeft: {
    //         x: 50,
    //         y: 50
    //       }, // 长方形左上角
    //       topRight: {
    //         x: 150,
    //         y: 50
    //       }, // 长方形右上角
    //       bottomLeft: {
    //         x: 50,
    //         y: 150
    //       }, // 长方形左下角
    //       bottomRight: {
    //         x: 150,
    //         y: 150
    //       }, // 长方形右下角
    //     },
    //   },
    //   {
    //     imageURL: filePath, // 子图片地址
    //     name: 'Image 2', // 图片名称
    //     rectangle: {
    //       topLeft: {
    //         x: 20,
    //         y: 20
    //       },
    //       topRight: {
    //         x: 30,
    //         y: 20
    //       },
    //       bottomLeft: {
    //         x: 20,
    //         y: 30
    //       },
    //       bottomRight: {
    //         x: 30,
    //         y: 30
    //       },
    //     },
    //   },
    // ];
    // wx.navigateTo({
    //   //url: '/pages/ocrResults/ocrResults',
    //   url: '/pages/ocrResults/ocrResults',
    //   success: (res) => {
    //     res.eventChannel.emit('sendWordsData', {
    //       wordsData: testArray,
    //       imagePath: filePath,
    //     });
    //     console.log(filePath)
    //   },
    // });
    // 读取图片为 Base64
    wx.getFileSystemManager().readFile({
      filePath: filePath,
      encoding: 'base64',
      success(res) {
        const base64Image = res.data;
        // wx.uploadFile({
        //   url: 'http://1.15.174.177/api/ocr/', // 替换为新API地址
        //   filePath: filePath,
        //   name: 'image', // 对应API中的表单字段
        //   // header: {
        //   //   'Content-Type': 'multipart/form-data',

        // wx.request({
        //   // url: 'https://api.ocr.space/parse/image', // OCR.space API 地址
        //   // method: 'POST',
        //   // header: {
        //   //   apikey: 'K82943261788957',
        //   //   'content-type': 'application/x-www-form-urlencoded',

        //   // },
        //   // data: {
        //   //   language: 'chs', // 设置语言
        //   //   isOverlayRequired: 'true', // 请求包含每个词的位置信息
        //   //   base64Image: `data:image/png;base64,${base64Image}`, // 将图片作为 Base64 发送
        //   // },

        //   url: 'https://luckycola.com.cn/tools/fanyi', // OCR.space API 地址
        //   method: 'POST',
        //   header: {
        //     "Content-Type": "application/json", // 设置为 JSON 格式
        //   },
        //   data: {
        //     ColaKey: 'ATafPBqUcSPtfb17320747838599dpYhkAsl6',
        //     text: "索着生活的秘密。花儿一样的年纪，带着对未来的期许，我们喜欢在雨后的长亭或走道静静站立，闭上眼睛感受淡淡的泥土芬芳，风似调皮的孩子带着水汽扑面而来，轻轻扯动那秀丽的长发。一碧如洗的天空，",
        //     fromlang: "ZH", // 原文语言类型
        //     tolang: "EN", // 目标语言类型
        //   },
        wx.uploadFile({

          url: 'http://1.15.174.177/api/ocr/', // 替换为新API地址
          filePath: filePath,
          name: 'image', // 对应API中的表单字段
          header: {
            'Content-Type': 'multipart/form-data',
          },
          success(res) {
            console.log('OCR API Response:', res);

            //if (res.data && res.data.ParsedResults && res.data.ParsedResults.length > 0) {
            if (true) {
              let apiResponse;
              try {
                apiResponse = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
              } catch (error) {
                console.error('Failed to parse API response:', error);
                return; // 解析失败，退出函数
              }

              // // 确保返回的数据结构包含 results
              // if (!apiResponse.results || !Array.isArray(apiResponse.results)) {
              //   console.error('Unexpected API response format:', apiResponse);
              //   return; // 数据格式不符合预期，退出函数
              // }
              console.error(' API response format:', apiResponse)
              // 定义并保存解析结果到 testArray
              const testArray = apiResponse.results.map((item, index) => {
                const topLeft = item.bounding_box.top_left;
                const bottomRight = item.bounding_box.bottom_right;
                const topRight = {
                  x: bottomRight.x,
                  y: topLeft.y
                };
                const bottomLeft = {
                  x: topLeft.x,
                  y: bottomRight.y
                };
                //console.log(bottomLeft)
                return {
                  imageURL: item.image, // 图片地址
                  name: item.linetext, // OCR 识别出的文字
                  rectangle: {
                    topLeft: topLeft,
                    topRight: topRight,
                    bottomLeft: bottomLeft,
                    bottomRight: bottomRight,
                  },
                  ID: index + 1, // 新的 ID，从 1 开始递增

                };
              });
              console.log('Parsed Test Array:', testArray);


              // 提取每个词的五元组
              // const parsedResults = res.data.ParsedResults[0].TextOverlay.Lines || [];
              // const wordsData = [];

              // // parsedResults.forEach((line) => {
              // //   if (line.Words) {
              // //     line.Words.forEach((word) => {
              // //       wordsData.push({
              // //         WordText: word.WordText,
              // //         Left: word.Left,
              // //         Top: word.Top,
              // //         Height: word.Height,
              // //         Width: word.Width,
              // //       });
              // //     });
              // //   }
              // // });

              // console.log('Extracted words data:', wordsData);
              // const testArray = [{
              //     imageURL: filePath, // 子图片地址
              //     name: 'Image 1', // 图片名称
              //     rectangle: {
              //       topLeft: {
              //         x: 50,
              //         y: 50
              //       }, // 长方形左上角
              //       topRight: {
              //         x: 150,
              //         y: 50
              //       }, // 长方形右上角
              //       bottomLeft: {
              //         x: 50,
              //         y: 150
              //       }, // 长方形左下角
              //       bottomRight: {
              //         x: 150,
              //         y: 150
              //       }, // 长方形右下角
              //     },
              //   },
              //   {
              //     imageURL: filePath, // 子图片地址
              //     name: 'Image 2', // 图片名称
              //     rectangle: {
              //       topLeft: {
              //         x: 20,
              //         y: 20
              //       },
              //       topRight: {
              //         x: 30,
              //         y: 20
              //       },
              //       bottomLeft: {
              //         x: 20,
              //         y: 30
              //       },
              //       bottomRight: {
              //         x: 30,
              //         y: 30
              //       },
              //     },
              //   },
              // ];
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
        img.src = this.data.imageSrc; // 确保绘制图片的路径有效
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
        //img.src = this.data.imageSrc; // 确保绘制图片的路径有效
      });

  }
});