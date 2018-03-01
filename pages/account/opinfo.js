var app = getApp()
var baseurl = "https://test.morpx.com/";
Page({
  data: {
    addnewgroup: "新建群",
    groupimg: "群头像",
    groupname: "群名称",
    grouptag: "群分类",
    groupintro: "群介绍",
    grouplocal: "群位置",
    myname: "名称",
    myage: "年龄段 as:90后",
    myphone: "请输入你的手机号",
    myweixin: "输入你的微信号",
    mylocal: "设置你的位置",
    grouptagint: "请添加群分类",
    groupintroint: "请添加群介绍",
    logo: null,
    setgroup0: true,
    setgroup1: true,
    setgroup2: true,
    setgroup3: true,
    setgroup4: true,
    setgroup5: true,
    setgroup6: true,
    setgroup7: true,
    setgroup8: true,
    setgroup9: true,
    sexname: ["男", "女", "私密"],
    tagname: [],
    tagchoose: [],
    groupurl: [],
    groupname: [],
    groupinfo: [],
    groupinfos: [],
    groupintro: [],
    groupstatus: [],
    groupmesage: [],
    myicon: [0, 0, 1, 0, 0, 0, 1],
    thismygroup: [],
    grouptype: [false, false, false, false, false, false, false, true, true],
    multiIndex: [0, 0, 0],
    thismysex: null,
    joinshow: true,
    infoid: null,
    infotype: null,
    usertype: null,
    url: null,
    name: null,
    groupinfo: null,
    groupintro: null,
    infocontent: null,
    inforstatus: null,
    jobintronumb: 0,
    toolshow1: true,
    toolshow2: true,
    grouptag: "",
    defaultshow: true,
    peopleintroshow: true,
    groupintroshow:false,
    systermhide:false,
    joinid:null,
    joinshow2:true,

  },
  thismysex: "",
  onLoad: function (options) {
    for (let i = 0; i < this.data.tagname.length; ++i) {

      var tagchoosei = 'tagchoose[' + i + ']'
      this.setData({
        [tagchoosei]: null,
      })
    }
    var that = this
    console.log(options)
    that.setData({
      infoid: options.infoid,
      infotype: options.infotype,
      usertype: options.usertype,
      url: options.url,
      name: options.name,
      groupinfo: options.groupinfo,
      groupintro: options.groupintro,
      infocontent: options.infocontent,
      inforstatus: options.inforstatus,
      setgroup1: false,
      groupid: options.groupid,
      userid: options.userid
    })
    var infotype = parseInt(that.data.infotype);
    var inforstatus = parseInt(that.data.inforstatus);
    var usertype = parseInt(that.data.usertype)
    var grouptagli = ''
    var toolshow1 = true
    var toolshow2 = true
    var toolshow3 = true
    var toolshow4 = true
    var defaultshow = false
    
    console.log(inforstatus + 'infotype' + infotype);
    switch (infotype) {
      case 2333:
        wx.setNavigationBarTitle({
          title: '申请加群'
        })

        if (that.data.usertype==0){//申请中
          
          grouptagli = '申请中'
        }
        else if (that.data.usertype ==3) {//未申请
          toolshow4 = false
          defaultshow = true
          grouptagli = '申請加群'
        }
        else if (that.data.usertype == 1) {//被拒绝
          toolshow4=false
          defaultshow = true
          grouptagli = '重新申請'
        }
        else if (that.data.usertype == 2) {//已同意
          grouptagli = '已同意'
        }
        that.setData({
          indexhide: true,
          systermhide:true,
          joinid:that.data.groupid
        })
      break;
      case 0://用户主动加群
        wx.setNavigationBarTitle({
          title: '申请加群'
        })
        //再从消息目前的状态追踪
        switch (inforstatus) {
          case 0:
            //申请中
            if (usertype == 1) {
              toolshow1 = false
              defaultshow = true
            } else {
              defaultshow = false
              grouptagli = '申请中'
            }
            break;
          case 1:
            //已拒绝
            if (usertype == 1) {
              defaultshow = false
              grouptagli = '已拒绝'
            } else {
              toolshow2 = false
              defaultshow = true
            }
            break;
          case 2:
            //已同意
            grouptagli = '已同意'
            break;
          case 3:
            //已过期
            if (usertype == 1) {
              defaultshow = false
              grouptagli = '已过期'
            } else {
              toolshow2 = false
              defaultshow = true
            }
            break;
        }

        break;
      case 1://管理员邀请加群
        wx.setNavigationBarTitle({
          title: '管理员邀请加群'
        })
        //再从消息目前的状态追踪
        switch (inforstatus) {
          case 0:
            //申请中
            if (usertype == 1) {
              toolshow1 = false
              defaultshow = true
            } else {
              grouptagli = '申请中'
            }
            break;
          case 1:
            //已拒绝
            if (usertype == 1) {
              defaultshow = false
              grouptagli = '已拒绝'
            } else {
              toolshow2 = false
              defaultshow = true
            }
          break;
          case 2:
            //已同意
            grouptagli = '已同意'
            break;
          case 3:
            //已过期
            if (usertype == 1) {
              defaultshow = false
              grouptagli = '已过期'
            } else {
              toolshow2 = false
              defaultshow = true
            }
            break;
        }
        break;
      case 2: //????//普通用户邀请好友加群
        //再从消息目前的状态追踪
        wx.setNavigationBarTitle({
          title: '群成员邀请好友加群'
        })
        switch (inforstatus) {
          case 0:
            //申请中
            if (usertype == 1) {
              toolshow1 = false
              defaultshow = true
            } else {
              defaultshow = false
              grouptagli = '邀请中'
            }
          break;
          case 1:
            //管理员已拒绝,用户无操作
            if (usertype == 0) {
              toolshow1 = false
              defaultshow = true
            } else {
              grouptagli = '管理员已拒绝,用户无操作'
            }
          break;
          case 2:
            //已拒绝
            grouptagli = '管理员接受'
            if (usertype == 0) {
              toolshow1 = false
              defaultshow = true
            } else {
              grouptagli = '管理员接受'
            }
          break;
          case 3:
            //已拒绝
            grouptagli = '用户已拒绝,管理员无操作'
            if (usertype == 1) {
              toolshow1 = false
              defaultshow = true
            } else {
              grouptagli = '已拒绝'
            }
          break;
          case 4:
            //已同意
            grouptagli = '用户接受,管理员无操作'
            if (usertype == 1) {
              toolshow1 = false
              defaultshow = true
            } else {
              grouptagli = '已接受'
            }
          break;
          case 5:
            //已过期
            grouptagli = '管理员拒绝,用户拒绝'
            if (usertype == 1) {
              grouptagli = '已拒绝'
            } else {
              grouptagli = '已拒绝'
            }
          break;
          case 6:
            //已过期
            grouptagli = '管理员拒绝,用户同意'
            if (usertype == 0) {
              toolshow1 = false
              defaultshow = true
            } else {
              grouptagli = '已拒绝'
            }
          break;
          case 7:
            //已过期
            grouptagli = '管理员同意,用户拒绝'
            if (usertype == 1) {
              grouptagli = '已同意'
            } else {
              grouptagli = '已拒绝'
            }
          break;
          case 8:
            //已过期
            grouptagli = '管理员接受，用户接受'
            if (usertype == 0) {
              grouptagli = '已同意'
            } else {
              grouptagli = '已同意'
            }
            break;
          case 9:
            //已过期
            grouptagli = '已过期'
            if (usertype == 0) {
              grouptagli = '已过期'
            } else {
              grouptagli = '已过期'
            }
          break;
        }
      break;
      case 3://用户退群
        //再从消息目前的状态追踪
        wx.setNavigationBarTitle({
          title: '用户申请退群'
        })
        switch (inforstatus) {
          case 0:
            //申请中
            if (usertype == 0) {
              defaultshow = false
              grouptagli = '退群中'
            } else {
              toolshow1 = false
              defaultshow = true
            }
            break;
          case 1:
            //已拒绝
            grouptagli = '退群成功'
          break;
        }
        break;
      case 4://踢出群
        //再从消息目前的状态追踪
        wx.setNavigationBarTitle({
          title: '踢出群聊'
        })
        switch (inforstatus) {
          case 0:
            //申请中
            if (usertype == 0) {
              defaultshow = false
              grouptagli = '踢出群中'
            } else {
              toolshow1 = false
            }
          break;
          case 1:
            //已拒绝
            grouptagli = '踢出群成功'
          break;
        }
        break;
      case 5:  //动态回复

        // grouptagli = ''
        // grouptype = true;
        // url[groupname.length - 1] = res.data.data.result[i].message.fromUser.imageLink
        // groupname[groupname.length - 1] = res.data.data.result[i].message.parentHeadlineCommentContent
        // groupintro[groupintro.length - 1] = "回复你：" + res.data.data.result[i].message.content
      break;
      case 6://申请加好友   显示个人形象
        //再从消息目前的状态追踪
        wx.setNavigationBarTitle({
          title: '申请加好友'
        })
        that.setData({
          peopleintroshow: false,
          groupintroshow: true
        })
        switch (inforstatus) {
          case 0:
            //申请中
            if (usertype == 1) {
              toolshow1 = false
              defaultshow = true
            } else {
              defaultshow = false
              grouptagli = '申请中'
            }
            break;
          case 1:
            //已拒绝
            if (usertype == 1) {
              defaultshow = false
              grouptagli = '已拒绝'
            } else {
              toolshow2 = false
            }
          break;
          case 2:
            //已同意
            grouptagli = '已同意'
            break;
          case 3:
            //已过期
            grouptagli = '已过期'
            if (usertype == 1) {
              defaultshow = false
              grouptagli = '已过期'
            } else {
              toolshow2 = false  
            }
            break;
        }
      break;
      case 7: //设置管理员
        wx.setNavigationBarTitle({
          title: '设置管理员'
        })
        //再从消息目前的状态追踪
        switch (inforstatus) {
          case 0:
            //申请中
            defaultshow = false
            grouptagli = '设置中'
            break;
          case 1:
            //已拒绝
            defaultshow = false
            grouptagli = '设置成功'
            break;
        }
        break;
      case 8://取消管理员
        wx.setNavigationBarTitle({
          title: '取消管理员'
        })
        //再从消息目前的状态追踪
        defaultshow = false
        switch (inforstatus) {
          case 0:
            //申请中
            grouptagli = '设置中'
            break;
          case 1:
            //已拒绝
            grouptagli = '设置成功'
            break;
        }
        break;
      case 9://设置写手
        //再从消息目前的状态追踪
        wx.setNavigationBarTitle({
          title: '设置主编'
        })
        defaultshow = false
        switch (inforstatus) {
          case 0:
            //申请中
            grouptagli = '设置中'
            break;
          case 1:
            //已拒绝
            grouptagli = '设置成功'
            break;
        }
        break;
      case 10://取消写手
        wx.setNavigationBarTitle({
          title: '取消主编'
        })
        //再从消息目前的状态追踪
        defaultshow = false
        switch (inforstatus) {
          case 0:
            //申请中
            grouptagli = '设置中'
            break;
          case 1:
            //已拒绝
            grouptagli = '设置成功'
            break;
        }
        break;
      case 11://申请成为写手
        wx.setNavigationBarTitle({
          title: '申请成为主编'
        })
        //再从消息目前的状态追踪
        defaultshow = false
        switch (inforstatus) {
          case 0:
            //申请中
            if (usertype == 0) {
              defaultshow = false
              grouptagli = '申请中'
            } else {
              defaultshow = true
              toolshow1 = false
            }
          break;
          case 1:
            //已拒绝
            if (usertype == 1) {
              defaultshow = false
              grouptagli = '已拒绝'
            } else {
              defaultshow = true
              toolshow2 = false
            }
          break;
          case 2:
            //已同意
            grouptagli = '已同意'
            break;
          case 3:
            //已过期
            if (usertype == 1) {
              defaultshow = false
              grouptagli = '已过期'
            } else {
              defaultshow = true
              toolshow2 = false
            }
          break;
        }
        console.log(grouptagli);

        break;
      case 12: //系统消息
        wx.setNavigationBarTitle({
          title: '系统消息'
        })
        that.setData({
          groupintroshow:true,
          systermhide:true
        })
        defaultshow = true
        
        break;
    }

    var data = {
      grouptag: grouptagli,
      toolshow1: toolshow1,
      toolshow2: toolshow2,
      toolshow3: toolshow3,
      toolshow4: toolshow4,
      defaultshow: defaultshow,
    }
    console.log(data)
    that.setData({
      grouptag: grouptagli,
      toolshow1: toolshow1,
      toolshow2: toolshow2,
      toolshow3: toolshow3,
      toolshow4: toolshow4,
      defaultshow: defaultshow,
    })
  },
  acceptgroup: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
       var token = res.data;
        /**
         * 发送接口
         */
        wx.request({
          url: baseurl + "user/changeMessageStatus",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            messageId: that.data.infoid,
            status: 2
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            if (res.data.code == 0) {
              wx.showToast({
                title: '操作成功',
                icon: 'success',
                duration: 800
              })

              setTimeout(function () {
                wx.navigateBack({});
              }, 800)
            } else {
              wx.showModal({
                title: '操作失败',
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
            console.log(res);
            wx.showToast({
              title: '操作失败',
              icon: 'success',
              duration: 800
            })

          },
          complete: function () {

          }

        })
      }
    })
  },
  rejectgroup: function (){
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
       var token = res.data;
        /**
         * 发送接口
         */
        wx.request({
          url: baseurl + "user/changeMessageStatus",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            messageId: that.data.infoid,
            status: 1
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            if (res.data.code == 0) {
              wx.showToast({
                title: '操作成功',
                icon: 'success',
                duration: 800
              })

              setTimeout(function () {
                wx.navigateBack({});
              }, 800)
            } else {
              wx.showModal({
                title: '操作失败',
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
            console.log(res);
            wx.showToast({
              title: '操作失败',
              icon: 'success',
              duration: 800
            })

          },
          complete: function () {

          }

        })
      }
    })

  },
  newgroupsub: function (e) {
    console.log(e.detail.value);
  },
  goback: function () {
    console.log('1111')
    wx.navigateBack({
      delta: 1
    })
  },
  /*
  *加入群聊
  */
  joingroup: function (e) {
    console.log('hahaha');
    this.setData({
      joinshow: this.data.joinshow == false ? true : false
    })
  },
  joinsubmit: function (e) {
    var that = this;
    console.log(e.detail);
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        var data = {
          id: that.data.joinid,
          content: e.detail.value.joingroupmsg
        }
        console.log(data)
        wx.request({
          url: baseurl + "group/joinGroup",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: data,
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            if (res.data.code == 0) {
              wx.showToast({
                title: '申请已发出',
                icon: 'success',
                duration: 800
              })
              that.setData({
                grouptag: '申請中',
                toolshow4: true,
                defaultshow: false,
              })
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
      joinshow: true,
      thejoinmsg: ""
    })
  },
  joinreset: function (e) {

    this.setData({
      joinshow: this.data.joinshow == true ? false : true,
      thejoinmsg: ""
    })
  },
  joinpeople:function(e){
    this.setData({
      joinshow2: false
    })
  },
  joinsubmit2: function (e) {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        var data = {
          userId: that.data.userid,
          content: e.detail.value.joingroupmsg
        }
        wx.request({
          url: baseurl + "user/addFriend",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: data,
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            if (res.data.code == 0) {
              wx.showToast({
                title: '好友申请已发出',
                icon: 'success',
                duration: 800
              })
              that.setData({
                grouptag: '申請中',
                toolshow3: true,
                defaultshow: false,
              })
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
            console.log(res);
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
      joinshow: true,
      thejoinmsg: ""
    })
  },
  joinreset2: function (e) {

    this.setData({
      joinshow2: this.data.joinshow2 == true ? false : true,
      thejoinmsg: ""
    })
  },


})