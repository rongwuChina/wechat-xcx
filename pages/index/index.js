//index.js
//获取应用实例
var app = getApp();
var that = this;
var maxTime = 60;
var currentTime = maxTime;//倒计时的事件（单位：s）
var interval = null;
var token = null;
var baseurl = "https://test.morpx.com/";
Page({ 
  //事件处理函数 js
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //页面数据变量设置
  data: {
    /**
     * login
     * 
     * 
     */
    /**
     * 分页 start
     */
    numb: 1,
    nextpage: false,
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
    /**
     * 分页 end
     */
    sendshow: false,
    resendshow: true,
    time: 60,
    codetrue: true,
    logintrue: true,
    logincolor: "",
    phoneNum: null,
    verifyCode: null,
    thiscode: false,
    indexshow: true,
    loginshow: true,
    joinid:null,
    groupitem:null,
    /**
     * 选择群标签
     */
    tagid: '',
    userInfo: {},
    toptab1: "发现群",
    toptab2: "我的群",
    tagshow: true,
    toptabnow: "toptabnow",
    toptabnow2: "",
    tagname: {
      tagname: [],
      tagid: []
    },
    group: {
    },
    mygroup: {
    },
    allgroupwhow: false,
    mygroupshow: true,
    bottomnow1: "bottomnow",
    bottomnow2: "",
    tap: ["群", "我的"],
    joinmsg: "申请加群",
    thejoinmsg: "",
    joinshow: true,
    joinbtn1: "取消",
    joinbtn2: "申请",
    myownshow: true,
    /**
     * 我的
     */
    isneedhelp: null,
    userimage: null,
    username: null,
    usersex: null,
    usertable: null,
    useraddr: null,
    userarea: null,
    userage: null,
    userphone: null,
    userweixin: null,
    userintro: null,
    usertag: [],
    myinfonum: null,
    current: 0,
    dotnow1: 'dotnow',
    dotnow2: null,
    userInfo2:null
  },
  thismygroup: null,
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onLoad: function () {
    var that=this;

    wx.login({
      success: function (log) {
         
        var code = log.code;
        //调用应用实例的方法获取全局数据
        wx.getUserInfo({
          success: function (res) {
            console.log(res.userInfo);
          //更新数据 赋值数据
          that.setData({
            userInfo2: res.userInfo
          })
        }
        })
       
        //请求服务器
        wx.request({
          url: baseurl + "user/wechatLogin",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
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
            console.log(res.data.data);
            // success
            if (res.data.data.bindPhoneStatus == 0) {
              that.setData({
                indexshow: true,
                loginshow: false,
                logincolor: "logincolor",
                allgroupshow:true,
              })
              wx.setNavigationBarTitle({
                title: '登录搭贤',
              })
             
            } else {
              that.setData({
                indexshow: false,
                loginshow: true,
              })
              wx.setNavigationBarTitle({
                title: '搭贤'
              })
              /**
              * 发现群
              */
              that.loadgroup(1);
              /**
               * 群标签
               */
              that.loadgrouptag();
            }
            
          },
          fail: function () {
            // fail
            // con.
          }
        })
      }
    })
    try {
      var res = wx.getSystemInfoSync()
      var windowheight = res.windowHeight;
      var winwidth = res.windowWidth;
      this.setData({
        winheight: windowheight-140 + "px",
        winwidth: winwidth-30+"px"
      })
    } catch (e) {
      console.log(e);
    }

    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });

    
  },
  onShow: function () {
    var that=this;
    wx.login({
      success: function (log) {

        var code = log.code;
        //调用应用实例的方法获取全局数据
        wx.getUserInfo({
          success: function (res) {
            console.log(res.userInfo);
            //更新数据 赋值数据
            that.setData({
              userInfo2: res.userInfo
            })
          }
        })

        //请求服务器
        wx.request({
          url: baseurl + "user/wechatLogin",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
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

            // success
            if (res.data.data.bindPhoneStatus == 0) {
              that.setData({
                indexshow: true,
                loginshow: false,
                logincolor: "logincolor",
                allgroupshow: true,
              })
              wx.setNavigationBarTitle({
                title: '登录搭贤',
              })

            } else {
              that.setData({
                indexshow: false,
                loginshow: true,
              })
              wx.setNavigationBarTitle({
                title: '搭贤'
              })
              /**
              * 发现群
              */
              that.loadgroup(1);
              /**
               * 群标签
               */
              that.loadgrouptag();
              /**
               * 我的
               */
              that.loaduserinfo();
            }

          },
          fail: function () {
            // fail
            // con.
          }
        })
      }
    })
    
  },
  toptapfunc: function (e) {
    this.setData({
      toptabnow: "toptabnow",
      toptabnow2: "",

      othergroup: false,
      mygroupshow: true,
    })
    this.setData({
      tagid: ''
    })
    this.loadgroup(1);
  },
  toptagfunc: function (e) {
    this.setData({
      tagshow: this.data.tagshow == false ? true : false,

      bottomnow1: "bottomnow",
      bottomnow2: ""
    })
  },
  topdefault: function (e) {
    this.setData({
      tagshow: this.data.tagshow == false ? true : false,
    })
  },
  toptapfunc2: function (e) {
    this.setData({
      tagshow2: this.data.toptabnow2 == "toptabnow" ? true : true,
      toptabnow2: this.data.toptabnow2 == "toptabnow" ? "toptabnow" : "toptabnow",
      toptabnow: this.data.toptabnow2 == "toptabnow" ? "" : "",
      tagshow: this.data.toptabnow2 == "toptabnow" ? true : true,
      mygroupshow: false,
      othergroup: true
    })

    /**
     * 我的群
     */
    this.loadmygroup();

  },
  tagchoose: function (e) {
    this.setData({
      tagshow: this.data.tagshow == false ? true : false,
      group: this.data.group,
      othergroup: false,
      mygroupshow: true,
      toptabnow: "toptabnow",
      toptabnow2: "",
    })
    this.setData({
      tagid: e.currentTarget.id
    })
    this.loadgroup(1);
  },
  addgroup: function (e) {
    wx.navigateTo({
      url: '../addgroup/addgroup'
    })
  },
  joingroup: function (id) {

    this.setData({
      joinshow: this.data.joinshow == false ? true : false,
      joinid: id
    })
  },
  funcname3: function (e) {
    this.setData({
      groupitem: e.currentTarget.id
    })
    return this.joingroup(this.data.group.groupid[e.currentTarget.id])
  },
  funcname0: function () {
    wx.showToast({
      title: '申请中...',
      icon: 'loading',
      duration: 1000
    })
  },
  joinsubmit: function (e) {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {

        var token = res.data;
        var data = {
          id: that.data.joinid,
          content: e.detail.value.joingroupmsg
        }
        wx.request({
          url: baseurl + "group/joinGroup",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: data,
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            if (res.data.code == 0) {
              wx.showToast({
                title: '申请已发出',
                icon: 'success',
                duration: 800
              })
              var grouptype = 'group.grouptag['+that.data.groupitem+']';
              if (res.data.data.currentUserJoinStatus==0){
              
                  that.setData({
                      [grouptype]:"申请中"
                    
                  })
              }
              else if (res.data.data.currentUserJoinStatus == -1){
                that.setData({
                    [grouptype]: "已加入群"
                  
                })
              }
              //that.loadgroup(1);
             
            } else {
              wx.showModal({
                title: '申请失败',
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
              title: '申请失败',
              icon: 'success',
              duration: 800
            })

          },
          complete: function () {

          }
        })
      }
    })
    this.setData({
      joinshow:  true,
      thejoinmsg: ""
    })
  },
  joinreset: function (e) {

    this.setData({
      joinshow: this.data.joinshow == true ? false : true,
      thejoinmsg: ""
    })
  },
  bottomtab1: function (e) {
    this.setData({
      allgroupshow: false,
      mygroupshow: true,
      bottomnow1: "bottomnow",
      bottomnow2: "",
      tagshow: true,
      toptabnow: "toptabnow",
      toptabnow2: "",
      mygroupshow: true,
      othergroup: false,
      myownshow: true
    })
    wx.setNavigationBarTitle({
      title: '搭贤'
    })


  },
  bottomtab2: function (e) {
    this.setData({
      allgroupshow: true,
      myownshow: false,
      bottomnow2: "bottomnow",
      bottomnow1: ""
    })
    wx.setNavigationBarTitle({
      title: '我的'
    })
    this.loaduserinfo();
  },
  /**
   * 群动态
   * 群成员
   * 群通讯录
   * 发动态
   */
  groupdetail: function (res) {
    var id = res.currentTarget.id;
    wx.navigateTo({
      url: '../group/groupdetail?groupid=' + id,
    })
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
 * 我的动态
 */
  mydynamic: function (e) {
    wx.navigateTo({
      url: '../account/mydynamic?id=' + this.data.userid
    })
  },
  /**
 * 我的消息
 */
  myinfo: function (e) {
    wx.navigateTo({
      url: '../account/myinfo?id=' + this.data.userid
    })
  },
  /**
 * 我的通讯录
 */
  myaddrbook: function (e) {
    wx.navigateTo({
      url: '../account/myaddrbox?id=' + this.data.userid
    })
  },
  /**
 * 我的通讯录圈
 */
  myaddrcircle: function (e) {
    wx.navigateTo({
      url: '../account/myaddrcircle?id=' + this.data.userid
    })
  },
  /**
 * 收藏
 */
  mycollect: function (e) {
    wx.navigateTo({
      url: '../account/mycollect?id=' + this.data.userid
    })
  },
  /**
   * 成为vip
   */
  myvip: function (e) {
    wx.showToast({
      title: '正在开发...',
      icon: 'loading',
      duration: 1000
    })
  },
  /**
   * 关于我们
   */
  myaboutus: function (e) {
    wx.navigateTo({
      url: '../account/aboutus'
    })
  },
  /**
   * swiper
   */
  swiperChange: function (e) {
    if (e.detail.current == 0) {
      this.setData({
        "dotnow1": "dotnow",
        "dotnow2": ""
      })
    } else {
      this.setData({
        "dotnow1": "",
        "dotnow2": "dotnow"
      })
    }
  },
  opinfo: function (e) {
    var that=this;
    
    var item = e.currentTarget.id

    var infoid = ''
    var infotype = 2333
    var usertype = that.data.group.groupstatus[item]
    var url = that.data.group.url[item]
    var name = that.data.group.groupname[item]
    var groupinfo = that.data.group.groupinfo[item]
    var groupintro = that.data.group.groupintro[item]
    var infocontent = that.data.group.groupintro[item]
    var inforstatus = ''
    var groupid = that.data.group.groupid[item]

    wx.navigateTo({
      url: '../account/opinfo?infoid=' + infoid + '&infotype=' + infotype + '&usertype=' + usertype + '&url='+ url + '&name=' + name + '&groupinfo=' + groupinfo + '&groupintro=' + groupintro + '&infocontent=' + infocontent + '&inforstatus=' + inforstatus+"&groupid="+groupid
    })
  },
  input_phoneNum: function (e) {
    
    var that = this;
    that.setData({
      phoneNum: e.detail.value
    })
    if (that.testphone()) {
      that.setData({
        codetrue: false
      })
      if (that.data.thiscode) {
        that.setData({
          logintrue: false
        })
      } else {
        that.setData({
          logintrue: true
        })
      }
    } else {
      that.setData({
        codetrue: true,
        logintrue: true
      })
    }
  },
  /**
* 发送验证码
*/
  SendPhoneNum: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
       var token = res.data;
       
        /**
         * 发送接口
         */
        wx.request({
          url: baseurl + "user/getVerifyCode",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            phone: that.data.phoneNum
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
           
            if(res.data.code==0){
              /**
               * 发送倒计时
               */
              that.setData({
                sendshow: true,
                resendshow: false,
              })
              interval = setInterval(function () {
                currentTime--;
                that.setData({
                  time: currentTime
                })
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
              
            }else{
              wx.showModal({
                title: '提示',
                content: res.data.message,
                success: function (res) {
                  if (res.confirm) {
                    that.setData({
                      sendshow: false,
                      resendshow: true,
                    })
                  } else {

                  }

                }
              })
            }
           
            // wx.hideToast();
          },
          fail: function () {
            // fail
            wx.showToast({
              title: '请重新发送',
              icon: 'loading',
              duration: 800
            })
          },
          complete: function () {
            wx.showToast({
              title: '发送成功',
              icon: 'loading',
              duration: 800
            })
          }
        })
      }
    })


  },
  input_identifyCode: function (e) {
    var that = this;
    that.setData({
      verifyCode: e.detail.value
    })
    if (that.testcode()) {
      that.setData({
        thiscode: true
      })
      if (that.data.codetrue) {
        that.setData({
          logintrue: true
        })
      } else {
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
  testphone: function (e) {
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (myreg.test(that.data.phoneNum)) {
      return true;
    } else {
      return false;
    }
  },
  testcode: function (e) {
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (that.data.verifyCode.length > 3 && that.data.verifyCode.length < 7) {
      return true;
    } else {
      return false;
    }
  },
  sublogin: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        token = res.data;
        /**
         * 发送接口
         */
        wx.showToast({
          title: '登录中',
          icon: 'loading',
          duration: 2000
        })
        wx.request({
          url: baseurl + "user/bindPhone",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            phone: that.data.phoneNum,
            verifyCode: that.data.verifyCode
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            
            /**
    * 发现群
    */
            that.loadgroup(1);
            /**
             * 群标签
             */
            that.loadgrouptag();
            /**
             *我的群
             */
            that.loadmygroup();
            /**
             * 我的
             */
            that.loaduserinfo();
            wx.setNavigationBarTitle({
              title: '搭贤'
            })
            that.setuserinfo();
          },
          fail: function () {
            // fail
            wx.showToast({
              title: '请重新发送',
              icon: 'loading',
              duration: 800
            })
          },
          complete: function () {
           
            wx.hideToast();
          }
        })

      }
    })
  },
  /**
   * 设置名片
   */
  setuserinfo: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        
        //更新数据 赋值数据
        that.setData({
          userInfo2: res.userInfo
        })
      }
    })
    console.log(userInfo2);
    wx.request({
      url: baseurl + "user/updateUserInfo",
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        nickName: that.data.userInfo2.nickName,
        imageLink: that.data.userInfo2.avatarUrl,
        city: that.data.userInfo2.city,
        country: that.data.userInfo2.country,
        province: that.data.userInfo2.province
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': token
      }, // 设置请求的 header
      success: function (res) {
        
        // wx.hideToast();
        that.setData({
          indexshow: false,
          loginshow: true
        })
        wx.setNavigationBarTitle({
          title: '搭贤',
        })
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '请重新发送',
          icon: 'loading',
          duration: 800
        })
      },
      complete: function () {
        wx.hideToast();
      }
    })
  },
  /**
   * 发现群
   */
  loadgroup: function (numb) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 20000
    })

    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        token = res.data;

          var data = {
            pageSize: 20,
            tagId: that.data.tagid,
            currentPage: numb
          }
         
        
        /**
         * 发送接口
         */
        wx.request({
          url: baseurl + "group/getGroupList",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            pageSize: 10,
            tagId: that.data.tagid,
            currentPage: numb
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
           
            if(res.data.code==0){
              var groupid = [];
              var url = [];
              var groupname = [];
              var groupinfo = [];
              var groupintro = [];
              var grouptag = [];
              var groupstatus = [];

              for (var i = 0; i < res.data.data.result.length; ++i) {
                groupid = groupid.concat(res.data.data.result[i].id)
                url = url.concat(res.data.data.result[i].imageLink)
                groupname = groupname.concat(res.data.data.result[i].name)
                groupinfo = groupinfo.concat(res.data.data.result[i].memberNum + "人")
                groupintro = groupintro.concat(res.data.data.result[i].note)
                //- 1 表示没有加群操作
                //0 表示申请中  1 表示 已拒绝  2 表示已同意 

                if (res.data.data.result[i].currentUserJoinStatus == -1) {
                  grouptag = grouptag.concat("加入群");
                  groupstatus = groupstatus.concat(3);
                }
                else if (res.data.data.result[i].currentUserJoinStatus == 0) {
                  grouptag = grouptag.concat("申请中");
                  groupstatus = groupstatus.concat(0);
                }
                else if (res.data.data.result[i].currentUserJoinStatus == 1) {
                  grouptag = grouptag.concat("已拒绝，重新申请");
                  groupstatus = groupstatus.concat(1);
                }
                else if (res.data.data.result[i].currentUserJoinStatus == 2) {
                  grouptag = grouptag.concat("已同意");
                  groupstatus = groupstatus.concat(2);
                }
              }
              if (that.data.numb > 1) {
                that.setData({
                  group: {
                    groupid: that.data.group.groupid.concat(groupid),
                    url: that.data.group.url.concat(url),
                    groupname: that.data.group.groupname.concat(groupname),
                    groupinfo: that.data.group.groupinfo.concat(groupinfo),
                    groupintro: that.data.group.groupintro.concat(groupintro),
                    grouptag: that.data.group.grouptag.concat(grouptag),
                    groupstatus: that.data.group.groupstatus.concat(groupstatus)
                  },
                  nextpage: res.data.data.pageInfo.hasNext
                })
              } else {
                that.setData({
                  group: {
                    groupid: groupid,
                    url: url,
                    groupname: groupname,
                    groupinfo: groupinfo,
                    groupintro: groupintro,
                    grouptag: grouptag,
                    groupstatus: groupstatus
                  },
                  nextpage: res.data.data.pageInfo.hasNext
                })
              }
              if (res.data.data.pageInfo.hasNext) {
                that.setData({
                  searchLoadingComplete: false, //把“没有数据”设为false，隐藏  
                  searchLoading: true  //把"上拉加载"的变量设为true，显示 
                })
              } else {
                that.setData({
                  searchLoadingComplete: true, //把“没有数据”设为true，显示  
                  searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
                });
              }
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

          },
          complete: function () {
            wx.hideToast();
          }
        })
      }
    })
  },
  searchScrollLower: function () {
    
    var that = this
    if (that.data.nextpage) {
      setTimeout(function(){
        that.loadgroup(that.data.numb + 1);
        that.setData({
          numb: that.data.numb + 1
        })
      },500)
      
    }
  },
  // onPullDownRefresh: function(){

  // },
  // upper: function () {
  //   this.setData({
  //     numb: 1
  //   })
  //   console.log('刷新');
  //   this.loadgroup(1);
  // },
  /**
* 群标签
*/
  loadgrouptag: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        token = res.data;

        /**
         * 发送接口
         */
        wx.request({
          url: baseurl + "common/getTagList",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            pageSize: 100000
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            var tagname = [];
            var tagid = [];

            for (var i = 0; i < res.data.data.result.length; ++i) {
              tagname = tagname.concat(res.data.data.result[i].name)
              tagid = tagid.concat(res.data.data.result[i].id)
            }
            that.setData({
              tagname: {
                tagname: tagname,
                tagid: tagid
              },

            })
          },
          fail: function () {

          },
          complete: function () {
            wx.hideToast();
          }
        })
      }
    })
  },
  /**
   * 我的群
   */
  loadmygroup: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        token = res.data;
        /**
         * 发送接口
         */
        wx.request({
          url: baseurl + "group/getUserGroup",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            var groupid = [];
            var url = [];
            var groupname = [];
            var groupinfo = [];
            var groupintro = [];
            var grouptag = [];
            var groupstatus = [];
            var myicon = [];
            if (res.data.code == 0) {

              for (var i = 0; i < res.data.data.topRankingGroupList.length; ++i) {
                var item = res.data.data.topRankingGroupList[i]
                groupid = groupid.concat(item.id)
                url = url.concat(item.imageLink)
                groupname = groupname.concat(item.name)
                groupinfo = groupinfo.concat(item.memberNum + "人")
                groupintro = groupintro.concat(item.note)
                myicon = myicon.concat(item.currentUserRole)
                grouptag = grouptag.concat(item.heat)
              }
              for (var i = 0; i < res.data.data.otherGroupList.length; ++i) {
                var item = res.data.data.otherGroupList[i]
                groupid = groupid.concat(item.id)
                url = url.concat(item.imageLink)
                groupname = groupname.concat(item.name)
                groupinfo = groupinfo.concat(item.memberNum + "人")
                groupintro = groupintro.concat(item.note)
                myicon = myicon.concat(item.currentUserRole)
                grouptag = grouptag.concat(item.heat)
              }
              that.setData({
                mygroup: {
                  groupid: groupid,
                  url: url,
                  groupname: groupname,
                  groupinfo: groupinfo,
                  groupintro: groupintro,
                  grouptag: grouptag,
                  groupstatus: groupstatus,
                  myicon: myicon
                },
                thismygroup: thismygroup(myicon),

              })

            }

          },
          fail: function () {

          },
          complete: function () {
            wx.hideToast();
          }
        })
      }
    })
  },
  /**
   * 我的
   */
  loaduserinfo: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        token = res.data;

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
            var tagname = [];
            var tagid = [];
            var user = res.data.data.userInfo;
            console.log(user);
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
              var industryList = []
              for (var i=0;i<user.industryList.length;++i){
                industryList = industryList.concat(user.industryList[i].name)
              }
            }
            
            for (var j = 0; j < user.tagList.length; ++j) {
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
              userimage: user.imageLink,
              username: user.nickName,
              usersex: sex,
              usertable: jobduty,
              useraddr: user.locationInfo,
              userarea: industryList,
              userage: generation,
              userphone: user.phone,
              userweixin: user.wechatId,
              userintro: user.note,
              usertag: tagname,
              viewCount: user.viewCount,
              friendCount: user.friendCount,
              shareCount: user.shareCount,
              myinfonum: res.data.data.unReadMessageCount
            })
          },
          fail: function () {

          },
          complete: function () {
            wx.hideToast();
          }
        })

      }
    })
  },
  switchChange: function (e) {
    this.setData({
      isneedhelp: e.detail.value == true ? 1 : 0, //是否需要小搭推荐        
    })
    this.savegroupset();
  },
  savegroupset: function () {

    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;

        wx.request({
          url: baseurl + "user/updateUserInfo",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            xiaodaRecommend: that.data.isneedhelp
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {

            if (res.data.code == '0') {
              wx.showToast({
                title: '设置成功',
                icon: 'success',
                duration: 800
              })

            } else {
              wx.showToast({
                title: '设置失败',
                icon: 'loading',
                duration: 800
              })
              that.setData({
                isneedhelp: that.data.isneedhelp == 0 ? 1 : 0
              });
            }

          },
          fail: function () {

            if (res.data.code == '0') {
              wx.showToast({
                title: '设置失败',
                icon: 'loading',
                duration: 800
              })
              that.setData({
                isneedhelp: that.data.isneedhelp == 0 ? 1 : 0
              });
            }
          },
          complete: function () {

          }
        })


      }
    })
  },


})

function thismygroup(myicon) {
  var arry = [];
  for (var i = 0; i < myicon.length; ++i) {
    if (myicon[i] == 0) {

      arry = arry.concat('0')

    } else {
      arry = arry.concat('thismygroup')
    }
  }
  return arry;
}
