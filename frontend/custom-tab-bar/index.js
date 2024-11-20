import TabMenu from './data';
Component({
  data: {
    active: 0,
    list: TabMenu,
  },

  methods: {
    onChange(event) {
      wx.switchTab({
        url: `/${this.data.list[event.detail.value].url}`,
      });
      // this.setData({
      //   active: event.detail.value
      // });

    },

    init() {
      const page = getCurrentPages().pop();
      const route = page ? page.route.split('?')[0] : '';
      const active = this.data.list.findIndex(
        (item) =>
        (item.url.startsWith('/') ? item.url.substr(1) : item.url) ===
        `${route}`,
      );
      this.setData({
        active
      });
    },
  },
});