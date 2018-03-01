//index.js
//获取应用实例
var app = getApp()
Page({
  //事件处理函数 js
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //页面数据变量设置
  data: {
    userInfo: {},
    infoid: null,
    group: {
     
    },
    mygroup: {
     
    },
    search: {
      searchValue: '',
      showClearBtn: false
    },
    searchResult: [],
    toptabnow: 'toptabnow',
    toptabnow2: '',
    toptabnow3: '',
    myaddrshow: false,
    myaddrshow2: true,
    myaddrshow3: true
  },
  thismygroup: "",
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '邀请新成员'
    })
    console.log(this.data.group.myicon.length);

    var arry = [];
    for (var i = 0; i < this.data.group.myicon.length; ++i) {
      if (this.data.group.myicon[i] == 0) {

        arry = arry.concat(' ')

      } else {
        arry = arry.concat('thismygroup')
      }
    }
    this.setData({
      thismygroup: arry
    })
    console.log(this.data.thismygroup);
  },

  /**
   * 我的个人资料
   */
  /**
   * 编辑个人资料
   */
  myaccount: function (e) {
    wx.navigateTo({
      url: '../account/myaccount?id=1'
    })
  },
  /**
   * 处理消息
   */
  opaddrbox: function (e) {
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: 'opaddrbox?infoid=' + e.currentTarget.id
    })
    // wx.navigateTo({
    //   url: 'opinfo?infoid='+this.data.infoid
    // })
  },


  //输入内容时
  searchActiveChangeinput: function (e) {
    const val = e.detail.value;
    this.setData({
      'search.showClearBtn': val != '' ? true : false,
      'search.searchValue': val
    })
  },
  //点击清除搜索内容
  searchActiveChangeclear: function (e) {
    this.setData({
      'search.showClearBtn': false,
      'search.searchValue': ''
    })
  },
  //点击聚集时
  focusSearch: function () {
    if (this.data.search.searchValue) {
      this.setData({
        'search.showClearBtn': true
      })
    }
  },

  //搜索提交
  searchSubmit: function () {
    const val = this.data.search.searchValue;
    if (val) {
      const that = this,
        app = getApp();
      wx.showToast({
        title: '搜索中',
        icon: 'loading'
      });
      wx.request({
        url: app.globalData.API_URL + 'searchTeam',
        data: {
          keywords: val,
          user_id: app.globalData.myInfo.user_id
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          let searchResult = res.data.data;
          const len = searchResult.length;
          for (let i = 0; i < len; i++) {
            searchResult[i]['team_avator'] = app.globalData.STATIC_SOURCE + searchResult[i]['team_avator'];
          }
          that.setData({
            searchResult: searchResult,
            'search.showClearBtn': false,
          })
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
          wx.hideToast();
        }
      })
    }
  }

})
