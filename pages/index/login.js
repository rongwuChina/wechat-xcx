// pages/index/login.js
var app = getApp()
var maxTime = 60;
var currentTime = maxTime;//倒计时的事件（单位：s）
var interval = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    sendshow: false,
    resendshow: true,
    time: 60,
    codetrue: true,
    logintrue: true,
    phoneNum: null,
    identifyCode:null,
    thiscode: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录',
    })
    var that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据 赋值数据
      
      console.log(userInfo)
      that.setData({
        userInfo: userInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 发送验证码
   */
  SendPhoneNum: function(){
    var that = this;
    that.setData({
      sendshow: true,
      resendshow: false,
    })
  

    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime
      })
      console.log(currentTime);
      if (currentTime <= 0) {
        
        clearInterval(interval)
        currentTime = 60
        that.setData({
          sendshow: false,
          resendshow: true,
          time: 60
        })
      }
    }, 1000)  
      
  },
  input_phoneNum: function (e) {
    var that = this;
    that.setData({
      phoneNum : e.detail.value
    })
    if (that.testphone()){
      that.setData({
        codetrue: false
      }) 
      if (that.data.thiscode){
        that.setData({
          logintrue: false
        })
      }else{
        that.setData({
          logintrue: true
        })
      }
    }else{
      that.setData({
        codetrue: true,
        logintrue: true
      })
    } 
  },
  input_identifyCode: function (e) {
    var that = this;
    that.setData({
      identifyCode: e.detail.value
    })
    if (that.testcode()) {
      that.setData({
        thiscode:true
      })
      if (that.data.codetrue){
        that.setData({
          logintrue: true
        })
      }else{
        that.setData({
          logintrue: false
        })
      }
    } else {
      that.setData({
        thiscode: false,
        logintrue: true
      })
    }
  },  
  testphone: function(e) {
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (myreg.test(that.data.phoneNum)) {
      return true;
    }else {
      return false;
    }
  },
  testcode: function (e) {
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (that.data.identifyCode.length > 3 && that.data.identifyCode.length < 7) {
      return true;
    }else{
      return false;
    }
  },

})
