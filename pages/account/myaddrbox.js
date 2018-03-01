//index.js
//获取应用实例
var app = getApp()
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
    userInfo: {},
    infoid:null,
    group: {

    },
    wordindex: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    search: {
      searchValue: '',
      showClearBtn: false
    },
    searchResult: [],
  },
  thismygroup: "",
  onLoad: function (res) {
    wx.setNavigationBarTitle({
      title: '通讯录'
    })
    this.setData({
      userid: res.id
    })
    console.log(res);
    this.loadgroupdetail();
    console.log(this.data.thismygroup);
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
 * 获取当前群组的介绍
 * 群名称
 * 群头条
 * 群通讯录
 */
  loadgroupdetail: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        /**
         * 群通讯录
         */
        wx.request({
          url: baseurl + "user/getAllUserFriend",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            id: that.data.groupid,
            pageSize: 1000000
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log('我的通讯录');
            console.log(res);
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
                userid = userid.concat(peopleinfo.id);
                url = url.concat(peopleinfo.imageLink);
                groupname = groupname.concat(peopleinfo.nickName);
                if (peopleinfo.jobDuty.name.length > 0) {
                  groupinfo = groupinfo.concat(peopleinfo.jobDuty.name);
                }
                else if (generation(peopleinfo.generation).length > 0) {
                  groupinfo = groupinfo.concat(generation(peopleinfo.generation));
                }
                else if (peopleinfo.jobDuty.name > 0 && generation(peopleinfo.generation).length > 0) {
                  groupinfo = groupinfo.concat(item.userIndustry + "|" + generation(peopleinfo.generation));
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
              userid = userid.concat(peopleinfo.id);
              url = url.concat(peopleinfo.imageLink);
              groupname = groupname.concat(peopleinfo.nickName);
             
              if (peopleinfo.jobDuty.name.length > 0) {
                groupinfo = groupinfo.concat(peopleinfo.jobDuty.name);
              }
              else if (generation(peopleinfo.generation).length > 0) {
                groupinfo = groupinfo.concat(generation(peopleinfo.generation));
              }
              else if (peopleinfo.jobDuty.name > 0 && generation(peopleinfo.generation).length > 0) {
                groupinfo = groupinfo.concat(item.userIndustry + "|" + generation(peopleinfo.generation));
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
  opaddrbox:function(e){
    wx.navigateTo({
      url: 'opaddrbox?id=' + e.currentTarget.id + '&typeid=0',
    })
   
  }

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
