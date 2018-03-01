// pages/account/aboutus.js
var baseurl = "https://test.morpx.com/";
Page({

  /**
   * 页面的初始数据
   */
  data: {
      content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
      wx.setNavigationBarTitle({
        title: '关于我们'
      })
      this.loadcontent();
  },
  loadcontent: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;

        /**
         * 获取行业列表
         */
        wx.request({
          url: baseurl + "common/aboutUs",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            pageSize: 1000000
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            
            that.setData({
              content: res.data.data.aboutUs,
            })
          },
          fail: function () {

          },
          complete: function () {
            
          }
        })

      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})