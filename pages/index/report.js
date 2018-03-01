
var app = getApp()
var baseurl = "https://test.morpx.com/";
var imagearry = []
Page({
  data: {
    logo: null,
    content: null,
    uploadimg: [],
    uploadimglength: 0,
    groupid: null,
    imageload: false,
    loadimg: []
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '举报'
    })
    console.log(options);
    this.setData({
      typeid: options.type,
      resourceId: options.resourceId
    })
  },

  writetext: function (e) {
    console.log(e.detail.value);
    this.setData({
      content: e.detail.value
    })
  },
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
  chooseWxImage: function (type) {
    let _this = this;
    let counts = 1;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      count: counts,
      success: function (res) {
        console.log(res.tempFilePaths);
        _this.setData({
          uploadimg: [res.tempFilePaths[0]]
        })
      }
    })
  },
  subdynamic: function (e) {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        var contenttype = 'multipart/form-data';
        switch (that.data.uploadimg.length) {
          case 0:
            if (that.data.content == null || that.data.content == "" ){
              wx.showModal({
                title: '提示',
                content: '请输入文字描述，或者上传图片',
                success: function (res) {
                  if (res.confirm) {
                  } else {

                  }

                }
              })
            }else{
              that.uploadtext(token);
            }
           
          break;
          case 1:
            var data = {
              image: [that.data.uploadimg[0]]
            }
            var token = res.data;

            that.uploadimg({
              url: baseurl + "common/uploadImage",//这里是你图片上传的接口
              path: data.image//这里是选取的图片的地址数组
            }, contenttype, token, data);
          break;
        }






      }
    })
    
  },
  uploadtext: function (token) {
    var that = this;
    var content = that.data.content;
    var contenttype = 'application/x-www-form-urlencoded';
    switch (that.data.uploadimg.length) {
      case 0:
        var data = {
          type: that.data.typeid,
          resourceId: that.data.resourceId,
          content: content,
        }
        break;
      case 1:
        var data = {
          type: that.data.typeid,
          resourceId: that.data.resourceId,
          content: content,
          imageLink: that.data.uploadimg[0],
        }
      break;
    }
    wx.showToast({
      title: '消息发送中',
      icon: 'loading',
      duration: 5000
    })

    wx.request({
      url: baseurl + "common/report",
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: data,
      header: {
        'content-type': contenttype,
        'token': token
      }, // 设置请求的 header
      success: function (res) {
        console.log(res);
        if (res.data.code == 0) {
          wx.showToast({
            title: '举报成功',
            icon: 'success',
            duration: 800
          })
          
          setTimeout(function(){
            wx.navigateBack({});
          },800)
        }
        else {
          if (res.data.code.data==500){
            wx.showModal({
              title: '举报失败',
              content: '内容过长！',
              success: function (res) {
                if (res.confirm) {

                } else {

                }

              }
            })
          }else{
            wx.showModal({
              title: '举报失败',
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
          title: '发布失败',
          icon: 'success',
          duration: 800
        })

      },
      complete: function () {

      }
    })
  },
  uploadimg: function (data, contenttype, token, datas) {
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
    console.log(data.path);
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
          that.setData({
            uploadimg: that.data.loadimg.concat(JSON.parse(resp.data).data.imageLink),
          })
          // imagearry.concat(JSON.parse(resp.data).data.imageLink)
          console.log(that.data.uploadimg[i] + JSON.parse(resp.data).data.imageLink);
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
          console.log(that.data.uploadimg);
          that.uploadtext(token);
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data, contenttype, token, datas);
        }

      }
    });

  }


})
