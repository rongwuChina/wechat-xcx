//app.js
App({

  // 全局变量
  data:{
    joinshow: true,
    tagchoose: 0,
  },
  goback: function () {
    // console.log('1111')
    wx.navigateBack({
      delta: 1
    })
  },



  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // wx.login({
    //   success: function (log) {
    //     var code = log.code;
    //     Login(code);
    //   }
    //   })

  },

  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (log) {
          var code=log.code;
          /**
            * 展示userinfo
            */
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
            })
          /**
           * 获取token
           */
          wx.getStorage({
            key: "token",
            success: function (res) {
              var token=res.data;
              wx.getSetting({
                success: function(setting){
                  var authSetting = setting.authSetting;                     if(token==undefined){
                    Login(code);
                  }
                },fail: function(){
                  Login(code);
            /**
             * 将获取的微信信息上传到服务器
             */
                  wx.getUserInfo({
                    success: function (res) {
                      that.globalData.userInfo = res.userInfo
                      typeof cb == "function" && cb(that.globalData.userInfo)

                      var users = JSON.parse(res.rawData);

                      var userinfo = {
                        imageLink: users.avatarUrl,
                        nickName: users.nickName,
                        country: users.country,
                        province: users.province,
                        city: users.city,
                        sex: users.gender,
                        fillType: 1
                      }

                      getwechatinfo(userinfo, token)
                    }
                  })
                }
              });

            },
            fail: function (res) {

                console.log('获取用户登录态失败！' + res.errMsg)
              
            }
          })

        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
});
function getwechatinfo(users, token){
  //请求服务器
  wx.request({
    url: "http://test.morpx.com/user/updateUserInfo",
    data: {
      imageLink: users.imageLink,
      nickName: users.nickName,
      country: users.country,
      province: users.province,
      city: users.city,
      sex: users.sex,
      fillType: 1
    },
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'token': token
    }, // 设置请求的 header
    success: function (res) {
      // success
      // console.log(res); 
    }
  })
}
function Login(code) {
  //请求服务器
  wx.request({
    url: "http://test.morpx.com/user/wechatLogin",
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    data:{
      code: code
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }, // 设置请求的 header
    success: function (res) {
      wx.setStorage({
        key: "token",
        data: res.data.data.token
      })
    },
    fail: function () {
      // fail
      // wx.hideToast();
    },
    complete: function () {
      // complete
    }
  })


}