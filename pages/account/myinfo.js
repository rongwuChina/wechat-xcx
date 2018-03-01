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
    infoid:null,
    group: {
     
    }
  },
  onLoad: function () {
    var that=this
    wx.setNavigationBarTitle({
      title: '我的消息',
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });
    this.loadinfo(1);
  },
  onShow: function () {
    
    this.loadinfo(1);
  },
  /**
   * 消息列表
   */
  loadinfo: function (numb) {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        token = res.data;
        /**
         * 发送接口
         */
        var data= {
          pageSize: 20,
          currentPage: numb
        }
        console.log(data);
        wx.request({
          url: baseurl + "user/getUserMessageList",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            pageSize: 20,
            currentPage: numb
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log('infolist');
            console.log(res);
            var groupid = [];
            var url = [];
            var groupname = [];
            var groupinfo = [];
            var groupintro = [];
            var groupintroli
            var grouptag = [];
            var grouptagli;
            var groupstatus = [];
            var grouptype
            var infoid=[];
            var infotool=[];
            var infotype2 = [];
            var usertype;
            var usertype2 = [];
            var groupdetail=[];
            var inforstatus2=[];
            var userid=[];
            var headlineCommentId = []
            var parentHeadlineCommentId = []

            for (var i = 0; i < res.data.data.result.length; ++i) {
              
              infoid = infoid.concat(res.data.data.result[i].message.id)
              //console.log(i);
              
              // if (res.data.data.result[i].currentUserJoinStatus == 0) {
              //   grouptag = grouptag.concat("加入群");
              // }else {
              //   grouptag = grouptag.concat("申请中...");
              // }
              var infotype = res.data.data.result[i].message.type;
              var inforstatus = res.data.data.result[i].message.status;
              inforstatus2 = inforstatus2.concat(inforstatus)
              var usertype= res.data.data.result[i].type;
              //从消息的分类开始做处理
              grouptype=false;
              if (res.data.data.result[i].message.content=='undefined'){
                groupintro = groupintro.concat("")
              }else{
                groupintro = groupintro.concat(res.data.data.result[i].message.content)
              }
              
              if (res.data.data.result[i].message.group!=undefined){
                url = url.concat(res.data.data.result[i].message.group.imageLink)
                groupname = groupname.concat(res.data.data.result[i].message.group.name)
                groupinfo = groupinfo.concat(res.data.data.result[i].message.group.memberNum + '人')
                groupdetail = groupdetail.concat(res.data.data.result[i].message.group.note)
              }else{
                url = url.concat(res.data.data.result[i].message.fromUser.imageLink)
                groupname = groupname.concat(res.data.data.result[i].message.fromUser.name)
                groupinfo = groupinfo.concat('')
                groupdetail = groupdetail.concat('')
              }
              userid = userid.concat('')
              headlineCommentId = headlineCommentId.concat(false)
              parentHeadlineCommentId = parentHeadlineCommentId.concat(false)
              switch (infotype){
                case 0: //用户主动加群
                 //再从消息目前的状态追踪
                  switch (inforstatus){
                    case 0:
                    //申请中
                      grouptagli ='申请中'
                    break;
                    case 1:
                    //已拒绝
                      grouptagli = '已拒绝'
                    break;
                    case 2:
                    //已同意
                      grouptagli = '已同意'
                    break;
                    case 3:
                    //已过期
                      grouptagli = '已过期'
                    break;
                  }
                  if (groupintro[groupname.length - 1] == '') {
                    groupintro[groupname.length - 1] == '用户主动加群'
                  }
                  infotool = infotool.concat(1)
                break;
                case 1: //管理员邀请加群
                  //再从消息目前的状态追踪
                  switch (inforstatus) {
                    case 0:
                      //申请中
                      grouptagli = '申请中'
                      break;
                    case 1:
                      //已拒绝
                      grouptagli = '已拒绝'
                      break;
                    case 2:
                      //已同意
                      grouptagli = '已同意'
                      break;
                    case 3:
                      //已过期
                      grouptagli = '已过期'
                      break;
                  }
                  if (groupintro[groupname.length - 1] == '') {
                    groupintro[groupname.length - 1] == '管理员邀请加群'
                  }
                  infotool = infotool.concat(1)
                break;
                case 2: //????//普通用户邀请好友加群
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
                      //已拒绝
                      grouptagli = '管理员已拒绝,用户无操作'
                      break;
                    case 2:
                      //已拒绝
                      grouptagli = '管理员接受,用户无操作'
                      break;
                    case 3:
                      //已拒绝
                      grouptagli = '用户已拒绝,管理员无操作'
                      break;
                    case 4:
                      //已同意
                      grouptagli = '用户接受,管理员无操作'
                      break;
                    case 5:
                      //已过期
                      grouptagli = '管理员拒绝,用户拒绝'
                      break;
                    case 6:
                      //已过期
                      grouptagli = '管理员拒绝,用户同意'
                      break;
                    case 7:
                      //已过期
                      grouptagli = '管理员同意,用户拒绝'
                      break;
                    case 8:
                      //已过期
                      grouptagli = '管理员接受，用户接受'
                      break;
                    case 9:
                      //已过期
                      grouptagli = '已过期'
                      break;
                  }
                  break;
                  if (groupintro[groupname.length - 1] == '') {
                    groupintro[groupname.length - 1] == '普通用户邀请好友加群'
                  }
                  infotool = infotool.concat(1)
                break;
                case 3://用户退群
                  //再从消息目前的状态追踪
                  switch (inforstatus) {
                    case 0:
                      //申请中
                      grouptagli = '退群中'
                      break;
                    case 1:
                      //已拒绝
                      grouptagli = '退群成功'
                      break;
                  }
                  if (groupintro[groupname.length - 1] == ''){
                    groupintro[groupname.length - 1] == '用户退群'
                  }
                  infotool = infotool.concat(1)
                  
                break;
                case 4://踢出群
                  //再从消息目前的状态追踪
                  switch (inforstatus) {
                    case 0:
                      //申请中
                      grouptagli = '踢出群中'
                      break;
                    case 1:
                      //已拒绝
                      grouptagli = '踢出群成功'
                    break;
                  }
                  infotool = infotool.concat(1)
                break;
                case 5: //动态回复
                  
                  grouptagli = ''
                  grouptype=true;
                  url[groupname.length - 1] = res.data.data.result[i].message.fromUser.imageLink
                  groupname[groupname.length - 1] = res.data.data.result[i].message.parentHeadlineCommentContent
                  groupintro[groupintro.length-1] = "回复你："+res.data.data.result[i].message.content
                  infotool = infotool.concat("s")
                  headlineCommentId[groupname.length - 1] = res.data.data.result[i].message.headlineCommentId
                  parentHeadlineCommentId[groupname.length - 1] = res.data.data.result[i].message.parentHeadlineCommentId
                  
                break;
                case 6: //申请加好友   显示个人形象
                  //再从消息目前的状态追踪
                  switch (inforstatus) {
                    case 0:
                      //申请中
                      grouptagli = '申请中'
                    break;
                    case 1:
                      //已拒绝
                      grouptagli = '已拒绝'
                      break;
                    case 2:
                      //已同意
                      grouptagli = '已同意'
                      break;
                    case 3:
                      //已过期
                      grouptagli = '已过期'
                      break;
                  }
                  url[groupname.length - 1] = res.data.data.result[i].message.fromUser.imageLink
                  groupname[groupname.length - 1] = res.data.data.result[i].message.fromUser.nickName
                  infotool = infotool.concat(7)
                  userid[groupname.length - 1] = res.data.data.result[i].toUser.id
                  
                break;
                case 7: //设置管理员
                  //再从消息目前的状态追踪
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
                  infotool = infotool.concat(1)
                  groupintro[groupname.length - 1] = '设置管理员'
                break;
                case 8: //取消管理员
                  //再从消息目前的状态追踪
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
                  groupintro[groupname.length - 1] = '取消管理员'
                  infotool = infotool.concat(1)
                break;
                case 9: //设置写手
                  //再从消息目前的状态追踪
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
                  groupintro[groupname.length - 1] = '设置写手'
                  infotool = infotool.concat(1)
                break;
                case 10: //取消写手
                  //再从消息目前的状态追踪
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
                  infotool = infotool.concat(1)
                  groupintro[groupname.length - 1] = '取消写手'
                break;
                case 11: //申请成为写手
                  //再从消息目前的状态追踪
                  switch (inforstatus) {
                    case 0:
                      //申请中
                      grouptagli = '申请中'
                      break;
                    case 1:
                      //已拒绝
                      grouptagli = '已拒绝'
                      break;
                    case 2:
                      //已同意
                      grouptagli = '已同意'
                      break;
                    case 3:
                      //已过期
                      grouptagli = '已过期'
                      break;
                  }
                  infotool = infotool.concat(1)
                break;
                case 12: //系统消息
                  grouptagli = ''
                  grouptype = true;
                  url[groupname.length - 1] = res.data.data.result[i].message.fromUser.imageLink
                  groupname[groupname.length - 1] = '系统消息'
                  infotool = infotool.concat("")
                break;
              }
              infotype2 = infotype2.concat(res.data.data.result[i].message.type)
              if (res.data.data.result[i].type == 1 || res.data.data.result[i].type == 3 || res.data.data.result[i].type == 5 || res.data.data.result[i].type == 7|| res.data.data.result[i].type == 9 || res.data.data.result[i].type == 11 || res.data.data.result[i].type == 17){
                usertype2 = usertype2.concat(1)
              }else{
                usertype2 = usertype2.concat(0)
              }
              
              grouptag = grouptag.concat(grouptagli);
              groupstatus = groupstatus.concat(res.data.data.result[i].currentUserJoinStatus)
            }
            if (that.data.numb > 1) {
              that.setData({
                group: {
                  infoid: that.data.group.infoid.concat(infoid),
                  groupid: that.data.group.groupid.concat(groupid),
                  infotype: that.data.group.infotype.concat(infotype2),
                  usertype: that.data.group.usertype.concat(usertype2),
                  url: that.data.group.url.concat(url),
                  groupname: that.data.group.groupname.concat(groupname),
                  groupinfo: that.data.group.groupinfo.concat(groupinfo),
                  groupintro: that.data.group.groupintro.concat(groupintro),
                  grouptag: that.data.group.grouptag.concat(grouptag),
                  groupstatus: that.data.group.groupstatus.concat(groupstatus),
                  infotool: that.data.group.groupstatus.concat(infotool),
                  groupdetail: that.data.group.groupdetail.concat(groupdetail), 
                  inforstatus: that.data.group.inforstatus.concat(inforstatus2),
                  userid: that.data.group.userid.concat(userid),
                  headlineCommentId: that.data.group.headlineCommentId.concat(headlineCommentId),
                  parentHeadlineCommentId: that.data.group.parentHeadlineCommentId.concat(parentHeadlineCommentId)
                },
                nextpage: res.data.data.pageInfo.hasNext
                
              })
            }else{
              that.setData({
                group: {
                  url: url,
                  infotype:infotype2,
                  usertype :usertype2,
                  groupname: groupname,
                  groupinfo: groupinfo,
                  groupintro: groupintro,
                  grouptag: grouptag,
                  groupstatus: groupstatus,
                  infoid: infoid,
                  groupdetail: groupdetail,
                  inforstatus: inforstatus2,
                  userid: userid,
                  headlineCommentId: headlineCommentId,
                  parentHeadlineCommentId: parentHeadlineCommentId,
                  groupid: groupid
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
    console.log(that.data.nextpage);
    if (that.data.nextpage) {
      setTimeout(function () {
        that.loadinfo(that.data.numb + 1);
        that.setData({
          numb: that.data.numb + 1
        })
      }, 500)

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
  grouppass: function (e) {
    console.log('hahaha');
    this.setData({
      grouppass: this.data.grouppass == false ? true : false
    })
  },
  funcname2: function (e) {
    return this.grouppass()
  },
  funcname1: function (e) {
    return this.joingroup()
  },
  funcname0: function () {
    return console.log('waiting....')
  },
  joinsubmit: function (e) {
    console.log("提交" + e.detail.value);
    this.setData({
      joinshow: this.data.joinshow == true ? false : true,
      thejoinmsg: ""
    })
  },
  joinreset: function (e) {
    console.log("重置");
    this.setData({
      joinshow: this.data.joinshow == true ? false : true,
      thejoinmsg: ""
    })
  },
  passsubmit: function (e) {
    console.log("提交" + e.detail.value);
    this.setData({
      grouppass: this.data.grouppass == true ? false : true,
      thejoinmsg: ""
    })

  },
  passreset: function (e) {
    console.log("重置");
    this.setData({
      grouppass: this.data.grouppass == true ? false : true,
      thejoinmsg: ""
    })
  },
  /**
   * 返回上一页按钮
   */
  goback: function () {
    console.log('1111')
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 处理消息
   */
  opinfo: function(e){
    var that=this;
    console.log(e.currentTarget.id);
    console.log(that.data.group);
    var item = e.currentTarget.id

   var infoid =that.data.group.infoid[item]
   var  infotype = that.data.group.infotype[item]
   var  usertype = that.data.group.usertype[item]
   var  url = that.data.group.url[item]
   var  name = that.data.group.groupname[item]
   var  groupinfo = that.data.group.groupinfo[item]
   var  groupintro = that.data.group.groupdetail[item]
   var  infocontent = that.data.group.groupintro[item]
   var inforstatus = that.data.group.inforstatus[item]
   var userid = that.data.group.userid[item]
   var headlineCommentId = that.data.group.headlineCommentId[item]
   var parentHeadlineCommentId = that.data.group.parentHeadlineCommentId[item]
    console.log('opinfo?infoid=' + infoid + '&infotype=' + infotype + '&usertype=' + usertype + '&url=' + url + '&name=' + name + '&groupinfo=' + groupinfo + '&groupintro=' + groupintro + '&infocontent=' + infocontent + '&inforstatus=' + inforstatus + '&userid' + userid);
  if (parentHeadlineCommentId==false){
     wx.navigateTo({
       url: 'opinfo?infoid=' + infoid + '&infotype=' + infotype + '&usertype=' + usertype + '&url='+ url + '&name=' + name + '&groupinfo=' + groupinfo + '&groupintro=' + groupintro + '&infocontent=' + infocontent + '&inforstatus=' + inforstatus + '&userid' + userid
     })
  }else{
    wx.navigateTo({
      url: '../group/morediscuss?headlineCommentId=' + headlineCommentId + "&parentHeadlineCommentId=" + parentHeadlineCommentId,
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