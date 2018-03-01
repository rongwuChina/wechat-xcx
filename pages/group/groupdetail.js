//index.js
//获取应用实例
var app = getApp()
var baseurl = "https://test.morpx.com/";
require('../../utils/util.js')
var city = require('../../utils/allcity.js')
Page({
  //页面数据变量设置
  data: {
    writeshow:true,
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
    tagshow: true,
    toptabnow: "toptabnow",
    toptabnow2: "",
    groupid: null,
    dynamic: {
     
    },
    imgwidth: [],
    allgroupwhow: false,
    mygroupshow: true,
    bottomnow1: "bottomnow",
    bottomnow2: "",
    joinmsg: "申请加群",
    thejoinmsg: "",
    joinshow: true,
    myownshow: true,
    wordindex: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    group0: {
      
    },
    group1: {
      
    },
    group2: {
      
    },
    group2: {
      
    },
    group: [{
      
    }],
    imgwidth: [],
    search: {
      searchValue: '',
      showClearBtn: false
    },
    searchResult: [],
    city: "",
    lineHeight: "",
    winHeight: "",
    currentPage: 0,
    deletethis: true,//踢人
  },

  /**
   * 群动态
   * 群成员
   * 群通讯录
   * 发动态
   */
  onLoad: function (res) {
    this.setData({
      groupid: res.groupid
    })
    this.loadgroupdetail(1);

    //将this赋值到that ，这应该不用多说
    var that = this;
    //获取allcity.js 中city的数据
    var cityChild = city.City[0];

    // wx.getSystemInfo 获取屏幕参数，不懂的可以去参考一下 微信小程序API ，这里不多说
    wx.getSystemInfo({
      success: function (res) {
        //计算单个的字母高度 
        //这里为什么是减去一个100 然后除以22 诸位可以想一想哈
        // 赋值给全局变量 lineHeight ，后面是要用到这个变量的;
        var lineHeight = (res.windowHeight - 100) / 22;

        //赋值给 data  已供 wxml 调用
        that.setData({
          city: cityChild,
          winHeight: res.windowHeight - 40, //<scroll-view /> 的高度,减去40 是因为有一个40的页头
          lineHeight: lineHeight
        })

      }
    })

    //
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
    this.loadgroupdetail(1);
  },
  toptapfunc: function (e) {
    this.setData({
      tagshow: this.data.tagshow == false ? true : false,
      toptabnow: this.data.tagshow == false ? "toptabnow" : "toptabnow",
      toptabnow2: this.data.tagshow == false ? "" : "",
      bottomnow1: "bottomnow",
      bottomnow2: "",
      group: this.data.group,
      othergroup: false,
      mygroupshow: true
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
  },
  dynamicdetail: function (res) {

    var id = res.currentTarget.id;
    wx.navigateTo({
      url: 'dynamicdetail?id=' + id
    })
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
    this.setData({
      overseacher: true,
      seacher: false
    })
    const val = this.data.search.searchValue;
    if (val) {
      const that = this,
        app = getApp();
      wx.showToast({
        title: '搜索中',
        icon: 'loading'
      });

      /**
       * A-z-sss
       */
      var userid = [];
      var url = [];
      var groupname = [];
      var groupinfo = [];
      var groupintro = [];
      var groupiconitem = [];
      var groupicon = [];
      var item3 = {};
      var numb = 0;
      for (var i = 0; i < that.data.wordindex.length; ++i) {
        if (that.data.group[i] != undefined && that.data.group[i] != null) {
          for (var key = 0; key < that.data.group[i].url.length; ++key) {
            if (that.data.group[i].groupname[key].includes(this.data.search.searchValue)) {


              var peopleinfo = that.data.group[i];
              userid = userid.concat(peopleinfo.userid[key]);
              url = url.concat(peopleinfo.url[key]);
              groupname = groupname.concat(peopleinfo.groupname[key]);
              groupinfo = groupinfo.concat(peopleinfo.groupinfo[key]);
              groupintro = groupintro.concat(peopleinfo.groupintro[key]);
              if (peopleinfo.groupicon[key] != null && peopleinfo.groupicon[key] != undefined) {
                for (var tt = 0; tt < peopleinfo.groupicon[key].length; ++tt) {
                  groupiconitem = groupiconitem.concat(peopleinfo.groupicon[key][tt]);
                }
                groupicon[numb] = groupiconitem;
              }
              numb = numb + 1
            }
          }
        }
      }


      for (var key = 0; key < that.data.group3.url.length; ++key) {
        if (that.data.group3.groupname[key].includes(this.data.search.searchValue)) {


          var peopleinfo = that.data.group3;
          userid = userid.concat(peopleinfo.userid[key]);
          url = url.concat(peopleinfo.url[key]);
          groupname = groupname.concat(peopleinfo.groupname[key]);
          groupinfo = groupinfo.concat(peopleinfo.groupinfo[key]);
          groupintro = groupintro.concat(peopleinfo.groupintro[key]);
          if (peopleinfo.groupicon[key] != null && peopleinfo.groupicon[key] != undefined) {
            for (var tt = 0; tt < peopleinfo.groupicon[key].length; ++tt) {
              groupiconitem = groupiconitem.concat(peopleinfo.groupicon[key][tt]);
            }
            groupicon[numb] = groupiconitem;
          }
          numb = numb + 1

        }
      }

      for (var key = 0; key < that.data.group0.url.length; ++key) {

        if (that.data.group0.groupname[key].includes(this.data.search.searchValue)) {


          var peopleinfo = that.data.group0;
          userid = userid.concat(peopleinfo.userid[key]);
          url = url.concat(peopleinfo.url[key]);
          groupname = groupname.concat(peopleinfo.groupname[key]);
          groupinfo = groupinfo.concat(peopleinfo.groupinfo[key]);
          groupintro = groupintro.concat(peopleinfo.groupintro[key]);
          if (peopleinfo.groupicon[key] != null && peopleinfo.groupicon[key] != undefined) {
            for (var tt = 0; tt < peopleinfo.groupicon[key].length; ++tt) {
              groupiconitem = groupiconitem.concat(peopleinfo.groupicon[key][tt]);
            }
            groupicon[numb] = groupiconitem;
          }
          numb = numb + 1
        }
      }
      for (var key = 0; key < that.data.group1.url.length; ++key) {
        if (that.data.group1.groupname[key].includes(this.data.search.searchValue)) {


          var peopleinfo = that.data.group1;
          userid = userid.concat(peopleinfo.userid[key]);
          url = url.concat(peopleinfo.url[key]);
          groupname = groupname.concat(peopleinfo.groupname[key]);
          groupinfo = groupinfo.concat(peopleinfo.groupinfo[key]);
          groupintro = groupintro.concat(peopleinfo.groupintro[key]);
          if (peopleinfo.groupicon[key] != null && peopleinfo.groupicon[key] != undefined) {
            for (var tt = 0; tt < peopleinfo.groupicon[key].length; ++tt) {
              groupiconitem = groupiconitem.concat(peopleinfo.groupicon[key][tt]);
            }
            groupicon[numb] = groupiconitem;
          }
          numb = numb + 1

        }
      }

      for (var key = 0; key < that.data.group2.url.length; ++key) {

        if (that.data.group2.groupname[key].includes(this.data.search.searchValue)) {


          var peopleinfo = that.data.group2;
          userid = userid.concat(peopleinfo.userid[key]);
          url = url.concat(peopleinfo.url[key]);
          groupname = groupname.concat(peopleinfo.groupname[key]);
          groupinfo = groupinfo.concat(peopleinfo.groupinfo[key]);
          groupintro = groupintro.concat(peopleinfo.groupintro[key]);
          if (peopleinfo.groupicon[key] != null && peopleinfo.groupicon[key] != undefined) {
            for (var tt = 0; tt < peopleinfo.groupicon[key].length; ++tt) {
              groupiconitem = groupiconitem.concat(peopleinfo.groupicon[key][tt]);
            }
            groupicon[numb] = groupiconitem;
          }
          numb = numb + 1

        }
      }

      item3 = {
        userid: userid,
        url: url,
        groupname: groupname,
        groupinfo: groupinfo,
        groupintro: groupintro,
        groupicon: groupicon
      }
      that.setData({
        group4: item3,
        overseacher: true
      })

      wx.hideToast();
    }
  },
  defaultseach: function () {
    this.setData({
      overseacher: false,
      seacher: true,
      'search.showClearBtn': false,
      'search.searchValue': ''
    })
  },
  /**
   * 个人名片
   */
  opaddrbox: function (e) {
    wx.navigateTo({
      url: '../account/opaddrbox?id=' + e.currentTarget.id + "&toolid=1&groupid=" + this.data.groupid,
    })
  },
  //管理员
  opaddrbox2: function (e) {
    wx.navigateTo({
      url: '../account/opaddrbox?id=' + e.currentTarget.id + "&toolid=2&groupid=" + this.data.groupid,
    })
  },
  //写手
  opaddrbox3: function (e) {
    wx.navigateTo({
      url: '../account/opaddrbox?id=' + e.currentTarget.id + "&toolid=3&groupid=" + this.data.groupid,
    })
  },
  writedynamic: function () {
    wx.navigateTo({
      url: 'writedynamic?groupid=' + this.data.groupid,
    })
  },
  writesub:function(){
    this.setData({
      joinshow: false
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
          groupId: that.data.groupid,
          content: e.detail.value.joingroupmsg
        }
        console.log(data)
        wx.request({
          url: baseurl + "group/applyEditor",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: data,
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log('申请加群');
            console.log(res);
            if (res.data.code == 0) {
              wx.showToast({
                title: '申请已发出',
                icon: 'success',
                duration: 800
              })
              
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
            that.setData({
              joinshow: true,
              thejoinmsg: ""
            })
          }
        })
      }
    })

  },
  joinreset: function (e) {

    this.setData({
      joinshow: this.data.joinshow == true ? false : true,
      thejoinmsg: ""
    })
  },
  groupset: function () {
    console.log('gogogo');
     wx.navigateTo({
        url: 'groupset?groupid=' + this.data.groupid,
      })
  },

  addpeople: function () {
    wx.navigateTo({
      url: 'addnewpeople?groupid=' + this.data.groupid,
    })
  },
  deletpeople: function () {
    wx.navigateTo({
      url: 'deletpeople?groupid=' + this.data.groupid,
    })
  },
  /**
   * 获取当前群组的介绍
   * 群名称
   * 群头条
   * 群通讯录
   */
  loadgroupdetail: function (numb) {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;

        /**
         * 群名称
         */
        wx.request({
          url: baseurl + "group/getGroup",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            id: that.data.groupid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            var item = res.data.data;
            var groupname = item.name;
            var currentUserRole = item.currentUserRole
            var groupstatus
            var url
            var  groupinfo
            var  groupintro
            console.log(res);
            var canset = false;
            if (currentUserRole == 1 || currentUserRole == 2 || currentUserRole == 3) {
              var writeshow = false;
            }
            url = res.data.data.imageLink
            groupinfo = res.data.data.memberNum + "人"
            groupintro = res.data.data.note
            if (res.data.data.currentUserJoinStatus == -1) {
              groupstatus = 3
            }
            else if (res.data.data.currentUserJoinStatus == 0) {
              groupstatus = 0
            }
            else if (res.data.data.currentUserJoinStatus == 1) {
              groupstatus = 1
            }
            else if (res.data.data.currentUserJoinStatus == 2) {
              groupstatus = 2
            }
            wx.setNavigationBarTitle({
              title: groupname
            })
            that.setData({
              groupname: groupname,
              writeshow: writeshow,
              groupstatus: groupstatus,
              url: url,
              groupinfo: groupinfo,
              groupintro: groupintro
            })

          },
          fail: function () {

          },
          complete: function () {
            wx.hideToast();
          }
        })
        /**
         * 群头条
         */
        wx.request({
          url: baseurl + "group/getGroupHeadlineList",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            groupId: that.data.groupid,
            pageSize: 20,
            currentPage: numb
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
            var userid = []
            for (var i = 0; i < res.data.data.result.length; ++i) {
              item = res.data.data.result[i]
              id = id.concat(item.id)
              userid = userid.concat(item.userId)
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

            if (that.data.numb > 1) {
              that.setData({
                dynamic: {
                  userid: that.data.dynamic.userid.concat(userid),
                  id: that.data.dynamic.id.concat(id),
                  people: that.data.dynamic.people.concat(people),
                  groupname: that.data.dynamic.groupname.concat(groupname),
                  groupinfo: that.data.dynamic.groupinfo.concat(groupinfo),
                  time: that.data.dynamic.time.concat(time),
                  title: that.data.dynamic.title.concat(title),
                  image: that.data.dynamic.image.concat(image),
                  see: that.data.dynamic.see.concat(see),
                  speake: that.data.dynamic.speake.concat(speake),
                  greate: that.data.dynamic.greate.concat(greate),
                  share: that.data.dynamic.share.concat(share),
                },
                imgwidth: that.data.imgwidth.concat(dynamicimage(image)),
                nextpage: res.data.data.pageInfo.hasNext
              })
            } else {
              that.setData({
                dynamic: {
                  userid: userid,
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
                  share: share,
                  // currentPage: currentPage+1
                },
                imgwidth: dynamicimage(image),
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
          },
          fail: function () {

          },
          complete: function () {
            wx.hideToast();
          }
        })
        /**
         * 群通讯录
         */
        wx.request({
          url: baseurl + "group/getAllGroupMember",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            id: that.data.groupid,
            pageSize: 100
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log('群通讯录');
            console.log(res);
            var wordindex;
            wordindex = that.data.wordindex;

            var people = res.data.data.classifyByLetterMap;
            var groupmember = [];
            var userid = [];
            var url = [];
            var groupname = [];
            var groupinfo = [];
            var groupintro = [];
            var groupiconitem = [];
            var groupicon = [];
            var item0 = {};
            var item1 = {};
            var item2 = {};
            var item = {};
            /**
             * 群主
             */
            var people0 = res.data.data.owner;
            var peopleinfo = people0;
            console.log(peopleinfo);
            if (peopleinfo.jobDuty == undefined || peopleinfo.jobDuty.name == undefined) {
              var jobduty = '';
            } else {
              var jobduty = peopleinfo.jobDuty.name;
            }
            console.log(res);
            userid = userid.concat(peopleinfo.id);
            url = url.concat(peopleinfo.imageLink);
            groupname = groupname.concat(peopleinfo.nickName);
            if (jobduty.length > 0) {
              groupinfo = groupinfo.concat(jobduty);
            }
            else if (generation(peopleinfo.generation).length > 0) {
              groupinfo = groupinfo.concat(generation(peopleinfo.generation));
            }
            else if (jobduty.length > 0 && generation(peopleinfo.generation).length > 0) {
              groupinfo = groupinfo.concat(jobduty + "|" + generation(peopleinfo.generation));
            }
            groupintro = groupintro.concat(peopleinfo.note);
            for (var tt = 0; tt < peopleinfo.tagList.length; ++tt) {
              groupiconitem = groupiconitem.concat(peopleinfo.tagList[tt].name);
            }
            groupicon[0] = groupiconitem;

            item0 = {
              userid: userid,
              url: url,
              groupname: groupname,
              groupinfo: groupinfo,
              groupintro: groupintro,
              groupicon: groupicon
            }

            that.setData({
              group0: item0
            })
            var groupmember = [];
            var userid = [];
            var url = [];
            var groupname = [];
            var groupinfo = [];
            var groupintro = [];
            var groupiconitem = [];
            var groupicon = [];
            var item0 = {};
            var item1 = {};
            var item2 = {};
            var item = {};
            /**
             * 管理员
             */

            var people1 = res.data.data.adminUserList;
            for (var key = 0; key < people1.length; ++key) {
              var peopleinfo = people1[key];
              if (peopleinfo.jobDuty == undefined || peopleinfo.jobDuty.name == undefined) {
                var jobduty = '';
              } else {
                var jobduty = peopleinfo.jobDuty.name;
              }
              userid = userid.concat(peopleinfo.id);
              url = url.concat(peopleinfo.imageLink);
              groupname = groupname.concat(peopleinfo.nickName);
              if (jobduty.length > 0) {
                groupinfo = groupinfo.concat(jobduty);
              }
              else if (generation(peopleinfo.generation).length > 0) {
                groupinfo = groupinfo.concat(generation(peopleinfo.generation));
              }
              else if (jobduty.length > 0 && generation(peopleinfo.generation).length > 0) {
                groupinfo = groupinfo.concat(jobduty + "|" + generation(peopleinfo.generation));
              }
              groupintro = groupintro.concat(peopleinfo.note);
              for (var tt = 0; tt < peopleinfo.tagList.length; ++tt) {
                groupiconitem = groupiconitem.concat(peopleinfo.tagList[tt].name);
              }
              groupicon[key] = groupiconitem;


            }
            item1 = {
              userid: userid,
              url: url,
              groupname: groupname,
              groupinfo: groupinfo,
              groupintro: groupintro,
              groupicon: groupicon
            }
            that.setData({
              group1: item1
            })
            var groupmember = [];
            var userid = [];
            var url = [];
            var groupname = [];
            var groupinfo = [];
            var groupintro = [];
            var groupiconitem = [];
            var groupicon = [];
            var item0 = {};
            var item1 = {};
            var item2 = {};
            var item = {};
            /**
             * 写手
             */
            var people2 = res.data.data.editorUserList;
            for (var key in people2) {
              var peopleinfo = people2[key];
              if (peopleinfo.jobDuty == undefined || peopleinfo.jobDuty.name == undefined) {
                var jobduty = '';
              } else {
                var jobduty = peopleinfo.jobDuty.name;
              }
              userid = userid.concat(peopleinfo.id);
              url = url.concat(peopleinfo.imageLink);
              groupname = groupname.concat(peopleinfo.nickName);
              if (jobduty.length > 0) {
                groupinfo = groupinfo.concat(jobduty);
              }
              else if (generation(peopleinfo.generation).length > 0) {
                groupinfo = groupinfo.concat(generation(peopleinfo.generation));
              }
              else if (jobduty.length > 0 && generation(peopleinfo.generation).length > 0) {
                groupinfo = groupinfo.concat(jobduty + "|" + generation(peopleinfo.generation));
              }
              groupintro = groupintro.concat(peopleinfo.note);
              for (var tt = 0; tt < peopleinfo.tagList.length; ++tt) {
                groupiconitem = groupiconitem.concat(peopleinfo.tagList[tt].name);
              }
              groupicon[key] = groupiconitem;


            }
            item2 = {
              userid: userid,
              url: url,
              groupname: groupname,
              groupinfo: groupinfo,
              groupintro: groupintro,
              groupicon: groupicon
            }
            groupmember = item2
            that.setData({
              group2: groupmember
            })

            var people = res.data.data.classifyByLetterMap
            var groupmember = [];
            /**
             * 按照字母表顺序排序的群成员
             */
            for (var key in people) { 
              var userid = [];
              var url = [];
              var groupname = [];
              var groupinfo = [];
              var groupintro = [];
              var groupiconitem = [];
              var groupicon = [];
              var item0 = {};
              var item1 = {};
              var item2 = {};
              var item = {};
              for (var i = 0; i < people[key].length; ++i) {
                var peopleinfo = people[key][i];
                if (peopleinfo.jobDuty == undefined || peopleinfo.jobDuty.name == undefined) {
                  var jobduty = '';
                } else {
                  var jobduty = peopleinfo.jobDuty.name;
                }
                userid = userid.concat(peopleinfo.id);
                url = url.concat(peopleinfo.imageLink);
                groupname = groupname.concat(peopleinfo.nickName);
                if (jobduty.length>0){
                  groupinfo = groupinfo.concat(jobduty);
                }
                else if (generation(peopleinfo.generation).length>0){
                  groupinfo = groupinfo.concat(generation(peopleinfo.generation));
                }
                else if (jobduty.length > 0 && generation(peopleinfo.generation).length > 0) {
                  groupinfo = groupinfo.concat(jobduty + "|" + generation(peopleinfo.generation));
                }
                groupintro = groupintro.concat(peopleinfo.note);
                for (var tt = 0; tt < peopleinfo.tagList.length; ++tt) {
                  groupiconitem = groupiconitem.concat(peopleinfo.tagList[tt].name);
                }
                groupicon[i] = groupiconitem;
              }
              item = {
                userid: userid,
                url: url,
                groupname: groupname,
                groupinfo: groupinfo,
                groupintro: groupintro,
                groupicon: groupicon
              }
              for (var j = 0; j < wordindex.length; ++j) {
                if (wordindex[j] == key) {
                  groupmember[j] = item
                }
              }
            }
            that.setData({
              group: groupmember
            })
            /**
             * 名字混乱的众人
             */
            var groupmember = [];
            var userid = [];
            var url = [];
            var groupname = [];
            var groupinfo = [];
            var groupintro = [];
            var groupiconitem = [];
            var groupicon = [];
            var item0 = {};
            var item1 = {};
            var item2 = {};
            var item = {};
            var item3 = {};

            var people3 = res.data.data.unClassifyUserList;
            for (var key = 0; key < people3.length; ++key) {
              var peopleinfo = people3[key];
              if (peopleinfo.jobDuty == undefined || peopleinfo.jobDuty.name == undefined) {
                var jobduty = '';
              } else {
                var jobduty = peopleinfo.jobDuty.name;
              }
              userid = userid.concat(peopleinfo.id);
              url = url.concat(peopleinfo.imageLink);
              groupname = groupname.concat(peopleinfo.nickName);
              if (jobduty.length > 0) {
                groupinfo = groupinfo.concat(jobduty);
              }
              else if (generation(peopleinfo.generation).length > 0) {
                groupinfo = groupinfo.concat(generation(peopleinfo.generation));
              }
              else if (jobduty.length > 0 && generation(peopleinfo.generation).length > 0) {
                groupinfo = groupinfo.concat(jobduty + "|" + generation(peopleinfo.generation));
              }
              groupintro = groupintro.concat(peopleinfo.note);
              for (var tt = 0; tt < peopleinfo.tagList.length; ++tt) {
                groupiconitem = groupiconitem.concat(peopleinfo.tagList[tt].name);
              }
              groupicon[key] = groupiconitem;


            }
            item3 = {
              userid: userid,
              url: url,
              groupname: groupname,
              groupinfo: groupinfo,
              groupintro: groupintro,
              groupicon: groupicon
            }
            that.setData({
              group3: item3
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
  searchScrollLower: function () {
    console.log('加载下一页');
    var that = this
    if (that.data.nextpage) {
      setTimeout(function () {
        that.loadgroupdetail(that.data.numb + 1);
        that.setData({
          numb: that.data.numb + 1
        })
      }, 500)

    }
  },
  thisopaddrbox: function (e) {
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../account/opaddrbox?id=' + e.currentTarget.id + '&typeid=0',
    })
  },
  onShareAppMessage: function () {
    var that = this;

    var infoid = ''
    var infotype = 2333
    var usertype = that.data.groupstatus
    var url = that.data.url
    var name = that.data.groupname
    var groupinfo = that.data.groupinfo
    var groupintro = that.data.groupintro
    var infocontent = that.data.groupintro
    var inforstatus = ''
    var groupid = that.data.groupid

    return {
      title: '搭闲小程序',
      desc: '群名片',
      path: '/pages/account/opinfo?infoid=' + infoid + '&infotype=' + infotype + '&usertype=' + usertype + '&url=' + url + '&name=' + name + '&groupinfo=' + groupinfo + '&groupintro=' + groupintro + '&infocontent=' + infocontent + '&inforstatus=' + inforstatus + "&groupid=" + groupid,
      success: function (res) {
        console.log(res);
        // 转发成功
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 800
        })


      },
      fail: function (res) {
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