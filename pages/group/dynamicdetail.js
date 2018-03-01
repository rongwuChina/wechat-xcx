//index.js
//获取应用实例
var app = getApp()
var baseurl = "https://test.morpx.com/";
require('../../utils/util.js')
Page({
  //事件处理函数 js
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //页面数据变量设置
  data: {
    praiseByCurrentUser: null,
    collectByCurrentUser: null,
    parentCommentId: null,
    dynamicid: null,
    dynamicgreate: null,
    dynamiccollect: null,
    discussthis: true,
    speakethis: false,
    discussfocus: false,
    mycomment: null,
    discusstext: "0",
    userInfo: {},
    toptab1: "发现群",
    toptab2: "我的群",
    tagshow: true,
    toptabnow: "toptabnow",
    toptabnow2: "",
    tagname: [],
    dynamic: {
      id: null,
      userid: null,
      people: [],
      groupname: [],
      groupinfo: [],
      time: [],
      title: [],
      image: [
        []
      ],
      see: [],
      speake: [],
      greate: [],
      share: [],
      groupfrom: []

    },
    comment: [{
      id: [],
      image: [],
      name: [],
      time: [],
      comment: [],
      discuss: [{
        name: [],
        comment: [],
      }]
    }, {
      id: [],
      image: [],
      name: [],
      time: [],
      comment: [],
      discuss: [{
        parentCommentId: [],
        name: [],
        comment: [],
      }]
    }],
    imgwidth: [],
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
    group: {
    },
    search: {
      searchValue: '',
      showClearBtn: false
    },
    searchResult: [],
    imgwidth: [],
    current: 0,
    dotnow1: 'dotnow',
    dotnow2: null,
    photoshow: true,
    windowHeight: null,
    windowWidth: null,
    dotnow: ["dotnow"],
    dotnowlength: null
  },
  photosee: function () {
    console.log('0000');
    this.setData({
      photoshow: false
    })
  },
  photohide: function () {
    this.setData({
      photoshow: true
    })
  },
  /**
 * swiper
 */
  swiperChange: function (e) {

    for (var i = 0; i < this.data.dotnowlength; ++i) {
      var dotnowi = "dotnow[" + i + "]"
      if (i == e.detail.current) {
        this.setData({
          [dotnowi]: "dotnow",
        })
      } else {
        this.setData({
          [dotnowi]: "",
        })
      }

    }

  },
  addgroup: function (e) {
    wx.navigateTo({
      url: '../addgroup/addgroup'
    })
  },
  joingroup: function (e) {
    console.log('hahaha');
    this.setData({
      joinshow: this.data.joinshow == false ? true : false
    })
  },
  /**
   * 群动态
   * 群成员
   * 群通讯录
   * 发动态
   */
  groupdetail: function () {
    wx.navigateTo({
      url: '../group/groupdetail',
    })
  },
  onLoad: function (res) {
    this.setData({
      dynamicid: res.id
    })
    wx.setNavigationBarTitle({
      title: '动态详情'
    })
    this.loaddetail();
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });
  },
  onshow: function () {
    this.loaddetail();
  },
  /**回复评论 盖楼 */
  speakethis: function (e) {

    if (this.data.speakethis) {
      this.setData({
        'speakethis': false,
        'discussthis': true,
        'discussfocus': false,
        'discusstext': "0"
      })
    } else {
      console.log(e.currentTarget.id);
      this.setData({
        'speakethis': true,
        'discussthis': false,
        'discussfocus': true,
        'discusstext': "回复该评论...",
        parentCommentId: e.currentTarget.id
      })
    }
  },
  nospeakethis: function () {
    if (this.data.speakethis) {
      this.setData({
        'speakethis': false,
        'discussthis': true,
        'discussfocus': false,
        'discusstext': "0"
      })
    }

  },
  loaddetail: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        /**
         * 头条详情
         */
        wx.request({
          url: baseurl + "group/getHeadline",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            id: that.data.dynamicid,
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
            var collect = []
            var id = []
            var userid = []
            var praiseByCurrentUser
            var collectByCurrentUser

            item = res.data.data
            id = id.concat(item.id)
            userid = userid.concat(item.userId)
            people = people.concat(item.userImageLink)
            groupname = groupname.concat(item.userNickName)
            // groupinfo = groupinfo.concat(item.userIndustry + "|" + generation(item.userGeneration))
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
            console.log(imageitem);

            see = see.concat(item.viewCount)
            speake = item.commentCount
            greate = item.praiseCount
            share = share.concat(item.shareCount)
            collect = item.collectCount
            image[0] = imageitem
            praiseByCurrentUser = item.praiseByCurrentUser
            collectByCurrentUser = item.collectByCurrentUser


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
                share: share,
                userid: userid
              },
              dynamicspeake: speake,
              dynamicgreate: greate,
              dynamiccollect: collect,
              imgwidth: dynamicimage(image),
              dotnowlength: image[0].length,
              praiseByCurrentUser: praiseByCurrentUser,
              collectByCurrentUser: collectByCurrentUser
            })
          },
          fail: function () {

          },
          complete: function () {

          }
        })
        /**
         * 评论详情
         */
        wx.request({
          url: baseurl + "group/getHeadlineCommentList",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            headlineId: that.data.dynamicid,
            pageSize: 1000000
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log('commentdetail');
            console.log(res);
            var item = res.data.data;
            var groupname = item.name;
            var id = []
            var userid = []
            var name = []
            var time = []
            var comment = []

            var discuss = []
            var discussitem = []


            var imageitem = []
            var image = []

            var commentitem = {}
            var commentlis = []


            for (var i = 0; i < res.data.data.result.length; ++i) {
              item = res.data.data.result[i]
              id = id.concat(item.id)
              image = image.concat(item.fromUserImageLink)
              name = name.concat((item.fromUserName))
              comment = comment.concat((item.record))
              time = time.concat(formatTime(item.gmtCreate, "Y.M.D"))
              userid = userid.concat(item.fromUserId);
              var discussname = []
              var discusscomment = []
              var parentcommentId = []
              var discussuserId = []
              var discussid = []
              for (var j = 0; j < item.subCommentList.length; j++) {
                var items = item.subCommentList[j]
                if (items.toUserId == 0) {
                  discussname = discussname.concat(items.fromUserName)
                } else {
                  discussname = discussname.concat(items.fromUserName + "回复" + items.toUserName)
                }

                discusscomment = discusscomment.concat(items.record)
                parentcommentId = parentcommentId.concat(items.toUserId)
                discussuserId = discussuserId.concat(items.fromUserId)
                discussid = discussid.concat(items.id)
              }

              discuss[i] = {
                name: discussname,
                comment: discusscomment,
                parentcommentId: parentcommentId,
                discussuserId: discussuserId,
                discussid: discussid
              }
              console.log();
              console.log(discuss[i]);



            }


            commentitem = {
              id: id,
              image: image,
              name: name,
              comment: comment,
              time: time,
              userid: userid,
              discuss: discuss
            }
            console.log(commentitem);
            commentlis = commentlis.concat(commentitem)


            that.setData({
              comment: commentlis
            })
            console.log(that.data.comment);
          },
          fail: function () {

          },
          complete: function () {

          }
        })

      }
    })

  },
  loadcomment: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        /**
         * 评论详情
         */
        wx.request({
          url: baseurl + "group/getHeadlineCommentList",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            headlineId: that.data.dynamicid,
            pageSize: 1000000
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log('commentdetail');
            console.log(res);
            var item = res.data.data;
            var groupname = item.name;
            var id = []
            var userid = []
            var name = []
            var time = []
            var comment = []

            var discuss = []
            var discussitem = []


            var imageitem = []
            var image = []

            var commentitem = {}
            var commentlis = []


            for (var i = 0; i < res.data.data.result.length; ++i) {
              item = res.data.data.result[i]
              id = id.concat(item.id)
              image = image.concat(item.fromUserImageLink)
              name = name.concat((item.fromUserName))
              comment = comment.concat((item.record))
              time = time.concat(formatTime(item.gmtCreate, "Y.M.D"))
              userid = item.fromUserId;
              var discussname = []
              var discusscomment = []
              var parentcommentId = []
              var discussuserId = []
              var discussid = []
              for (var j = 0; j < item.subCommentList.length; j++) {
                var items = item.subCommentList[j]
                discussname = discussname.concat(items.fromUserName + "回复" + items.toUserName)
                discusscomment = discusscomment.concat(items.record)
                parentcommentId = parentcommentId.concat(items.toUserId)
                discussuserId = discussuserId.concat(items.fromUserId)
                discussid = discussid.concat(items.id)
              }

              discuss[i] = {
                name: discussname,
                comment: discusscomment,
                parentcommentId: parentcommentId,
                discussuserId: discussuserId,
                discussid: discussid
              }
              console.log();
              console.log(discuss[i]);



            }


            commentitem = {
              id: id,
              image: image,
              name: name,
              comment: comment,
              time: time,
              userid: userid,
              discuss: discuss
            }
            commentlis = commentlis.concat(commentitem)


            that.setData({
              comment: commentlis
            })
            console.log(that.data.comment);
          },
          fail: function () {

          },
          complete: function () {

          }
        })

      }
    })

  },

  commentinput: function (e) {
    this.setData({
      mycomment: e.detail.value
    })
  },
  comment: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        /**
     * 评论
     */
        if (that.data.mycomment == null) {
          wx.showToast({
            title: '请输入评论',
            icon: 'loading',
            duration: 300
          })
        } else {
          wx.request({
            url: baseurl + "group/createHeadlineComment",
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            data: {
              headlineId: that.data.dynamicid,
              record: that.data.mycomment
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'token': token
            }, // 设置请求的 header
            success: function (res) {
              if (res.data.code == 0) {
                wx.showToast({
                  title: '评论成功',
                  icon: 'success',
                  duration: 500
                })
                that.setData({
                  mycomment: null,
                  dynamicspeake: that.data.dynamicspeake + 1
                })
                that.loadcomment();
              }
              else {
                if (res.data.code == 500) {
                  wx.showModal({
                    title: '评论失败',
                    content: '内容过长！',
                    success: function (res) {
                      if (res.confirm) {

                      } else {

                      }

                    }
                  })
                } else {
                  wx.showModal({
                    title: '评论失败',
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
            fail: function () {

            },
            complete: function () {

            }
          })
        }

      }
    })

  },
  discuss: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        /**
     * 评论
     */
        var data = {
          headlineId: that.data.dynamicid,
          record: that.data.mycomment,
          parentCommentId: that.data.parentCommentId
        }
        console.log(data);
        if (that.data.mycomment == null) {
          wx.showToast({
            title: '请输入评论',
            icon: 'loading',
            duration: 300
          })
        } else {

          wx.request({
            url: baseurl + "group/createHeadlineComment",
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            data: {
              headlineId: that.data.dynamicid,
              record: that.data.mycomment,
              parentCommentId: that.data.parentCommentId
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'token': token
            }, // 设置请求的 header
            success: function (res) {
              if (res.data.code == 0) {
                wx.showToast({
                  title: '评论成功',
                  icon: 'success',
                  duration: 500
                })
                that.setData({
                  mycomment: null,
                  dynamicspeake: that.data.dynamicspeake + 1
                })
                that.loadcomment();
              }
              else {
                if (res.data.code == 500) {
                  wx.showModal({
                    title: '评论失败',
                    content: '内容过长！',
                    success: function (res) {
                      if (res.confirm) {

                      } else {

                      }

                    }
                  })
                } else {
                  wx.showModal({
                    title: '评论失败',
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
            fail: function () {

            },
            complete: function () {

            }
          })

        }

      }
    })
  },
  great: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;

        if (that.data.praiseByCurrentUser) {
          /**
         * 取消点赞
         */
          wx.request({
            url: baseurl + "group/canclePraiseHeadline",
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            data: {
              id: that.data.dynamicid,
              pageSize: 1000000
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'token': token
            }, // 设置请求的 header
            success: function (res) {
              if (res.data.code == '0') {
                wx.showToast({
                  title: '取消点赞',
                  icon: 'success',
                  duration: 500
                })
                that.setData({
                  dynamicgreate: that.data.dynamicgreate - 1,
                  praiseByCurrentUser: false
                })

              }
            },
            fail: function () {

            },
            complete: function () {

            }
          })
        } else {
          /**
           * 点赞
           */
          wx.request({
            url: baseurl + "group/praiseHeadline",
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            data: {
              id: that.data.dynamicid,
              pageSize: 1000000
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'token': token
            }, // 设置请求的 header
            success: function (res) {
              if (res.data.code == '0') {
                wx.showToast({
                  title: '点赞成功',
                  icon: 'success',
                  duration: 500
                })
                that.setData({
                  dynamicgreate: that.data.dynamicgreate + 1,
                  praiseByCurrentUser: true
                })

              }
            },
            fail: function () {

            },
            complete: function () {

            }
          })
        }

      }
    })
  },
  collect: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;

        if (that.data.collectByCurrentUser) {
          /**
        * 取消收藏
        */
          wx.request({
            url: baseurl + "group/cancelCollectHeadline",
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            data: {
              id: that.data.dynamicid,
              pageSize: 1000000
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'token': token
            }, // 设置请求的 header
            success: function (res) {
              if (res.data.code == '0') {
                wx.showToast({
                  title: '取消收藏',
                  icon: 'success',
                  duration: 500
                })
                that.setData({
                  dynamiccollect: that.data.dynamiccollect - 1,
                  collectByCurrentUser: false
                })
              }

            },
            fail: function () {

            },
            complete: function () {

            }
          })
        } else {
          /**
           * 收藏这个
           */
          wx.request({
            url: baseurl + "group/collectHeadline",
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            data: {
              id: that.data.dynamicid,
              pageSize: 1000000
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'token': token
            }, // 设置请求的 header
            success: function (res) {
              if (res.data.code == '0') {
                wx.showToast({
                  title: '收藏成功',
                  icon: 'success',
                  duration: 500
                })
                console.log(that.data.dynamiccollect);
                that.setData({
                  dynamiccollect: that.data.dynamiccollect + 1,
                  collectByCurrentUser: true
                })
              }

            },
            fail: function () {

            },
            complete: function () {

            }
          })
        }

      }
    })
  },
  /**
 * 处理消息
 */
  morediscuss: function (e) {
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: 'morediscuss?id=' + this.data.dynamicid + '&commentindex=' + e.currentTarget.id
    })
  },

  thisopaddrbox: function (e) {
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../account/opaddrbox?id=' + e.currentTarget.id + '&typeid=0',
    })
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '搭闲小程序',
      desc: '头条分享',
      path: '/pages/group/dynamicdetail?id=' + this.data.dynamicid,
      success: function (res) {
        // 转发成功
        wx.getStorage({
          key: "token",
          success: function (res) {

            var token = res.data;
            var data = {
              id: that.data.dynamicid
            }
            wx.request({
              url: baseurl + "group/increaseHeadlineShareCount",
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              data: data,
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': token
              }, // 设置请求的 header
              success: function (res) {
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