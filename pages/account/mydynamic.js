//index.js
//获取应用实例
var app = getApp()
var baseurl = "https://test.morpx.com/";
Page({
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
    tagshow: true,
    toptabnow: "toptabnow",
    toptabnow2: "",
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
    group: {
     
    },
    imgwidth: [],
    search: {
      searchValue: '',
      showClearBtn: false
    },
    searchResult: []
  },

  /**
   * 群动态
   * 群成员
   * 群通讯录
   * 发动态
   */
  onLoad: function (res) {
    wx.setNavigationBarTitle({
      title: '我的动态'
    })
    this.setData({
      userid: res.id
    })
    console.log(res);
    this.loadgroupdetail(1);
    //
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
    this.loadgroupdetail(1);
  },
  loadgroupdetail: function (numb) {
    console.log('detail');
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        /**
         * 我的群动态
         * /images/upload/File/组79.png
         * /images/upload/File/组1.png
         */
        wx.request({
          url: baseurl + "group/getUserHeadlineList",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            userId: that.data.userid,
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

            // that.setData({
            //   dynamic: {
            //     id: id,
            //     people: people,
            //     groupname: groupname,
            //     groupinfo: groupinfo,
            //     time: time,
            //     title: title,
            //     image: image,
            //     see: see,
            //     speake: speake,
            //     greate: greate,
            //     share: share,
            //     userid: userid
            //   },
            //   imgwidth: dynamicimage(image)
            // })
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
  dynamicdetail: function (e) {
    wx.navigateTo({
      url: '../group/dynamicdetail?id=' + e.currentTarget.id
    })
  },
  thisopaddrbox: function (e) {
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../account/opaddrbox?id=' + e.currentTarget.id + '&typeid=0',
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