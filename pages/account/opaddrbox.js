//index.js
//获取应用实例
var app = getApp()
var baseurl = "https://test.morpx.com/";
var contenttype = 'application/x-www-form-urlencoded'

Page({
  //事件处理函数 js
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //页面数据变量设置
  data: {
    show1:true,
    show2: true,
    show3: true,
    show4: true,
    show5: true,
    show6: true,
    content1:null,
    content2: null,
    content3: null,
    content4: null,
    content5: null,
    content6: null,
    joinbtn1: "取消",
    joinbtn2: "发送",
    userid:null,
    userInfo: {},
    infoid: null,
    group: {
      

    },
    imgwidth: [],
    search: {
      searchValue: '',
      showClearBtn: false
    },
    searchResult: [],
    sameUser: '',
    currentUserRole: '',
    addFriendStatus: '',
    morehide:false,
  },
  thismygroup: "",
  onLoad: function (res) {
    wx.setNavigationBarTitle({
      title: '尼古拉斯的个人名片'
    })
    this.setData({
      userid: res.id,
      groupid:res.groupid,
      typeid: res.typeid,
      toolid: res.toolid
    })
    console.log(this.data.res);
    this.loadgroupdetail();
  },
  /**
   * 文档加载
   */
  loadgroupdetail: function () {
    console.log('detail');
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        /**
         * 群名称
         */
        if(that.data.typeid==0){
          wx.request({
            url: baseurl + "user/getUserInfoFromOtherChannel",
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            data: {
              userId: that.data.userid,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'token': token
            }, // 设置请求的 header
            success: function (res) {
              
              that.setData({
                sameUser: res.data.data.relationShipInfo.sameUser,
                morehide: res.data.data.relationShipInfo.sameUser,
                currentUserRole: res.data.data.relationShipInfo.currentUserRole,
                addFriendStatus: res.data.data.relationShipInfo.addFriendStatus,
                viewUserRole: res.data.data.relationShipInfo.viewUserRole
              })
              console.log(that.data.sameUser);
              var item = res.data.data.userInfo;
              var groupname = item.nickName;
              var currentUserRole = item.currentUserRole;            
              var canset = false; 
              if (currentUserRole == 1) {
                 var canset = true; 
              }
              wx.setNavigationBarTitle({
                title: groupname + "的个人名片"
              })
              var groupid
              var url
              var groupname
              var groupinfo
              var groupicon = []
              var friend
              var job
              var industy
              var generations
              var phone
              var weixin
              var groupintro
              var see
              var share
              if (item.jobDuty == undefined || item.jobDuty.name == undefined) {
                var jobduty = '';
              } else {
                var jobduty = item.jobDuty.name;
              }
              console.log('hahahahah');
              url = item.imageLink
              groupname = item.nickName
              groupinfo = item.memberNum + "人"
              groupintro = item.note
              friend = item.friendCount
              job = jobduty
              industy = item.industryString
              generations = generation(item.generation)
              console.log(res.data.data.relationShipInfo);
              if (res.data.data.relationShipInfo.friend){
                phone = item.phone
                weixin = item.wechatId
              }else{
                var str='';
                for (var i=0;i<item.phone.length - 6;++i){
                  str+='*'
                }
                phone = item.phone.substring(0, 3) + str + item.phone.substring(item.phone.length-3, item.phone.length)
                var str2 = '';
                for (var i = 0; i < item.wechatId.length - 5; ++i) {
                  str2 += '*'
                }
                weixin = item.wechatId.substring(0, 2) + str2 + item.wechatId.substring(item.wechatId.length - 3, item.wechatId.length)
              }
             
              see = item.viewCount
              share = item.shareCount
              groupicon = []
              for (var j = 0; j < item.tagList.length; j++) {
                groupicon = groupicon.concat(item.tagList[j].name)
              }


              that.setData({
                group: {
                  groupid: groupid,
                  url: url,
                  groupname: groupname,
                  groupinfo: groupinfo,
                  groupintro: groupintro,
                  groupicon: groupicon,
                  friend: friend,
                  job: job,
                  industy: industy,
                  generation: generations,
                  phone: phone,
                  weixin: weixin,
                  see: see,
                  share: share
                }
              })
              console.log(that.data.group)
            },
            fail: function () {

            },
            complete: function () {
              wx.hideToast();
            }
          })
        }else{
          wx.request({
            url: baseurl + "user/getUserInfoFromGroup",
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            data: {
              userId: that.data.userid,
              groupId: that.data.groupid
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'token': token
            }, // 设置请求的 header
            success: function (res) {
              console.log(res);
              console.log('没有 zhuangt ');
              console.log(res.data.data.relationShipInfo);
              that.setData({
                sameUser: res.data.data.relationShipInfo.sameUser,
                morehide: res.data.data.relationShipInfo.sameUser,
                currentUserRole: res.data.data.relationShipInfo.currentUserRole,
                addFriendStatus: res.data.data.relationShipInfo.addFriendStatus,
                viewUserRole: res.data.data.relationShipInfo.viewUserRole
              })
              var item = res.data.data.userInfo;
              var groupname = item.nickName;
              wx.setNavigationBarTitle({
                title: groupname + "的个人名片"
              })
              var groupid
              var url
              var groupname
              var groupinfo
              var groupicon = []
              var friend
              var job
              var industy
              var generations
              var phone
              var weixin
              var groupintro
              var see
              var share
              if (item.jobDuty == undefined || item.jobDuty.name == undefined) {
                var jobduty = '';
              } else {
                var jobduty = item.jobDuty.name;
              }
              url = item.imageLink
              console.log('hhhhhh');
              groupname = res.data.data.userInfo.nickName
              groupinfo = item.memberNum + "人"
              groupintro = item.note
              friend = item.friendCount
              job = jobduty
              industy = item.industryString
              generations = generation(item.generation)
              phone = item.phone
              weixin = item.wechatId
              see = item.viewCount
              share = item.shareCount
              groupicon = []
              for (var j = 0; j < item.tagList.length; j++) {
                groupicon = groupicon.concat(item.tagList[j].name)
              }


              that.setData({
                group: {
                  groupid: groupid,
                  url: url,
                  groupname: groupname,
                  groupinfo: groupinfo,
                  groupintro: groupintro,
                  groupicon: groupicon,
                  friend: friend,
                  job: job,
                  industy: industy,
                  generation: generations,
                  phone: phone,
                  weixin: weixin,
                  see: see,
                  share: share
                }
              })
              console.log(that.data.group)
            },
            fail: function () {

            },
            complete: function () {
              wx.hideToast();
            }
          })
        }

        /**
         * 群头条
         */
        wx.request({
          url: baseurl + "group/getUserHeadlineList",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            userId: that.data.userid,
            pageSize: 1000000
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log('dynamicdetail');
            console.log(res);
            var item = res.data.data;
            var groupname = item.name;
            var people = []
            var groupname = []
            var groupinfo = []
            var time = []
            var title = []
            var image = []
            var imageitem = []
            var see = []
            var speake = []
            var greate = []
            var share = []
            var id = []
            for (var i = 0; i < res.data.data.result.length; ++i) {
              item = res.data.data.result[i]
              id = id.concat(item.id)
              people = people.concat(item.userImageLink)
              groupname = groupname.concat(item.userNickName)
              if (item.userIndustry.length > 0) {
                groupinfo = groupinfo.concat(item.userIndustry);
              }
              else if (generation(item.userGeneration).length > 0) {
                groupinfo = groupinfo.concat(generation(item.userGeneration));
              }
              else if (item.userIndustry.length > 0 && generation(item.userGeneration).length > 0) {
                groupinfo = groupinfo.concat(item.userIndustry + "|" + generation(item.userGeneration));
              }
              time = time.concat(formatTime(item.gmtCreate, "Y.M.D"))
              title = title.concat(item.content)
              imageitem = [item.imageLink0, item.imageLink1, item.imageLink2, item.imageLink3, item.imageLink4, item.imageLink5, item.imageLink6, item.imageLink7, item.imageLink8]
              imageitem = ClearNullArr(imageitem);


              see = see.concat(item.viewCount)
              speake = speake.concat(item.commentCount)
              greate = greate.concat(item.praiseCount)
              share = share.concat(item.shareCount)
              image[i] = imageitem
            }

            var imgwidths = "imgwidth[" + i + "]";
            that.setData({
              dynamic: {
                id: id,
                people: people,
                groupname: groupname,
                groupinfo: groupinfo,
                time: time,
                title: title,
                image: image,
                see: see,
                speake: speake,
                greate: greate,
                share: share
              },
              imgwidth: dynamicimage(image)
            })
            console.log(that.data.dynamic);
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
  dynamicdetail:function(e){
    wx.navigateTo({
      url: '../group/dynamicdetail?id=' + e.currentTarget.id
    })
  },
  addmyfriend:function(e){
    var that=this;
    console.log(e);
    wx.getStorage({
      key: "token",
      success: function (res) {
        
        var token = res.data;
        var data={
           userId:that.data.userid,
           content: e.detail.value.joingroupmsg
        }
        console.log(data)
        wx.request({
          url: baseurl + "user/addFriend",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: data,
          header: {
            'content-type': contenttype,
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            if (res.data.code == 0) {
              wx.showToast({
                title: '消息已发出',
                icon: 'success',
                duration: 800
              })
              that.joinreset();
            } else {
              wx.showModal({
                title: '加好友失败',
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
              title: '加好友失败',
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
  deleteher: function (e) {
    var that=this
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        var data = {
          id: that.data.groupid,
          userId: that.data.userid,
          content: e.detail.value.joingroupmsg
        }
        wx.request({
          url: baseurl + "group/kickoutGroup",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: data,
          header: {
            'content-type': contenttype,
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            if (res.data.code == 0) {
              wx.showToast({
                title: '已踢出群聊',
                icon: 'success',
                duration: 800
              })
              that.joinreset();
              setTimeout(function () {
                wx.navigateTo({
                  url: '../group/groupdetail?groupid=' + this.data.groupid,
                })
              }, 800)
            } else {
              wx.showModal({
                title: '踢出群聊失败',
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
              title: '踢出群聊失败',
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
  setasmanager: function (e) {
    var that = this
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        var data = {
          groupId: that.data.groupid,
          userId: that.data.userid,
          content: e.detail.value.joingroupmsg
        }
        wx.request({
          url: baseurl + "group/setToAdmin",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: data,
          header: {
            'content-type': contenttype,
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            if (res.data.code == 0) {
              wx.showToast({
                title: '设置管理员成功',
                icon: 'success',
                duration: 800
              })
              that.joinreset();
            } else {
              wx.showModal({
                title: '设置失败',
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
              title: '设置失败',
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
  setaswriter: function(e){
    var that = this
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        var data = {
          groupId: that.data.groupid,
          userId: that.data.userid,
          content: e.detail.value.joingroupmsg
        }
        wx.request({
          url: baseurl + "group/setToEditor",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: data,
          header: {
            'content-type': contenttype,
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            if (res.data.code == 0) {
              wx.showToast({
                title: '设置主编成功',
                icon: 'success',
                duration: 800
              })
              that.joinreset();
            } else {
              wx.showModal({
                title: '设置失败',
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
              title: '设置失败',
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
  defaultmanager: function (e) {
    var that = this
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        var data = {
          groupId: that.data.groupid,
          userId: that.data.userid,
          content: e.detail.value.joingroupmsg
        }
        wx.request({
          url: baseurl + "group/cancelSetToAdmin",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: data,
          header: {
            'content-type': contenttype,
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            if (res.data.code == 0) {
              wx.showToast({
                title: '取消管理员成功',
                icon: 'success',
                duration: 800
              })
              that.joinreset();
            } else {
              wx.showModal({
                title: '取消失败',
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
              title: '设置失败',
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
  defaultwriter: function (e) {
    var that = this
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        var data = {
          groupId: that.data.groupid,
          userId: that.data.userid,
          content: e.detail.value.joingroupmsg
        }
        wx.request({
          url: baseurl + "group/cancelSetToEditor",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: data,
          header: {
            'content-type': contenttype,
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            if (res.data.code == 0) {
              wx.showToast({
                title: '取消主编成功',
                icon: 'success',
                duration: 800
              })
              that.joinreset();
            } else {
              wx.showModal({
                title: '取消失败',
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
              title: '设置失败',
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
  //举报
  report: function () {
    wx.navigateTo({
      url: '../index/report?type=1&resourceId='+this.data.userid ,
    })
  },
  moretool: function(){
    var that=this;
    var sameUser = that.data.sameUser
    var currentUserRole = that.data.currentUserRole
    var addFriendStatus = that.data.addFriendStatus
    var viewUserRole = that.data.viewUserRole
    console.log(sameUser);
    console.log(currentUserRole);
    console.log(addFriendStatus);
    console.log(viewUserRole);
    console.log(that.data.typeid);
    console.log(that.data.toolid);
      if (that.data.typeid == 0) {//从其他途径进入时的
        
          if (addFriendStatus == -1 || addFriendStatus == 1){
            var word = '';
            if (addFriendStatus == -1) {
              word = "加为好友"
            }
            if (addFriendStatus == 1) {
              word = "已拒绝，重新申请"
            }
            wx.showActionSheet({
              itemList: [word, '举报'],
              success: function (res) {
                console.log(res.tapIndex)
                if (res.tapIndex == 0) {
                  that.setData({
                    show1: false
                  })
                }

                if (res.tapIndex == 1) {
                  that.report();
                }
              },
              fail: function (res) {
                console.log(res.errMsg)
              }
            })
          }else{
            var word;
            if (addFriendStatus == 0){
              word ='申请加好友中'
            }
            if (addFriendStatus == 2){
              word = '已加为好友'
            }
            wx.showActionSheet({
              itemList: [word, '举报'],
              success: function (res) {
                console.log(res.tapIndex)
                if (res.tapIndex == 0) {
                  wx.showModal({
                    title: '不可操作',
                    content: word,
                    success: function (res) {
                      if (res.confirm) {

                      } else {

                      }

                    }
                  })

                }

                if (res.tapIndex == 1) {
                  that.report();
                }
              },
              fail: function (res) {
                console.log(res.errMsg)
              }
            })
          }

        
      }else{//从通讯录进入时
       
        if (viewUserRole == 1) { //该个人名片是群主时
          if (addFriendStatus == -1 || addFriendStatus == 1) {
            var word = '';
            if (addFriendStatus == -1) {
              word = "加为好友"
            }
            if (addFriendStatus == 1) {
              word = "已拒绝，重新申请"
            }
            wx.showActionSheet({
              itemList: [word, '举报'],
              success: function (res) {
                console.log(res.tapIndex)
                if (res.tapIndex == 0) {
                  that.setData({
                    show1: false
                  })
                }

                if (res.tapIndex == 1) {
                  that.report();
                }
              },
              fail: function (res) {
                console.log(res.errMsg)
              }
            })
          } else {
            var word;
            if (addFriendStatus == 0) {
              word = '申请加好友中'
            }
            if (addFriendStatus == 2) {
              word = '已加为好友'
            }
            wx.showActionSheet({
              itemList: [word, '举报'],
              success: function (res) {
                console.log(res.tapIndex)
                if (res.tapIndex == 0) {
                  wx.showModal({
                    title: '不可操作',
                    content: word,
                    success: function (res) {
                      if (res.confirm) {

                      } else {

                      }

                    }
                  })

                }

                if (res.tapIndex == 1) {
                  that.report();
                }
              },
              fail: function (res) {
                console.log(res.errMsg)
              }
            })
          }
        }else{
          //进入的人可以操作的模块 
          if (currentUserRole==1){//群主
            //管理员 
            //主编
            if (addFriendStatus == -1 || addFriendStatus == 1 ){//未申请  已拒绝
              var word='';
              if (addFriendStatus == -1){
                word="加为好友"
              }
              if (addFriendStatus == 1){
                word = "已拒绝，重新申请"
              }
              if (that.data.toolid == 1) {
                wx.showActionSheet({
                  itemList: [word, '踢出群聊', '设为管理员', '设为主编',  '举报'],
                  success: function (res) {
                    console.log(res.tapIndex)
                    if (res.tapIndex == 0) {
                      that.setData({
                        show1: false
                      })
                    }
                    if (res.tapIndex == 1) {
                      that.setData({
                        show2: false
                      })
                    }
                    if (res.tapIndex == 2) {
                      that.setData({
                        show3: false
                      })
                    }
                    if (res.tapIndex == 3) {
                      that.setData({
                        show4: false
                      })
                    }
                    if (res.tapIndex == 4) {
                      that.report();
                    }
                  },
                  fail: function (res) {
                    console.log(res.errMsg)
                  }
                })
              }
              if (that.data.toolid == 2) {
                wx.showActionSheet({
                  itemList: [word, '踢出群聊', '取消管理员', '设为主编', '举报'],
                  success: function (res) {
                    console.log(res.tapIndex)
                    if (res.tapIndex == 0) {
                      that.setData({
                        show1: false
                      })
                    }
                    if (res.tapIndex == 1) {
                      that.setData({
                        show2: false
                      })
                    }
                    if (res.tapIndex == 2) {
                      that.setData({
                        show5: false
                      })
                    }
                    if (res.tapIndex == 3) {
                      that.setData({
                        show4: false
                      })
                    }
                    if (res.tapIndex == 4) {
                      that.report();
                    }
                  },
                  fail: function (res) {
                    console.log(res.errMsg)
                  }
                })
              }
              if (that.data.toolid == 3) {
                wx.showActionSheet({
                  itemList: [word, '踢出群聊', '设为管理员', '取消主编', '举报'],
                  success: function (res) {
                    console.log(res.tapIndex)
                    if (res.tapIndex == 0) {
                      that.setData({
                        show1: false
                      })
                    }
                    if (res.tapIndex == 1) {
                      that.setData({
                        show2: false
                      })
                    }
                    if (res.tapIndex == 2) {
                      that.setData({
                        show3: false
                      })
                    }
                    if (res.tapIndex == 3) {
                      that.setData({
                        show6: false
                      })
                    }
                    
                    if (res.tapIndex == 4) {
                      that.report();
                    }
                  },
                  fail: function (res) {
                    console.log(res.errMsg)
                  }
                })
              }
            }else{
              var word;
              if (addFriendStatus == 0) {
                word = '申请加好友中'
              }
              if (addFriendStatus == 2) {
                word = '已加为好友'
              }
              if (that.data.toolid == 1) {
                wx.showActionSheet({
                  itemList: [word, '踢出群聊', '设为管理员', '设为主编', '举报'],
                  success: function (res) {
                    console.log(res.tapIndex)
                    if (res.tapIndex == 0) {
                      wx.showModal({
                        title: '不可操作',
                        content: word,
                        success: function (res) {
                          if (res.confirm) {

                          } else {

                          }

                        }
                      })

                    }
                    if (res.tapIndex == 1) {
                      that.setData({
                        show2: false
                      })
                    }
                    if (res.tapIndex == 2) {
                      that.setData({
                        show3: false
                      })
                    }
                    if (res.tapIndex == 3) {
                      that.setData({
                        show4: false
                      })
                    }
                    if (res.tapIndex == 4) {
                      that.report();
                    }
                  },
                  fail: function (res) {
                    console.log(res.errMsg)
                  }
                })
              }
              if (that.data.toolid == 2) {
                wx.showActionSheet({
                  itemList: [word, '踢出群聊', '取消管理员', '设为主编', '举报'],
                  success: function (res) {
                    console.log(res.tapIndex)
                    if (res.tapIndex == 0) {
                      wx.showModal({
                        title: '不可操作',
                        content: word,
                        success: function (res) {
                          if (res.confirm) {

                          } else {

                          }

                        }
                      })
                    }
                    if (res.tapIndex == 1) {
                      that.setData({
                        show2: false
                      })
                    }
                    if (res.tapIndex == 2) {
                      that.setData({
                        show5: false
                      })
                    }
                    if (res.tapIndex == 3) {
                      that.setData({
                        show4: false
                      })
                    }
                    if (res.tapIndex == 4) {
                      that.report();
                    }
                  },
                  fail: function (res) {
                    console.log(res.errMsg)
                  }
                })
              }
              if (that.data.toolid == 3) {
                wx.showActionSheet({
                  itemList: [word, '踢出群聊', '设为管理员', '取消主编', '举报'],
                  success: function (res) {
                    console.log(res.tapIndex)
                    if (res.tapIndex == 0) {
                      wx.showModal({
                        title: '不可操作',
                        content: word,
                        success: function (res) {
                          if (res.confirm) {

                          } else {

                          }

                        }
                      })
                    }
                    if (res.tapIndex == 1) {
                      that.setData({
                        show2: false
                      })
                    }
                    if (res.tapIndex == 2) {
                      that.setData({
                        show3: false
                      })
                    }
                    if (res.tapIndex == 3) {
                      that.setData({
                        show6: false
                      })
                    }
                    if (res.tapIndex == 4) {
                      that.report();
                    }
                  },
                  fail: function (res) {
                    console.log(res.errMsg)
                  }
                })
              }
            }
           
          }
          if (currentUserRole==2) {//管理员
            //管理员 
            //主编
            if (addFriendStatus == -1 || addFriendStatus == 1) {//未申请  已拒绝
              var word = '';
              if (addFriendStatus == -1) {
                word = "加为好友"
              }
              if (addFriendStatus == 1) {
                word = "已拒绝，重新申请"
              }
              if (that.data.toolid == 1) {
                wx.showActionSheet({
                  itemList: [word, '踢出群聊', '设为主编', '举报'],
                  success: function (res) {
                    console.log(res.tapIndex)
                    if (res.tapIndex == 0) {
                      that.setData({
                        show1: false
                      })
                    }
                    if (res.tapIndex == 1) {
                      that.setData({
                        show2: false
                      })
                    }
                    if (res.tapIndex == 2) {
                      that.setData({
                        show4: false
                      })
                    }
                    if (res.tapIndex == 3) {
                      that.report();
                    }
                  },
                  fail: function (res) {
                    console.log(res.errMsg)
                  }
                })
              }
              if (that.data.toolid == 2) {
                wx.showActionSheet({
                  itemList: [word, '踢出群聊', '设为主编', '举报'],
                  success: function (res) {
                    console.log(res.tapIndex)
                    if (res.tapIndex == 0) {
                      that.setData({
                        show1: false
                      })
                    }
                    if (res.tapIndex == 1) {
                      that.setData({
                        show2: false
                      })
                    }
                    if (res.tapIndex == 2) {
                      that.setData({
                        show4: false
                      })
                    }
                    if (res.tapIndex == 3) {
                      that.report();
                    }
                  },
                  fail: function (res) {
                    console.log(res.errMsg)
                  }
                })
              }
              if (that.data.toolid == 3) {
                wx.showActionSheet({
                  itemList: [word, '踢出群聊', '取消主编', '举报'],
                  success: function (res) {
                    console.log(res.tapIndex)
                    if (res.tapIndex == 0) {
                      that.setData({
                        show1: false
                      })
                    }
                    if (res.tapIndex == 1) {
                      that.setData({
                        show2: false
                      })
                    }
                    if (res.tapIndex == 2) {
                      that.setData({
                        show6: false
                      })
                    }
                    if (res.tapIndex ==3) {
                      that.report();
                    }
                  },
                  fail: function (res) {
                    console.log(res.errMsg)
                  }
                })
              }
            } else {
              var word;
              if (addFriendStatus == 0) {
                word = '申请加好友中'
              }
              if (addFriendStatus == 2) {
                word = '已加为好友'
              }
              if (that.data.toolid == 1) {
                wx.showActionSheet({
                  itemList: [word, '踢出群聊',  '设为主编', '举报'],
                  success: function (res) {
                    console.log(res.tapIndex)
                    if (res.tapIndex == 0) {
                      wx.showModal({
                        title: '不可操作',
                        content: word,
                        success: function (res) {
                          if (res.confirm) {

                          } else {

                          }

                        }
                      })

                    }
                    if (res.tapIndex == 1) {
                      that.setData({
                        show2: false
                      })
                    }
                    if (res.tapIndex == 2) {
                      that.setData({
                        show4: false
                      })
                    }
                    if (res.tapIndex == 3) {
                      that.report();
                    }
                  },
                  fail: function (res) {
                    console.log(res.errMsg)
                  }
                })
              }
              if (that.data.toolid == 2) {
                wx.showActionSheet({
                  itemList: [word, '踢出群聊', '设为主编', '举报'],
                  success: function (res) {
                    console.log(res.tapIndex)
                    if (res.tapIndex == 0) {
                      wx.showModal({
                        title: '不可操作',
                        content: word,
                        success: function (res) {
                          if (res.confirm) {

                          } else {

                          }

                        }
                      })
                    }
                    if (res.tapIndex == 1) {
                      that.setData({
                        show2: false
                      })
                    }
                    if (res.tapIndex == 2) {
                      that.setData({
                        show4: false
                      })
                    }
                    if (res.tapIndex == 3) {
                      that.report();
                    }
                  },
                  fail: function (res) {
                    console.log(res.errMsg)
                  }
                })
              }
              if (that.data.toolid == 3) {
                wx.showActionSheet({
                  itemList: [word, '踢出群聊', '取消主编', '举报'],
                  success: function (res) {
                    console.log(res.tapIndex)
                    if (res.tapIndex == 0) {
                      wx.showModal({
                        title: '不可操作',
                        content: word,
                        success: function (res) {
                          if (res.confirm) {

                          } else {

                          }

                        }
                      })
                    }
                    if (res.tapIndex == 1) {
                      that.setData({
                        show2: false
                      })
                    }
                    if (res.tapIndex == 2) {
                      that.setData({
                        show6: false
                      })
                    }
                    if (res.tapIndex == 3) {
                      that.report();
                    }
                  },
                  fail: function (res) {
                    console.log(res.errMsg)
                  }
                })
              }
            }
          }
          else if (currentUserRole == 0 || currentUserRole == 3){
            if (addFriendStatus == -1 || addFriendStatus == 1) {
              var word = '';
              if (addFriendStatus == -1) {
                word = "加为好友"
              }
              if (addFriendStatus == 1) {
                word = "已拒绝，重新申请"
              }
              wx.showActionSheet({
                itemList: [word, '举报'],
                success: function (res) {
                  console.log(res.tapIndex)
                  if (res.tapIndex == 0) {
                    that.setData({
                      show1: false
                    })
                  }

                  if (res.tapIndex == 1) {
                    that.report();
                  }
                },
                fail: function (res) {
                  console.log(res.errMsg)
                }
              })
            } else {
              var word;
              if (addFriendStatus == 0) {
                word = '申请加好友中'
              }
              if (addFriendStatus == 2) {
                word = '已加为好友'
              }
              wx.showActionSheet({
                itemList: [word, '举报'],
                success: function (res) {
                  console.log(res.tapIndex)
                  if (res.tapIndex == 0) {
                    wx.showModal({
                      title: '不可操作',
                      content: word,
                      success: function (res) {
                        if (res.confirm) {

                        } else {

                        }

                      }
                    })

                  }

                  if (res.tapIndex == 1) {
                    that.report();
                  }
                },
                fail: function (res) {
                  console.log(res.errMsg)
                }
              })
            }
          }
        }

      }
    
    
  },
  
  joinreset: function (e) {

    this.setData({
      show1: true,
      show2: true,
      show3: true,
      show4: true,
      show5: true,
      show6: true,
      content1: null,
      content2: null,
      content3: null,
      content4: null,
      content5: null,
      content6: null,
    })
  },
  onShareAppMessage: function () {

    var that = this;
    return {
      title: '搭闲小程序',
      desc: '个人名片',
      path: '/pages/account/opaddrbox?id=' + this.data.userid + '&typeid=0',
      success: function (res) {
        // 转发成功
        console.log(res);
        wx.getStorage({
          key: "token",
          success: function (res) {

            var token = res.data;
            var data = {
              userId: that.data.userid
            }
            console.log(data);
            console.log(baseurl + "user/increaseUserShareCount");
            wx.request({
              url: baseurl + "user/increaseUserShareCount",
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              data: data,
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': token
              }, // 设置请求的 header
              success: function (res) {
                console.log(res)
                if (res.data.code == 0) {
                  wx.showToast({
                    title: '分享成功',
                    icon: 'success',
                    duration: 800
                  })

                  //that.loadgroup(1);

                } else {
                  wx.showModal({
                    title: '分享失败',
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
                  title: '分享失败',
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
      fail: function (res) {
        // 转发失败
        // 转发失败
        wx.showModal({
          title: '分享失败',
          content: res.data.message,
          success: function (res) {
            if (res.confirm) {

            } else {

            }

          }
        })
      }
    }
  },

})

function generation(numb) {
  var generation = '';
  switch (numb) {
    case "0":
      generation = "未指定";
      break;
    case "1":
      generation = "40后";
      break;
    case "2":
      generation = "50后";
      break;
    case "3":
      generation = "60后";
      break;
    case "4":
      generation = "70后";
      break;
    case "5":
      generation = "80后";
      break;
    case "6":
      generation = "90后";
      break;
    case "7":
      generation = "00后";
      break;
  }
  return generation
}
//数据转化  
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTime(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
function dynamicimage(imgdata) {
  try {
    var res = wx.getSystemInfoSync()
    var windowwidth = res.windowWidth;
    var imgwidth = [];
    for (var i = 0; i < imgdata.length; ++i) {
      if (imgdata[i].length == 1) {
        var widths = windowwidth;
      }
      else if (imgdata[i].length == 2) {
        var widths = 0.5 * windowwidth - 6;
      }
      else if (imgdata[i].length == 3) {
        var widths = 1 / 3 * windowwidth - 9;
      }
      else if (imgdata[i].length == 4) {
        var widths = 0.5 * windowwidth - 6;
      }
      else if (imgdata[i].length > 4) {
        var widths = 1 / 3 * windowwidth - 9;
      }
      imgwidth[i] = widths;
    }
    return imgwidth;
  } catch (e) {
    console.log(e);
  }
}
function ClearNullArr(arr) {
  for (var i = 0, len = arr.length; i < len; i++) {
    if (!arr[i] || arr[i] == '' || arr[i] === undefined) {
      arr.splice(i, 1);
      len--;
      i--;
    }
  }
  return arr;
} 
