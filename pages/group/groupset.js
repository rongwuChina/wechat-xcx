// pages/group/groupset.js
var baseurl = "https://test.morpx.com/";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupid:null,
    joinshow:true,
    group:{
      id:null,
      imageurl: "",
      groupname:"" ,
      groupinfo: "",
    },
    mytag: [],
    isJoinNeedReview: 0,
    isNeedFillUserInfo: 0,
    isShareUser: 0,
    isXiaodaRecommend: 0,
    isTopRanking: 0,
    isJoinNeedReview2: 0,
    isNeedFillUserInfo2: 0,
    isShareUse2: 0,
    isXiaodaRecommend2: 0,
    isTopRanking2: 0,
    adminhide:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
      wx.setNavigationBarTitle({
        title: '群设置',
      })
      
      this.setData({
        groupid: res.groupid
      })
      console.log(res);
      this.loadgroupdetail();
  },
  loadgroupdetail: function () {
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
            var mytag=[]
            var imageurl = item.imageLink
            var groupname = item.name
            var groupinfo = item.note
            var isJoinNeedReview = item.isJoinNeedReview
            var isNeedFillUserInfo = item.isNeedFillUserInfo
            var isShareUser = item.isShareUser
            var isXiaodaRecommend=item.isXiaodaRecommend
            var isTopRanking = item.isTopRanking

            for (var i = 0; i < item.tagList.length;++i){
              mytag = mytag.concat(item.tagList[i].name)
            }
            if (item.currentUserRole==1){
             var  adminhide = false
            }else{
             var  adminhide = true
            }

            that.setData({
              adminhide: adminhide,
              group: {
                imageurl: imageurl,
                groupname: groupname,
                groupinfo: groupinfo,
              },
              mytag: mytag,
              isJoinNeedReview: isJoinNeedReview,
              isNeedFillUserInfo: isNeedFillUserInfo,
              isShareUser: isShareUser,
              isXiaodaRecommend: isXiaodaRecommend,
              isTopRanking: isTopRanking == undefined ? 0 : isTopRanking,
              isJoinNeedReview2: isJoinNeedReview,
              isNeedFillUserInfo2: isNeedFillUserInfo,
              isShareUser2: isShareUser,
              isXiaodaRecommend2: isXiaodaRecommend,
              isTopRanking2: isTopRanking == undefined ? 0 : isTopRanking
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

  switchChange: function(e){
    switch(e.currentTarget.id){
      case '1':
        this.setData({
          isJoinNeedReview2: e.detail.value==true? 1:0, //加入需审核         
        })
      break;
      case '2':
        this.setData({         
          isTopRanking2: e.detail.value == true ? 1 : 0, //排序置顶         
        })
      break;
      case '3':
        this.setData({         
          isXiaodaRecommend2: e.detail.value == true ? 1 : 0,//是否小搭推荐         
        })
      break;
      case '4':
        this.setData({          
          isShareUser2: e.detail.value == true ? 1 : 0, //是否禁止群拉人          
        })
      break;
      case '5':
        this.setData({
          isNeedFillUserInfo2: e.detail.value == true ? 1 : 0,//是否需要完善个人信息
        })
      break;
    } 
    this.savegroupset();
  },
  savegroupset: function(){
    
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var data={
          id: that.data.groupid,
          isJoinNeedReview: that.data.isJoinNeedReview2, //加入需审核
          isTopRanking: that.data.isTopRanking2, //排序置顶
          isXiaodaRecommend: that.data.isXiaodaRecommend2,//是否小搭推荐
          isShareUser: that.data.isShareUser2, //是否禁止群拉人
          isNeedFillUserInfo: that.data.isNeedFillUserInfo2,//是否需要完善个人信息
          pageSize: 1000000
        }

        console.log(data);
        var token = res.data;
          wx.request({
            url: baseurl + "group/updateGroupConfig",
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            data: {
              id: that.data.groupid,
              isJoinNeedReview: that.data.isJoinNeedReview2, //加入需审核
              isTopRanking: that.data.isTopRanking2, //排序置顶
              isXiaodaRecommend: that.data.isXiaodaRecommend2,//是否小搭推荐
              isShareUser: that.data.isShareUser2, //是否禁止群拉人
              isNeedFillUserInfo: that.data.isNeedFillUserInfo2,//是否需要完善个人信息
              pageSize: 1000000
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'token': token
            }, // 设置请求的 header
            success: function (res) {
              console.log(res);
              if (res.data.code == '0') {
                wx.showToast({
                  title: '设置成功',
                  icon: 'success',
                  duration: 500
                })
                that.setData ({
                  isJoinNeedReview: that.data.isJoinNeedReview2, //加入需审核
                  isTopRanking: that.data.isTopRanking2, //排序置顶
                  isXiaodaRecommend: that.data.isXiaodaRecommend2,//是否小搭推荐
                  isShareUser: that.data.isShareUser2, //是否禁止群拉人
                  isNeedFillUserInfo: that.data.isNeedFillUserInfo2,//是否需要完善个人信息
                })
              }

            },
            fail: function () {
              console.log(res);
              if (res.data.code == '0') {
                wx.showToast({
                  title: '设置失败',
                  icon: 'loading',
                  duration: 500
                })
              }
            },
            complete: function () {

            }
          })


      }
    })
  },
  groupintroset: function(){
    wx.redirectTo({
       url: '../addgroup/addgroup?id=2&groupid='+this.data.groupid,
       success: function (res) {
         console.log(res)
       },
       fail: function (res) {
         console.log(res)
       }
     })
  },
  /*
*加入群聊
*/
  joingroup: function (e) {
    this.setData({
      joinshow:  false
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
          id: that.data.groupid,
          content: e.detail.value.joingroupmsg
        }
        console.log(data)
        wx.request({
          url: baseurl + "group/leftGroup",
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
                title: '退群申請已发出',
                icon: 'success',
                duration: 800
              })
              setTimeout(function(){
                wx.navigateTo({
                  url: '../index/index',
                })
              },800)
              
            } else {
              wx.showModal({
                title: '退群失败',
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
              title: '退群失败',
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
      joinshow: true,
      thejoinmsg: ""
    })
  },
})