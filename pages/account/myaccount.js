var baseurl = "https://test.morpx.com/";
Page({
  data: {
    setgroup1: null,
    setgroup2: null,
    setgroup3: null,
    setgroup4: null,
    setgroup5: null,
    setgroup6: null,
    tagname: [],
    tagid:[],
    logo: null,
    myname:"设置",
    mysex: "设置",
    myjob: "设置",
    myjobname: "设置",
    myage: "设置",
    myphone: "设置",
    myweixin: "设置",
    mylocal: "设置",
    myintro:"设置"
  },
  setimage: function (e) {
    wx.navigateTo({
      url: 'setaccount?id=1',
    })
  },
  setname: function(e){
     wx.navigateTo({
       url: 'setaccount?id=2',
     })
  },
  setsex: function (e) {
    wx.navigateTo({
      url: 'setaccount?id=3',
    })
  },
  setjob: function (e) {
     wx.navigateTo({
       url: 'setaccount?id=4',
     })
  },
  setjobname: function (e) {
    wx.navigateTo({
      url: 'setaccount?id=5',
    })
  },
  setage: function (e) {
    wx.navigateTo({
      url: 'setaccount?id=6',
    })
  },
  setphone: function (e) {
    wx.navigateTo({
      url: 'setaccount?id=7',
    })
  },
  setweixin: function (e) {
    wx.navigateTo({
      url: 'setaccount?id=8',
    })
  },
  setlocal: function (e) {
    wx.navigateTo({
      url: 'setaccount?id=9',
    })
  },
  setmytag: function (e) {
    wx.navigateTo({
      url: 'setaccount?id=10',
    })
  },
  setintro: function (e) {
    wx.navigateTo({
      url: 'setaccount?id=11',
    })
  },
  onLoad: function (options) {
    console.log(options);
    var that = this
    wx.setNavigationBarTitle({
      title: '设置我的名片'
    })
    that.loaduserinfo();
  },
  onShow:function(){
    this.loaduserinfo();
  },
  /**
   * 我的
   */
  loaduserinfo: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;

        /**
         * 个人信息
         */
        wx.request({
          url: baseurl + "user/getUserInfo",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            pageSize: 1000000
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            if(res.data.code==0){
            var tagname = [];
            var tagid = [];
            var user = res.data.data.userInfo;
            if (user.sex == 0) {
              var sex = '未指定';
            } else if (user.sex == 1) {
              var sex = '男';
            } else {
              var sex = '女';
            }
            var generation = '';
            switch (user.generation) {
              case 0:
                generation = "未指定"
                break;
              case 1:
                generation = "40后"
                break;
              case 2:
                generation = "50后"
                break;
              case 3:
                generation = "60后"
                break;
              case 4:
                generation = "70后"
                break;
              case 5:
                generation = "80后"
                break;
              case 6:
                generation = "90后"
                break;
              case 7:
                generation = "00后"
              break;
            }
            if (user.industryList.length == 0) {
              var industryList = '未指定';
            }else{
              var industryList=[];
              for (var t = 0; t < user.industryList.length;++t){
                industryList = industryList.concat(user.industryList[t].name);
              }
            }
            for (var j = 0; j < user.tagList.length;++j){
              tagname = tagname.concat(user.tagList[j].name)
              tagid = tagid.concat(user.tagList[j].id)
            }
            if (user.jobDuty == undefined || user.jobDuty.name == undefined) {
              var jobduty = '';
            } else {
              var jobduty = user.jobDuty.name;
            }
            that.setData({
              userid: user.id,
              logo: user.imageLink,
              myname: user.nickName,
              mysex: sex,
              myjob: industryList,
              myjobname: jobduty,
              myage: generation,
              myphone: user.phone,
              myweixin: user.wechatId,
              myintro: user.note,
              tagname: tagname
            })
            }else{
              wx.showModal({
                title: '加载失败',
                content: res.data.message,
                success: function (res) {
                  if (res.confirm) {

                  } else {

                  }

                }
              })
            }
          },
          fail: function () {
            wx.showToast({
              title: '加载失败',
              icon: 'success',
              duration: 800
            })

          },
          complete: function () {
            setTimeout(function(){
              wx.hideToast();
            },600);
          }
        })
      }
    })
  }

})