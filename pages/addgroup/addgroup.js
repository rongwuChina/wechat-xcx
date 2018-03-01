var baseurl = "https://test.morpx.com/";
Page({
  data: {
    groupimage:baseurl+'upload/images/avatar/group/default_group_avatar.png',
    groupname:null,
    grouptag: null,
    groupintro: null,
    groupidentify: null,
    groupidentifyid:0,
    groupid:null,
    submit:null,
    typeid: null,
    tagid: [],
    identityCardFrontLink: '',
    identityCardBackLink: '',
    businessLicenceLink: '', 
  },
  onLoad: function(res){
    console.log(res.id);
    if (res.id==2){
      wx.setNavigationBarTitle({
        title: '设置群名片'
      })
      this.setData({
        groupid:res.groupid,
        submit:'保存',
        typeid:res.id
      })
      
      this.loadgroupdetail();
    }else{
      wx.setNavigationBarTitle({
        title: '新建群'
      })
      this.setData({
        submit:'新建',
        typeid:res.id
    })
      
    }
  },
  setimage: function (e) {
    wx.navigateTo({
      url: 'setname?id=1&typeid=' + this.data.typeid + '&groupid=' + this.data.groupid,
    })
  },
  setname: function(e){
     wx.navigateTo({
       url: 'setname?id=2&typeid=' + this.data.typeid + '&groupid=' + this.data.groupid,
     })
  },
  settag: function (e) {
    wx.navigateTo({
      url: 'setname?id=3&typeid=' + this.data.typeid + '&groupid=' + this.data.groupid,
    })
  },
  setintro: function (e) {
     wx.navigateTo({
       url: 'setname?id=4&typeid=' + this.data.typeid + '&groupid=' + this.data.groupid,
     })
  },
  getlocal: function (e) {
    wx.navigateTo({
      url: 'setname?id=5&typeid=' + this.data.typeid + '&groupid=' + this.data.groupid,
    })
  },
  getidentify: function (e) {
    wx.navigateTo({
      url: 'setname?id=6&typeid=' + this.data.typeid + '&groupid=' + this.data.groupid,
    })
  },
  goback: function(e){
    console.log('jjjj');
    wx.navigateBack({
      delta:1
    })
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
            var mytag = []
            var tagid=[]
            var identityCardFrontLink
            var identityCardBackLink
            var businessLicenceLink
            var imageurl = item.imageLink
            var groupname = item.name
            var groupinfo = item.note
            var isJoinNeedReview = item.isJoinNeedReview
            var isNeedFillUserInfo = item.isNeedFillUserInfo
            var isShareUser = item.isShareUser
            var isXiaodaRecommend = item.isXiaodaRecommend
            var isTopRanking = item.isTopRanking

            for (var i = 0; i < item.tagList.length; ++i) {
              mytag = mytag.concat(item.tagList[i].name)
              tagid = tagid.concat(item.tagList[i].id)
            }

            that.setData({
              groupimage: imageurl,
              groupname: groupname,
              grouptag: mytag,
              groupintro: groupinfo,
              groupidentify: groupidentify(item.authorizeType),
              groupidentifyid: item.authorizeType,
              tagid: tagid,
              identityCardFrontLink: item.identityCardFrontLink,
              identityCardBackLink: item.identityCardBackLink,
              businessLicenceLink: item.businessLicenceLink, 
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
  groupsubmit: function(){
    var that=this
    if (that.data.groupname == null) {
      wx.showModal({
        title: '提示',
        content: "请输入群名称",
        success: function (res) {
          if (res.confirm) {
          } else {
          }

        }
      })
    }
    else if (that.data.groupintro == null) {
      wx.showModal({
        title: '提示',
        content: "请输入群介绍",
        success: function (res) {
          if (res.confirm) {
          } else {
          }

        }
      })
    }
    else if (that.data.tagid.length < 1 || that.data.tagid.length > 3){
      wx.showModal({
        title: '提示',
        content: "请选择至少一个至多三个群标签",
        success: function (res) {
          if (res.confirm) {     
          } else {
          }
        }
      })
    }
    else{
      console.log(that.data.typeid);
        wx.getStorage({
          key: "token",
          success: function (res) {
            var token=res.data;
          if(that.data.typeid==2){
            if (that.data.identityCardFrontLink != ''){
              
              var data = {
                imageLink: that.data.groupimage,
                name: that.data.groupname,
                tagId: that.data.tagid,
                note: that.data.groupintro,
                identityCardFrontLink: that.data.identityCardFrontLink,
                id:that.data.groupid
              }
            }
            if (that.data.identityCardBackLink != ''){
              var data = {
                imageLink: that.data.groupimage,
                name: that.data.groupname,
                tagId: that.data.tagid,
                note: that.data.groupintro,
                identityCardBackLink: that.data.identityCardBackLink,
                id: that.data.groupid
              }
            }
            if (that.data.businessLicenceLink != ''){
              var data = {
                imageLink: that.data.groupimage,
                name: that.data.groupname,
                tagId: that.data.tagid,
                note: that.data.groupintro,
                businessLicenceLink: that.data.businessLicenceLink,
                id: that.data.groupid
              }
            }
            if (that.data.identityCardFrontLink != '' && that.data.identityCardBackLink != ''){
              var data = {
                imageLink: that.data.groupimage,
                name: that.data.groupname,
                tagId: that.data.tagid,
                note: that.data.groupintro,
                identityCardFrontLink: that.data.identityCardFrontLink,
                identityCardBackLink: that.data.identityCardBackLink,
                id: that.data.groupid
              }  
            }
            if (that.data.identityCardFrontLink != '' && that.data.businessLicenceLink !='') {
              var data = {
                imageLink: that.data.groupimage,
                name: that.data.groupname,
                tagId: that.data.tagid,
                note: that.data.groupintro,
                identityCardFrontLink: that.data.identityCardFrontLink,
                businessLicenceLink: that.data.businessLicenceLink,
                id: that.data.groupid
              }
            }
            if (that.data.businessLicenceLink != '' && that.data.identityCardBackLink != '') {
              var data = {
                imageLink: that.data.groupimage,
                name: that.data.groupname,
                tagId: that.data.tagid,
                note: that.data.groupintro,
                identityCardBackLink: that.data.identityCardBackLink,
                businessLicenceLink: that.data.businessLicenceLink,
                id: that.data.groupid
              }
            }
            if (that.data.identityCardFrontLink != '' && that.data.businessLicenceLink != '' && that.data.identityCardBackLink != '') {
              var data = {
                imageLink: that.data.groupimage,
                name: that.data.groupname,
                tagId: that.data.tagid,
                note: that.data.groupintro,
                identityCardFrontLink: that.data.identityCardFrontLink,
                identityCardBackLink: that.data.identityCardBackLink,
                businessLicenceLink: that.data.businessLicenceLink,
                id: that.data.groupid
              }
            }
            else if (that.data.identityCardFrontLink == '' && that.data.businessLicenceLink == '' && that.data.identityCardBackLink == ''){
              var data = {
                imageLink: that.data.groupimage,
                name: that.data.groupname,
                tagId: that.data.tagid,
                note: that.data.groupintro,
                id: that.data.groupid
              }
            }
            console.log(data);
            //保存修改
            wx.request({
              url: baseurl + "group/updateGroupInfo",
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
                    title: '更新成功',
                    icon: 'success',
                    duration: 500
                  })
                  wx.navigateTo({
                    url: '../group/groupset?groupid=' + that.data.groupid,
                  })
                } else {
                  if (res.data.code == 500) {
                    wx.showModal({
                      title: '更新失败',
                      content: '内容过长！',
                      success: function (res) {
                        if (res.confirm) {

                        } else {

                        }

                      }
                    })
                  } else {
                    wx.showModal({
                      title: '更新失败',
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
                console.log(res);
                wx.showToast({
                  title: '更新失败',
                  icon: 'success',
                  duration: 500
                })
              },
              complete: function () {

              }
            })
          }else{
            if (that.data.identityCardFrontLink != '') {
              var data = {
                imageLink: that.data.groupimage,
                name: that.data.groupname,
                tagId: that.data.tagid,
                note: that.data.groupintro,
                identityCardFrontLink: that.data.identityCardFrontLink,
              }
            }
            if (that.data.identityCardBackLink != '') {
              var data = {
                imageLink: that.data.groupimage,
                name: that.data.groupname,
                tagId: that.data.tagid,
                note: that.data.groupintro,
                identityCardBackLink: that.data.identityCardBackLink,
              }
            }
            if (that.data.businessLicenceLink != '') {
              var data = {
                imageLink: that.data.groupimage,
                name: that.data.groupname,
                tagId: that.data.tagid,
                note: that.data.groupintro,
                businessLicenceLink: that.data.businessLicenceLink,
              }
            }
            console.log(that.data.identityCardFrontLink != '' && that.data.identityCardBackLink != '');
            if (that.data.identityCardFrontLink != '' && that.data.identityCardBackLink != '') {
              var data = {
                imageLink: that.data.groupimage,
                name: that.data.groupname,
                tagId: that.data.tagid,
                note: that.data.groupintro,
                identityCardFrontLink: that.data.identityCardFrontLink,
                identityCardBackLink: that.data.identityCardBackLink,
              }
            }
            if (that.data.identityCardFrontLink != '' && that.data.businessLicenceLink != '') {
              var data = {
                imageLink: that.data.groupimage,
                name: that.data.groupname,
                tagId: that.data.tagid,
                note: that.data.groupintro,
                identityCardFrontLink: that.data.identityCardFrontLink,
                businessLicenceLink: that.data.businessLicenceLink,
              }
            }
            if (that.data.businessLicenceLink != '' && that.data.identityCardBackLink != '') {
              var data = {
                imageLink: that.data.groupimage,
                name: that.data.groupname,
                tagId: that.data.tagid,
                note: that.data.groupintro,
                identityCardBackLink: that.data.identityCardBackLink,
                businessLicenceLink: that.data.businessLicenceLink,
              }
            }
            if (that.data.identityCardFrontLink != '' && that.data.businessLicenceLink != '' && that.data.identityCardBackLink != '') {
              var data = {
                imageLink: that.data.groupimage,
                name: that.data.groupname,
                tagId: that.data.tagid,
                note: that.data.groupintro,
                identityCardFrontLink: that.data.identityCardFrontLink,
                identityCardBackLink: that.data.identityCardBackLink,
                businessLicenceLink: that.data.businessLicenceLink,
              }
            } 
            if (that.data.identityCardFrontLink == '' && that.data.businessLicenceLink == '' && that.data.identityCardBackLink == '') {
              var data = {
                imageLink: that.data.groupimage,
                name: that.data.groupname,
                tagId: that.data.tagid,
                note: that.data.groupintro,
              }
            }
            var data333 ={ identityCardFrontLink: that.data.identityCardFrontLink,
              identityCardBackLink: that.data.identityCardBackLink,
              businessLicenceLink: that.data.businessLicenceLink,
          }
            console.log(data333);
            console.log(data);
            //新建
            wx.request({
              url: baseurl + "group/createGroup",
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
                    title: '创建成功',
                    icon: 'success',
                    duration: 500
                  })
                  wx.navigateTo({
                    // url: '../group/groupdetail?groupid=' + that.data.groupid,
                    url: '../group/groupdetail?groupid=' + res.data.data.id,
                  })
                } 
                else {
                  if (res.data.code == 500) {
                    wx.showModal({
                      title: '创建失败',
                      content: '内容过长！',
                      success: function (res) {
                        if (res.confirm) {

                        } else {

                        }

                      }
                    })
                  } else {
                    wx.showModal({
                      title: '创建失败',
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
                console.log(res);
                wx.showToast({
                  title: '新建群失败',
                  icon: 'success',
                  duration: 500
                })

              },
              complete: function () {

              }
            })
          }
          }
        })
    }

  }
})

function groupidentify(numb){
  var text;
   switch(numb){
     case 0:
       text='未认证'
     break;
     case 1:
       text ='待认证'
     break;
     case 2:
       text = '已个人认证'
     break;
     case 3:
       text ='已企业认证'
     break;
   }
   return text;
}