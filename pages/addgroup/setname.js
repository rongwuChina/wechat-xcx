
var app = getApp()
var baseurl = "https://test.morpx.com/";
var loadimg=baseurl + "common/uploadImage";
Page({
  data: {
    savethis:false,
    logo: baseurl+'upload/images/avatar/group/default_group_avatar.png',
    logo2: 'https://wx.qlogo.cn/mmopen/vi_32/m4fNqhcVPxia9IdlWe1B2rx3micmialIBfgRHlgFY7BOAiagSkTfr7UhuoTibibJRibhTjKYcA2zdRKO5WQruXkNY7ewQ/0',
    logo3: 'https://wx.qlogo.cn/mmopen/vi_32/m4fNqhcVPxia9IdlWe1B2rx3micmialIBfgRHlgFY7BOAiagSkTfr7UhuoTibibJRibhTjKYcA2zdRKO5WQruXkNY7ewQ/0',
    logo4: 'https://wx.qlogo.cn/mmopen/vi_32/m4fNqhcVPxia9IdlWe1B2rx3micmialIBfgRHlgFY7BOAiagSkTfr7UhuoTibibJRibhTjKYcA2zdRKO5WQruXkNY7ewQ/0',
    setgroup1: true,
    setgroup2: true,
    setgroup3: true,
    setgroup4: true,
    setgroup5: true,
    setgroup6: true,
    tagchoose: [],
    jobintronumb: 0,
    name: null,
    tagname: ["全部", "标签1", "标签2", "标签3", "标签4", "标签5", "标签6", "标签7", "标签8", "标签9"],
    tagid:[1,2,3,4,5,6,7,8,9,10],
    tagname2: [],
    tagid2:[],
    intro: null,
    idcard1: null,
    idcard2: null,
    busniss: null,
    identy:['','',''],
    groupintro:null,
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      setgroup1: options.id == 1 ? false : true,
      setgroup2: options.id == 2 ? false : true,
      setgroup3: options.id == 3 ? false : true,
      setgroup4: options.id == 4 ? false : true,
      setgroup5: options.id == 5 ? false : true,
      setgroup6: options.id == 6 ? false : true,
      typeid:options.id,
      setoradd:options.typeid
    })
    wx.setNavigationBarTitle({
      title: '设置群信息'
    })
    switch (that.data.typeid) {
      case '1':
        this.setData({
          titlename: '设置头像'
        })
      break;
      case '2':
        this.setData({
          titlename: '输入群名称'
        })
      break;
      case '3':
        this.setData({
          titlename: '设置群分类'
        })
        that.loadgrouptag();
      break;
      case '4':
        this.setData({
          titlename: '输入群介绍'
        })
      break;
      case '5':
        this.setData({
          titlename: '选择地点'
        })
      break;
      case '6':
        this.setData({
          titlename: '群认证'
        })
      break;
    }
    if (that.data.setoradd==2){
      that.setData({
        groupid: options.groupid
      })
      that.loadgroupdetail();
      that.loadgrouptag();
    }
    
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
            var tagid = []
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
              logo: imageurl,
              name: groupname,
              tagname2: mytag,
              tagid2: tagid,
              intro: groupinfo,
              idcard1: item.identityCardFrontLink,
              idcard2: item.identityCardBackLink,
              busniss: item.businessLicenceLink,
              identy: [item.identityCardFrontLink, item.identityCardBackLink, item.businessLicenceLink]
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
  loadgrouptag: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        /**
         * 发送接口
         */
        wx.request({
          url: baseurl + "common/getTagList",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            pageSize: 1000000
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            var tagname = [];
            var tagid = [];

            for (var i = 0; i < res.data.data.result.length; ++i) {
              tagname = tagname.concat(res.data.data.result[i].name)
              tagid = tagid.concat(res.data.data.result[i].id)
            }
            that.setData({
              tagname: tagname,
              tagid: tagid
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
  nameinput: function (e) {
    this.setData({
      name: e.detail.value,
    })
  },
  introinput: function (e) {
    this.setData({
      intro: e.detail.value,
    })
  },
  tagchoose: function (e) {
    console.log(parseInt(this.data.jobintronumb));
    var tagchoosei = 'tagchoose[' + e.currentTarget.id + ']'
    var tagnamei = 'tagname2[' + parseInt(this.data.jobintronumb) + ']'
    var tagidi = 'tagid2[' + parseInt(this.data.jobintronumb) + ']'
    if (this.data.jobintronumb == 3) {
      var index = e.currentTarget.id
      if (this.data.tagchoose[index] == e.currentTarget.id) {
        this.setData({
          [tagchoosei]: null,
          jobintronumb: this.data.jobintronumb - 1,
          tagname2: this.data.tagname2.splice(0, 2),
          tagid2: this.data.tagid2.splice(0, 2)
        })
      }
    } else {
      var index = e.currentTarget.id
      if (this.data.tagchoose[index] == e.currentTarget.id) {
        this.setData({
          [tagchoosei]: null,
          jobintronumb: this.data.jobintronumb - 1,
          tagname2: this.data.tagname2.splice(0, parseInt(this.data.jobintronumb) - 1),
          tagid2: this.data.tagid2.splice(0, parseInt(this.data.jobintronumb) - 1)
        })
      } else {
        this.setData({
          [tagchoosei]: e.currentTarget.id,
          jobintronumb: this.data.jobintronumb + 1,
          [tagnamei]: this.data.tagname[e.currentTarget.id],
          [tagidi]: this.data.tagid[e.currentTarget.id]
        })

      }

    }

  },
  /**
   * 上传群头像
   */
  chooseImageTap: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseImageTap2: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage2('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage2('camera')
          }
        }
      }
    })
  },
  chooseImageTap3: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage3('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage3('camera')
          }
        }
      }
    })
  },
  chooseImageTap4: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage4('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage4('camera')
          }
        }
      }
    })
  }, 
  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      count: 1,
      success: function (res) {
        console.log(res);
        _this.setData({
          logo: res.tempFilePaths[0],
        })
      }
    })
  },
  /**
   * 上传身份证正反面以及营业执照
   */
  chooseWxImage2: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      count: 1,
      success: function (res) {
        console.log(res);
        var identyi = "identy[0]";
        _this.setData({
          [identyi] : res.tempFilePaths[0],
        })
      }
    })
  },
  
  chooseWxImage3: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      count: 1,
      success: function (res) {
        console.log(res);
        var identyi = "identy[1]";
        _this.setData({
          [identyi]: res.tempFilePaths[0],
        })
      }
    })
  },
 
  chooseWxImage4: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      count: 1,
      success: function (res) {
        console.log(res);
        var identyi = "identy[2]";
        _this.setData({
          [identyi]: res.tempFilePaths[0],
        })
      }
    })
  },
  uploadimg: function (data, token) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0
    console.log(data.url);
    wx.showToast({
      title: '上传中',
      icon: 'loading',
      duration: 5000
    })

    wx.uploadFile({
      url:data.url ,
      filePath: data.path[i],
      name: 'file',//这里根据自己的实际情况改
      formData: null,
      header: {
        'content-type': "multipart / form - data",
        'token': token
      }, // 设置请求的 header
      success: (resp) => {
        console.log(resp)
        if (JSON.parse(resp.data).code == 0) {
          success++;
          that.setData({
            logo: JSON.parse(resp.data).data.imageLink,
          })

          prevPage.setData({
            groupimage: JSON.parse(resp.data).data.imageLink
          })
          console.log(prevPage.data.groupimage);

        } else {
          fail++;
        }
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        i++;
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 600
          })
          setTimeout(function () {
            wx.hideToast();
            wx.navigateBack({
            })
          }, 600)
          
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data,token);
        }

      }
    });

  },
  uploadimg2: function (data, token) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
    console.log(data.path);
    wx.showToast({
      title: '上传中',
      icon: 'loading',
      duration: 5000
    })
    

    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',//这里根据自己的实际情况改
      formData: null,
      header: {
        'content-type': "multipart / form - data",
        'token': token
      }, // 设置请求的 header
      success: (resp) => {
        console.log(resp)
        if (JSON.parse(resp.data).code == 0) {
          
          success++;
          
          if (success==1 && data.path[0] != "") {
            that.setData({
              idcard1: JSON.parse(resp.data).data.imageLink,
            })
            prevPage.setData({
              identityCardFrontLink: JSON.parse(resp.data).data.imageLink,
            })
            console.log('prevPage.data.identityCardFrontLink' + prevPage.data.identityCardFrontLink);
          }
          console.log(success == 2 && data.path[1] != "");
          if (success == 2 && data.path[1] != "") {
            that.setData({
              idcard2: JSON.parse(resp.data).data.imageLink
            })
            prevPage.setData({
              identityCardBackLink: JSON.parse(resp.data).data.imageLink,
            })
            console.log('prevPage.data.identityCardBackLink'+prevPage.data.identityCardBackLink);
          }
          console.log(success == 3 && data.path[2] != "");
          if (success == 3 && data.path[2] != "") {
            that.setData({
              busniss: JSON.parse(resp.data).data.imageLink
            })
            prevPage.setData({
              businessLicenceLink: JSON.parse(resp.data).data.imageLink,
            })
            console.log('prevPage.data.businessLicenceLink' + prevPage.data.businessLicenceLink);
          }
        }else {
          fail++;
        }

        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        i++;
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 600
          })
          setTimeout(function () {
            wx.hideToast();
            wx.navigateBack({
            })
          }, 600)
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg2(data, token);
        }

      }
    });

  },

  savethis:function(){
       var that=this
       var pages = getCurrentPages();
       var currPage = pages[pages.length - 1];   //当前页面
       var prevPage = pages[pages.length - 2];  //上一个页面
       //直接调用上一个页面的setData()方法，把数据存到上一个页面中去

       switch (that.data.typeid) {
         case '1':
         
           wx.getStorage({
             key: "token",
             success: function (res) {
               var token = res.data;
               that.uploadimg({
                 url:loadimg,
                 path: [that.data.logo]
               },token);
             }
           })
           break;
         case '2':
           prevPage.setData({
             groupname: that.data.name
           })
           wx.navigateBack({
           })
           break;
         case '3':
           prevPage.setData({
             grouptag: that.data.tagname2,
             tagid: that.data.tagid2
           })
           wx.navigateBack({
           })
           break;
         case '4':
           prevPage.setData({
             groupintro: that.data.intro
           })
           wx.navigateBack({
           })
           break;
         case '6':
           wx.getStorage({
             key: "token",
             success: function (res) {
               var token = res.data;
               that.uploadimg2({
                 url: loadimg,
                 path: that.data.identy
               }, token);
             }
           })
           prevPage.setData({
             groupidentify: '待认证',
             groupidentifyid: 0,
           })         
           break;
       }
       
  },
  saveback: function(){
    wx.navigateBack({
    })
  },
  



})