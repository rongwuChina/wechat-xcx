//index.js
//获取应用实例
var app = getApp()
var baseurl = "https://test.morpx.com/";
Page({
  //页面数据变量设置
  data: { 
    dynamicid:null,
    parentCommentid:null,
    userid:null,
    discussthis: true,
    discussthis2:true,
    discussid:null,
    speakethis: false,
    discussfocus: false,
    discusstext: "0",
    toptab1: "发现群",
    toptab2: "我的群",
    tagshow: true,
    toptabnow: "toptabnow",
    toptabnow2: "",
    tagname: ["全部", "标签1", "标签2", "标签3", "标签4", "标签5", "标签6", "标签7", "标签8", "标签9"],
    dynamic: {
      people: ["http://morpx.net:8999/mu-web-agent/upload/qrcode/ebc83a31845fa0f76fd00b4184236ae18po7p.png"],
      groupname: ["阿拉丁不不不", "哈哈哈哈啊哈"],
      groupinfo: ["杭州|互联网|80后", "杭州|互联网|80后"],
      time: ["2018.10.09", "2017.11.11"],
      title: ["时间回退到今年六月，摩图科技在CES ASIA 2017上对大陆用户正式发布了小MU太空机器人（MU Spacebot），展会期间德勤中国一眼就相中这个有意思的小机器人，将其选中为百年庆的特殊礼品，并提出了定制需求。", "hahahaaaaaaaaaaaaaaaaaaaa",],
      image: [
        ["http://morpx.net:8999/mushop_cn/images/201705/goods_img/150_P_1495606140313.jpg", "http://morpx.net:8999/mushop_cn/images/201705/goods_img/150_P_1495606140313.jpg", "http://morpx.net:8999/mushop_cn/images/201705/goods_img/150_P_1495606140313.jpg"]
      ],
      see: [145],
      speake: [255],
      greate: [455],
      share: [655],
      groupfrom: ["人工智能"]

    },
    incomment: {
      image: "http://morpx.net:8999/mushop_cn/images/201705/goods_img/150_P_1495606140313.jpg",
      name: "DAvid",
      time: "09-15 18:55",
      comment: "有点意思呀"
    },
    comment: {
      userid:null,
      image: ["http://morpx.net:8999/mushop_cn/images/201705/goods_img/150_P_1495606140313.jpg", "http://morpx.net:8999/mushop_cn/images/201705/goods_img/150_P_1495606140313.jpg"],
      name: ["DAvid", "嘻嘻嘻"],
      time: ["09-15 18:55", "09-15 14:34"],
      comment: ["有点意思呀", "图画很美丽"],
      commenttype: ["回复 瞅瞅"]
    },
    headlineCommentId:null,
    parentHeadlineCommentId:null
  },
  thismygroup: "",
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
  },
  bottomtab2: function (e) {
    this.setData({
      allgroupshow: true,
      myownshow: false,
      bottomnow2: "bottomnow",
      bottomnow1: ""
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
    wx.setNavigationBarTitle({
      title: '更多评论'
    })
    console.log(res);
    this.setData({
      dynamicid: res.id,
      commentindex: res.commentindex,
      headlineCommentId: res.headlineCommentId,
      parentHeadlineCommentId: res.parentHeadlineCommentId
    })
    if (res.headlineCommentId==null){
      this.loadcomment();
    }else{
      this.loadcomment2();
    }
    
    
    
  },

  /**回复评论 盖楼 */
  speakethis: function (e) {

    if (this.data.speakethis) {
      this.setData({
        'speakethis': false,
        'discussthis': true,
        'discussthis': true,
        'discussfocus': false,
        'discusstext': "评论"
      })
    } else {
      this.setData({
        'speakethis': true,
        'discussthis': false,
        'discussthis2': true,
        'discussfocus': true,
        'discusstext': "评论",
         userid: 0
      })
    }
    
  },
  speakethis2: function (e) {

    if (this.data.speakethis) {
      this.setData({
        'speakethis': false,
        'discussthis': true,
        'discussthis2': true,
        'discussfocus': false,
        'discusstext': "回复" + this.data.comment.name[e.currentTarget.id]+"..."
      })
    } else {
      this.setData({
        'speakethis': true,
        'discussthis': true,
        'discussthis2':false,
        'discussfocus': true,
        'discusstext': "回复" + this.data.comment.name[e.currentTarget.id] + "...",
         userid: this.data.comment.discussuserid[e.currentTarget.id],
         discussid: this.data.comment.discussid[e.currentTarget.id],
      })
    }
  },
  nospeakethis: function () {
    if (this.data.speakethis) {
      this.setData({
        'speakethis': false,
        'discussthis': true,
        'discussthis2': true,
        'discussfocus': false,
      })
    }

  },
  /**
   * 处理消息
   */
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

            var i = that.data.commentindex;
            item = res.data.data.result[i]
            id = item.id
            image = item.fromUserImageLink
            name = item.fromUserName
            comment = item.record
            time = formatTime(item.gmtCreate, "Y.M.D")
            userid = item.fromUserId;

            var discussname = []
            var discussimage = []
            var discusscomment = []
            var discusscommenttype = []
            var parentcommentid = []
            var discusstime = []
            var discussuserid = []
            var discussid = []
            for (var j = 0; j < item.subCommentList.length; j++) {
              var items = item.subCommentList[j]
              discussimage = discussimage.concat(items.fromUserImageLink)
              discussname = discussname.concat(items.fromUserName)
              discusscomment = discusscomment.concat(items.record)
              if (items.toUserId == 0) {
                discusscommenttype = discusscommenttype.concat(items.toUserName)
              } else {
                discusscommenttype = discusscommenttype.concat("回复" + items.toUserName)
              }
              discusstime = discusstime.concat(formatTime(items.gmtCreate, "Y.M.D"))
              parentcommentid = parentcommentid.concat(items.toUserId)
              discussuserid = discussuserid.concat(items.fromUserId)
              discussid = discussid.concat(items.id)
            }
            discuss = {
              image: discussimage,
              name: discussname,
              time: discusstime,
              commenttype: discusscommenttype,
              comment: discusscomment,
              parentcommentid: parentcommentid,
              discussuserid: discussuserid,
              discussid: discussid
            }

            commentlis = {
              id: id,
              image: image,
              name: name,
              comment: comment,
              time: time,
              userid: userid,
            }
            

            that.setData({
              incomment: commentlis,
              comment: discuss,
              parentCommentid:id
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
  loadcomment2: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        /**
         * 评论详情
         */
        wx.request({
          url: baseurl + "group/getCommentListByParentId",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            parentCommentId: that.data.parentHeadlineCommentId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
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

            item = res.data.data
            id = item.id
            image = item.fromUserImageLink
            name = item.fromUserName
            comment = item.record
            time = formatTime(item.gmtCreate, "Y.M.D")
            userid = item.fromUserId;
            var headlineId = item.headlineId

            var discussname = []
            var discussimage = []
            var discusscomment = []
            var discusscommenttype = []
            var parentcommentid = []
            var discusstime = []
            var discussuserid = []
            var discussid = []
            for (var j = 0; j < item.subCommentList.length; j++) {
              var items = item.subCommentList[j]
              discussimage = discussimage.concat(items.fromUserImageLink)
              discussname = discussname.concat(items.fromUserName)
              discusscomment = discusscomment.concat(items.record)
              if (items.toUserId == 0) {
                discusscommenttype = discusscommenttype.concat(items.toUserName)
              } else {
                discusscommenttype = discusscommenttype.concat("回复" + items.toUserName)
              }
              discusstime = discusstime.concat(formatTime(items.gmtCreate, "Y.M.D"))
              parentcommentid = parentcommentid.concat(items.toUserId)
              discussuserid = discussuserid.concat(items.fromUserId)
              discussid = discussid.concat(items.id)
            }
            discuss = {
              image: discussimage,
              name: discussname,
              time: discusstime,
              commenttype: discusscommenttype,
              comment: discusscomment,
              parentcommentid: parentcommentid,
              discussuserid: discussuserid,
              discussid: discussid
            }

            commentlis = {
              id: id,
              image: image,
              name: name,
              comment: comment,
              time: time,
              userid: userid,
            }


            that.setData({
              incomment: commentlis,
              comment: discuss,
              parentCommentid: id,
              dynamicid: headlineId
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
  commentinput: function (e) {
    this.setData({
      mycomment: e.detail.value
    })
  },
  /**
   * 评论主评论
   */
  /**
 * 回复评论
 */
  discuss: function () {
    var that = this;
    if (that.data.mycomment == null) {
      wx.showToast({
        title: '请输入评论',
        icon: 'loading',
        duration: 300
      })
    } else {
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
          parentCommentId: that.data.parentCommentid,
          toUserId: that.data.userid
        }
        console.log("erro");
        console.log(data);

        wx.request({
          url: baseurl + "group/createHeadlineComment",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            headlineId: that.data.dynamicid,
            record: that.data.mycomment,
            parentCommentId: that.data.parentCommentid,
            toUserId: that.data.userid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            if(res.data.code==0){
              wx.showToast({
                title: '评论成功',
                icon: 'success',
                duration: 800
              })
              that.setData({
                mycomment: null
              })
              if (that.data.headlineCommentId == null) {
                that.loadcomment();
              } else {
                that.loadcomment2();
              }
            } else {
              that.setData({
                mycomment: null
              })
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
           
            
          },
          fail: function () {

          },
          complete: function () {
            
          }
        })

      }
    })
    }
  },
  discuss2: function () {
    var that = this;
    if (that.data.mycomment == null) {
      wx.showToast({
        title: '请输入评论',
        icon: 'loading',
        duration: 300
      })
    } else {
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
          parentCommentId: that.data.discussid,
          toUserId: that.data.userid
        }
        console.log(data);
        wx.request({
          url: baseurl + "group/createHeadlineComment",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            headlineId: that.data.dynamicid,
            record: that.data.mycomment,
            parentCommentId: that.data.parentCommentid,
            toUserId: that.data.userid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            if(res.data.code==0){
              wx.showToast({
                title: '回复成功',
                icon: 'success',
                duration: 800
              })
              that.setData({
                mycomment: null
              })
              if (that.data.headlineCommentId == null) {
                that.loadcomment();
              } else {
                that.loadcomment2();
              }
            }else{
              that.setData({
                mycomment: null
              })
              wx.showModal({
                title: '回复失败',
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
              title: '回复失败',
              icon: 'success',
              duration: 800
            })
          },
          complete: function () {
            
          }
        })

      }
    })
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
