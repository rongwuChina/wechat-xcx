// pages/group/addnewpeople.js
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
    userInfo: {},
    infoid: null,
    userid: null,
    groupid: null,
    wordindex: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    hidemygroup: false,
    showpeople: true,
    group: {
     
    },
    group4: {
    },
    mygroup: {
      
    },
    search: {
      searchValue: '',
      showClearBtn: false
    },
    searchResult: [],
    toptabnow: 'toptabnow',
    toptabnow2: '',
    toptabnow3: '',
    myaddrshow: false,
    myaddrshow2: true,
    myaddrshow3: true
  },
  thismygroup: "",
  onLoad: function (res) {
    console.log(res);
    this.setData({
      groupid: res.groupid
    })
    this.loadpeople();
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
      'search.showClearBtn': false,
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
      var numb=0;
      for (var i = 0; i < that.data.wordindex.length;++i){
        if (that.data.group[i] != undefined && that.data.group[i] != null){
          for (var key = 0; key < that.data.group[i].url.length; ++key) {
            console.log(that.data.group[i].groupname[key]);
            console.log(this.data.search.searchValue);
            console.log(that.data.group[i].groupname[key].includes(this.data.search.searchValue));
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

              console.log(groupname);
            }
          }
        }
      }

      console.log(that.data.group3);
      for (var key = 0; key < that.data.group3.url.length; ++key) {
        console.log(that.data.group3.groupname[key]);
        console.log(this.data.search.searchValue);
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
          console.log(groupname);
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
        overseacher:true
      })
      console.log(item3);
      wx.hideToast();
      }
  },
  defaultseach: function(){
    this.setData({
      overseacher: false,
      seacher: true,
      'search.showClearBtn': false,
      'search.searchValue': ''
    })
  },

  /**
   * 切换tab
   */
  choosetab1: function () {
    this.setData({
      toptabnow: 'toptabnow',
      toptabnow2: '',
      toptabnow3: '',
      myaddrshow: false,
      myaddrshow2: true,
      myaddrshow3: true
    })
    this.loadpeople();
  },
  choosetab2: function () {
    this.setData({
      toptabnow: '',
      toptabnow2: 'toptabnow',
      toptabnow3: '',
      myaddrshow: true,
      myaddrshow2: false,
      myaddrshow3: true
    })
    this.loadpeople2();
  },
  choosetab3: function () {
    this.setData({
      toptabnow: '',
      toptabnow2: '',
      toptabnow3: 'toptabnow',
      myaddrshow: true,
      myaddrshow2: true,
      myaddrshow3: false
    })
    this.loadpeople3(1);
  },
  fromgroup: function () {
    wx.navigateTo({
      url: 'fromgroup',
    })
  },
  /**
 * 获取当前群组的介绍
 * 群名称
 * 群头条
 * 群通讯录
 */
  loadpeople: function (currentPage) {
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
            console.log(res);
            var item = res.data.data;
            var groupname = item.name;
            that.setData({
              groupname: groupname
            })
            wx.setNavigationBarTitle({
              title: groupname + '-加人',
            })
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
          url: baseurl + "user/getAllUserFriend",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            inviteGroupId: that.data.groupid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
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
             * 按照字母表顺序排序的群成员
             */
            for (var key in people) {
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
  loadpeople2: function (currentPage) {
    var that = this;
    that.setData({
      hidemygroup: false,
      showpeople: true,
    })
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        /**
         * 已有群里面的好友
         */
        wx.request({
          url: baseurl + "group/getUserGroup",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            inviteGroupId: that.data.groupid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            console.log(res);
            var groupid = [];
            var url = [];
            var groupname = [];
            var groupinfo = [];
            var groupintro = [];
            var grouptag = [];
            var groupstatus = [];

            for (var i = 0; i < res.data.data.length; ++i) {
              groupid = groupid.concat(res.data.data[i].id)
              url = url.concat(res.data.data[i].imageLink)
              groupname = groupname.concat(res.data.data[i].name)
              groupinfo = groupinfo.concat(res.data.data[i].memberNum + "人")
              groupintro = groupintro.concat(res.data.data[i].note)

            }
            that.setData({
              group: {
                groupid: groupid,
                url: url,
                groupname: groupname,
                groupinfo: groupinfo,
                groupintro: groupintro,
              }
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
  showthispeople: function (e) {
    
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        /**
             * 群通讯录
             */
        wx.request({
          url: baseurl + "group/getAllGroupMember",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            id: e.currentTarget.id,
            inviteGroupId: that.data.groupid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            if(res.data.code==0){
              that.setData({
                hidemygroup: true,
                showpeople: false,
              })
              var wordindex;
              wordindex = that.data.wordindex;

              var people = res.data.data.classifyByLetterMap;

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
              console.log(people3);
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
            }else{
              wx.showModal({
                title: '加人失败',
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
  loadpeople3: function (numb) {
    
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;

        /**
         * 小搭推荐加群
         */
        wx.request({
          url: baseurl + "group/getXiaodaRecommendUser",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            groupId: that.data.groupid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log('下达推荐');
            console.log(res);
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

            var people3 = res.data.data.result;
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
            if (that.data.numb > 1) {
              item3 = {
                userid: that.data.group.userid.concat(userid),
                url: that.data.group.url.concat(url),
                groupname: that.data.group.groupname.concat(groupname),
                groupinfo: that.data.group.groupinfo.concat(groupinfo),
                groupintro: that.data.group.groupintro.concat(groupintro),
                groupicon: that.data.group.groupicon.concat(groupicon)
              }
            }else{
              item3 = {
                userid: userid,
                url: url,
                groupname: groupname,
                groupinfo: groupinfo,
                groupintro: groupintro,
                groupicon: groupicon
              }
            }

            that.setData({
              group: item3,
              nextpage: res.data.data.pageInfo.hasNext
            })

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
      }
    })
  },
  searchScrollLower: function () {
    console.log('加载下一页');
    var that = this
    if (that.data.nextpage) {
      setTimeout(function () {
        that.loadpeople3(that.data.numb + 1);
        that.setData({
          numb: that.data.numb + 1
        })
      }, 500)

    }
  },
  choosethis: function (e) {
    console.log(e);
    this.setData({
      deletepeople: e.detail.value
    })
  },
  addsub: function () {
    var that = this;
    /**
     * 踢人
     */
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        var data = {
          id: that.data.groupid,
          userId: that.data.deletepeople
        };
        console.log(data);
        //保存修改
        wx.request({
          url: baseurl + "group/inviteJoinGroup",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: data,
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            if (res.data.code == '0') {
              wx.showToast({
                title: '邀请成功',
                icon: 'success',
                duration: 800
              })
            } else {
              wx.showModal({
                title: '邀请失败',
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
              title: '邀请失败',
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