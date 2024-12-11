import {
  cdnBase
} from '../config/index';
const imgPrefix = cdnBase;

const defaultDesc = [`${imgPrefix}/goods/details-1.png`];

const allGoods = [{
    spuId: '0',
    title: 'Fried rice with egg: rice egg ham etc.',
    primaryImage: 'https://cloud.tsinghua.edu.cn/f/932d725daa7447508a67/?dl=1',
    images: [
      'https://cloud.tsinghua.edu.cn/f/932d725daa7447508a67/?dl=1',
      'https://cloud.tsinghua.edu.cn/f/932d725daa7447508a67/?dl=1'
    ],
    spuTagList: [{
      title: 'salty',
    }, {
      title: 'classic',
    }, ],
  },
  {
    saasId: '88888888',
    storeId: '1000',
    spuId: '135686633',
    title: 'grilled beef',
    primaryImage: 'https://cloud.tsinghua.edu.cn/f/a059122d71fb4c16babf/?dl=1',
    minSalePrice: '25900',
    minLinePrice: '31900',
    maxSalePrice: '26900',
    maxLinePrice: '31900',
    isSoldOut: false,
    images: [
      'https://cloud.tsinghua.edu.cn/f/a059122d71fb4c16babf/?dl=1',
      'https://cloud.tsinghua.edu.cn/f/a059122d71fb4c16babf/?dl=1',
      'https://cloud.tsinghua.edu.cn/f/a059122d71fb4c16babf/?dl=1',
    ],
    groupIdList: ['15029', '14023'],
    spuTagList: [{
      id: null,
      title: 'mainfood',
      image: null,
    }, ],
    skuList: [{
        skuId: '135686634',
        skuImage: null,
        specInfo: [{
            specId: '10000',
            specTitle: null,
            specValueId: '10001',
            specValue: '白色',
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '10003',
            specValue: 'M',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '25900',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '31900',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: -9,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135691631',
        skuImage: null,
        specInfo: [{
            specId: '10000',
            specTitle: null,
            specValueId: '10001',
            specValue: '白色',
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '11003',
            specValue: 'S',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '26900',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '31900',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 177,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135691632',
        skuImage: null,
        specInfo: [{
            specId: '10000',
            specTitle: null,
            specValueId: '10001',
            specValue: '白色',
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '11002',
            specValue: 'L',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '26900',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '31900',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 194,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
    ],
    isAvailable: 1,
    spuStockQuantity: 371,
    soldNum: 1032,
    isPutOnSale: 1,
    specList: [{
        specId: '10000',
        title: '颜色',
        specValueList: [{
          specValueId: '10001',
          specId: '10000',
          saasId: '88888888',
          specValue: '白色',
          image: '',
        }, ],
      },
      {
        specId: '10002',
        title: '尺码',
        specValueList: [{
            specValueId: '11003',
            specId: '10002',
            saasId: '88888888',
            specValue: 'S',
            image: '',
          },
          {
            specValueId: '10003',
            specId: '10002',
            saasId: '88888888',
            specValue: 'M',
            image: '',
          },
          {
            specValueId: '11002',
            specId: '10002',
            saasId: '88888888',
            specValue: 'L',
            image: '',
          },
        ],
      },
    ],
    promotionList: null,
    minProfitPrice: null,
    etitle: '',
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08d.png',
    ],
  },
  {
    saasId: '88888888',
    storeId: '1000',
    spuId: '135691628',
    title: 'soy sauce fried rice',
    images: [
      'https://cloud.tsinghua.edu.cn/f/4eb6df0be3e44390836c/?dl=1',
    ],
    primaryImage: 'https://cloud.tsinghua.edu.cn/f/4eb6df0be3e44390836c/?dl=1',
    minSalePrice: '25900',
    minLinePrice: '39900',
    maxSalePrice: '25900',
    maxLinePrice: '39900',
    isSoldOut: true,
    groupIdList: ['15029', '14023'],
    spuTagList: [{
      id: null,
      title: 'pork',
      image: null,
    }, ],
    skuList: [{
        skuId: '135686631',
        skuImage: null,
        specInfo: [{
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904180768617216',
            specValue: '军绿色',
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904862494014208',
            specValue: 'XS',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '25900',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '39900',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 0,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135686632',
        skuImage: null,
        specInfo: [{
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904180768617216',
            specValue: '军绿色',
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904862007474176',
            specValue: 'M',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '25900',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '39900',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 0,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135691629',
        skuImage: null,
        specInfo: [{
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904180768617216',
            specValue: '军绿色',
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904862175246592',
            specValue: 'S',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '25900',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '39900',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 0,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135691630',
        skuImage: null,
        specInfo: [{
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904180768617216',
            specValue: '军绿色',
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904861755815680',
            specValue: 'L',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '25900',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '39900',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 0,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
    ],
    isAvailable: 1,
    spuStockQuantity: 0,
    soldNum: 1022,
    isPutOnSale: 1,
    specList: [{
        specId: '127904180600844800',
        title: '颜色',
        specValueList: [{
          specValueId: '127904180768617216',
          specId: '127904180600844800',
          saasId: '88888888',
          specValue: '军绿色',
          image: '',
        }, ],
      },
      {
        specId: '127904861604820480',
        title: '尺码',
        specValueList: [{
            specValueId: '127904862494014208',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: 'XS',
            image: '',
          },
          {
            specValueId: '127904862175246592',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: 'S',
            image: '',
          },
          {
            specValueId: '127904862007474176',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: 'M',
            image: '',
          },
          {
            specValueId: '127904861755815680',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: 'L',
            image: '',
          },
        ],
      },
    ],
    promotionList: null,
    minProfitPrice: null,
    etitle: '',
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17d.png',
    ],
  },
  {
    saasId: '88888888',
    storeId: '1000',
    spuId: '135686623',
    title: 'barbecue',
    primaryImage: 'https://cloud.tsinghua.edu.cn/f/1ee5d5d648a5457e8586/?dl=1',
    images: [
      'https://cloud.tsinghua.edu.cn/f/1ee5d5d648a5457e8586/?dl=1',
      'https://cloud.tsinghua.edu.cn/f/1ee5d5d648a5457e8586/?dl=1',
    ],
    minSalePrice: '9900',
    minLinePrice: '16900',
    maxSalePrice: '10900',
    maxLinePrice: '16900',
    isSoldOut: false,
    groupIdList: [
      '15029',
      '15030',
      '14023',
      '127886731843219200',
      '127886732665303040',
      '127886733101511680',
      '127886733923595520',
      '14025',
      '127886726071855616',
      '14026',
      '127886727481142784',
      '127886731440566784',
    ],
    spuTagList: [{
      id: null,
      title: 'spicy',
      image: null,
    }, ],
    skuList: [{
        skuId: '135686624',
        skuImage: null,
        specInfo: [{
            specId: '10000',
            specTitle: null,
            specValueId: '10001',
            specValue: '经典白',
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '10003',
            specValue: '节能套装',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '9900',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '16900',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 98,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135686625',
        skuImage: null,
        specInfo: [{
            specId: '10000',
            specTitle: null,
            specValueId: '11000',
            specValue: '贵族青',
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '11003',
            specValue: '经典套装',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '9900',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '16900',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 100,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135686626',
        skuImage: null,
        specInfo: [{
            specId: '10000',
            specTitle: null,
            specValueId: '11000',
            specValue: '经典白',
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '11002',
            specValue: '尊享礼盒装',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '9900',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '16900',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 100,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135691622',
        skuImage: null,
        specInfo: [{
            specId: '10000',
            specTitle: null,
            specValueId: '10001',
            specValue: '经典白',
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '11003',
            specValue: 'S',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '9900',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '16900',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 100,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135691623',
        skuImage: null,
        specInfo: [{
            specId: '10000',
            specTitle: null,
            specValueId: '10001',
            specValue: '经典白',
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '11002',
            specValue: '尊享礼盒装',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '10900',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '16900',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 100,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135691624',
        skuImage: null,
        specInfo: [{
            specId: '10000',
            specTitle: null,
            specValueId: '11000',
            specValue: '贵族青',
          },
          {
            specId: '10002',
            specTitle: null,
            specValueId: '10003',
            specValue: '节能套装',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '9900',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '16900',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 100,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
    ],
    isAvailable: 1,
    spuStockQuantity: 598,
    soldNum: 102,
    isPutOnSale: 1,
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-3c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-3d.png',
    ],
    specList: [{
        specId: '10000',
        title: '颜色',
        specValueList: [{
            specValueId: '10001',
            specId: '10000',
            saasId: '88888888',
            specValue: '经典白',
            image: '',
          },
          {
            specValueId: '11000',
            specId: '10000',
            saasId: '88888888',
            specValue: '贵族青',
            image: '',
          },
        ],
      },
      {
        specId: '10002',
        title: '尺码',
        specValueList: [{
            specValueId: '11003',
            specId: '10002',
            saasId: '88888888',
            specValue: '经典套装',
            image: '',
          },
          {
            specValueId: '10003',
            specId: '10002',
            saasId: '88888888',
            specValue: '节能套装',
            image: '',
          },
          {
            specValueId: '11002',
            specId: '10002',
            saasId: '88888888',
            specValue: '尊享礼盒装',
            image: '',
          },
        ],
      },
    ],
    promotionList: null,
    minProfitPrice: null,
    etitle: '',
  },
  {
    saasId: '88888888',
    storeId: '1000',
    spuId: '135681628',
    title: 'meigan cai cooked with pork',
    primaryImage: 'https://cloud.tsinghua.edu.cn/f/baa9f9f673184fdfbb2e/?dl=1',
    images: [
      'https://cloud.tsinghua.edu.cn/f/baa9f9f673184fdfbb2e/?dl=1',
      'https://cloud.tsinghua.edu.cn/f/baa9f9f673184fdfbb2e/?dl=1',
    ],
    minSalePrice: '29900',
    minLinePrice: '39900',
    maxSalePrice: '39900',
    maxLinePrice: '39900',
    isSoldOut: false,
    groupIdList: [
      '14023',
      '127886732245873408',
      '127886733487386880',
      '14025',
      '127886726071855616',
      '14026',
      '127886728420666112',
      '127886728957538048',
      '127886729779621888',
      '127886730165497088',
      '127886730652037376',
      '127886731037912576',
      '127886731440566784',
      '127886729360190464',
      '15029',
      '15030',
    ],
    spuTagList: [{
      id: null,
      title: 'hot',
      image: null,
    }, ],
    skuList: [{
        skuId: '135676629',
        skuImage: null,
        specInfo: [{
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904181322265856',
            specValue: '浅灰色',
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904862175246592',
            specValue: 'S',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '29900',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '39900',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 80,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135676630',
        skuImage: null,
        specInfo: [{
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904181322265856',
            specValue: '浅灰色',
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904861755815680',
            specValue: 'L',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '39900',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '39900',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 122,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135681629',
        skuImage: null,
        specInfo: [{
            specId: '127904180600844800',
            specTitle: null,
            specValueId: '127904181322265856',
            specValue: '浅灰色',
          },
          {
            specId: '127904861604820480',
            specTitle: null,
            specValueId: '127904862007474176',
            specValue: 'M',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '39900',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '39900',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 119,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
    ],
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3d.png',
    ],
    isAvailable: 1,
    spuStockQuantity: 321,
    soldNum: 102,
    isPutOnSale: 1,
    specList: [{
        specId: '127904180600844800',
        title: '颜色',
        specValueList: [{
          specValueId: '127904181322265856',
          specId: '127904180600844800',
          saasId: '88888888',
          specValue: '浅灰色',
          image: '',
        }, ],
      },
      {
        specId: '127904861604820480',
        title: '尺码',
        specValueList: [{
            specValueId: '127904862175246592',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: 'S',
            image: '',
          },
          {
            specValueId: '127904862007474176',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: 'M',
            image: '',
          },
          {
            specValueId: '127904861755815680',
            specId: '127904861604820480',
            saasId: '88888888',
            specValue: 'L',
            image: '',
          },
        ],
      },
    ],
    promotionList: null,
    minProfitPrice: null,
    etitle: '',
  },
  {
    saasId: '88888888',
    storeId: '1000',
    spuId: '135681626',
    title: 'white cut chicken',
    primaryImage: 'https://cloud.tsinghua.edu.cn/f/699e94b18091454db7a8/?dl=1',
    images: [
      'https://cloud.tsinghua.edu.cn/f/699e94b18091454db7a8/?dl=1',
      'https://cloud.tsinghua.edu.cn/f/699e94b18091454db7a8/?dl=1',
      'https://cloud.tsinghua.edu.cn/f/699e94b18091454db7a8/?dl=1',
    ],
    minSalePrice: '29000',
    minLinePrice: '40000',
    maxSalePrice: '39000',
    maxLinePrice: '40000',
    isSoldOut: false,
    groupIdList: [
      '15029',
      '15030',
      '14023',
      '127886732245873408',
      '127886733487386880',
      '14025',
      '127886726071855616',
      '14026',
      '127886728420666112',
      '127886728957538048',
      '127886730652037376',
      '127886731037912576',
    ],
    spuTagList: [{
      id: null,
      title: 'cold',
      image: null,
    }, ],
    skuList: [{
        skuId: '135676627',
        skuImage: null,
        specInfo: [{
            specId: '10006',
            specTitle: null,
            specValueId: '10007',
            specValue: '黑色',
          },
          {
            specId: '11007',
            specTitle: null,
            specValueId: '10009',
            specValue: '简约款',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '29000',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '40000',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 123,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135676628',
        skuImage: null,
        specInfo: [{
            specId: '10006',
            specTitle: null,
            specValueId: '10007',
            specValue: '黑色',
          },
          {
            specId: '11007',
            specTitle: null,
            specValueId: '10008',
            specValue: '礼盒装',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '39000',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '40000',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 123,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
      {
        skuId: '135681627',
        skuImage: null,
        specInfo: [{
            specId: '10006',
            specTitle: null,
            specValueId: '10007',
            specValue: '黑色',
          },
          {
            specId: '11007',
            specTitle: null,
            specValueId: '11008',
            specValue: '带充电线简约款',
          },
        ],
        priceInfo: [{
            priceType: 1,
            price: '39000',
            priceTypeName: '销售价格',
          },
          {
            priceType: 2,
            price: '40000',
            priceTypeName: '划线价格',
          },
        ],
        stockInfo: {
          stockQuantity: 120,
          safeStockQuantity: 0,
          soldQuantity: 0,
        },
        weight: null,
        volume: null,
        profitPrice: null,
      },
    ],
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2d.png',
    ],
    isAvailable: 1,
    spuStockQuantity: 366,
    soldNum: 102,
    isPutOnSale: 1,
    specList: [{
        specId: '10006',
        title: '颜色',
        specValueList: [{
          specValueId: '10007',
          specId: '10006',
          saasId: '88888888',
          specValue: '黑色',
          image: '',
        }, ],
      },
      {
        specId: '11007',
        title: '类型',
        specValueList: [{
            specValueId: '10009',
            specId: '11007',
            saasId: '88888888',
            specValue: '简约款',
            image: '',
          },
          {
            specValueId: '11008',
            specId: '11007',
            saasId: '88888888',
            specValue: '带充电线简约款',
            image: '',
          },
          {
            specValueId: '10008',
            specId: '11007',
            saasId: '88888888',
            specValue: '礼盒款',
            image: '',
          },
        ],
      },
    ],
    promotionList: null,
    minProfitPrice: null,
    etitle: '',
  },
];

/**
 * @param {string} id
 * @param {number} [available] 库存, 默认1
 */
// export function genGood(id, available = 1) {
//   const specID = ['135681624', '135681628'];
//   if (specID.indexOf(id) > -1) {
//     return allGoods.filter((good) => good.spuId === id)[0];
//   }
//   const item = allGoods[id % allGoods.length];
//   return {
//     ...item,
//     spuId: `${id}`,
//     // available: available,
//     // desc: item?.desc || defaultDesc,
//     images: item?.images || [item?.primaryImage],
//   };
// }
function fetchWithTimeout(url, options = {}, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('请求超时'));
    }, timeout);

    wx.request({
      url,
      method: options.method || 'GET',
      data: options.data || {},
      header: options.header || {},
      success: (response) => {
        clearTimeout(timer);
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve(response.data);
        } else {
          reject(new Error(`HTTP error! status: ${response.statusCode}`));
        }
      },
      fail: (error) => {
        clearTimeout(timer);
        reject(error);
      }
    });
  });
}



export function genGood(id, available = 1) {

  id = 1 + id % 15;
  return new Promise((resolve, reject) => {
    fetchWithTimeout(`http://1.15.174.177/api/dish/${id}/`)
      .then(response => {
        return response; // 直接返回响应
      })
      .then(apiData => {
        // 进行转换
        // console.log("成功获取数据:", apiData); // 输出获取的数据
        const transformedData = {
          spuId: String(apiData.id),
          title: apiData.name_en,
          description: apiData.description_en,
          primaryImage: "https://cloud.tsinghua.edu.cn/f/699e94b18091454db7a8/?dl=1",
          // primaryImage: apiData.images[0].image_url,
          images: apiData.images.map(image => image.image_url),
          spuTagList: apiData.tags.map(tag => ({
            title: tag.name_en
          }))
        };
        // console.log("转换完成");
        // console.log(transformedData); // 输出转换后的结果

        // 解析 Promise，返回 transformedData
        resolve({
          ...transformedData,
          spuId: `${id}`,
          images: [transformedData?.primaryImage],
        });
      })
      .catch(error => {

        console.error('Error fetching data:', error);
        reject(error); // 拒绝 Promise，返回错误
      });
  });
}