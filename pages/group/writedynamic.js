
var app = getApp()
var baseurl = "https://test.morpx.com/";
var imagearry = []
Page({
  data: {
    logo: null,
    content:null,
    uploadimg:[],
    uploadimglength:0,
    groupid:null,
    imageload:false,
    loadimg:[]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发布头条'
    })
    console.log(options);
    this.setData({
      groupid: options.groupid
      })
  },

  writetext: function(e){
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
    let counts = 9 - _this.data.uploadimg.length;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      count: counts,
      success: function (res) {
        console.log(res.tempFilePaths);
        var arry = _this.data.uploadimg;
        for (var i = 0;i<res.tempFilePaths.length;++i){
          arry = arry.concat(res.tempFilePaths[i])
          console.log(res.tempFilePaths[i]);
        }
        _this.setData({
          uploadimg: arry
        })
        console.log(_this.data.uploadimg);
      }
    })
  },
  subdynamic: function(e){
    var that=this;

    var content=that.data.content
    var imageFile0 = "";
    var imageFile1 = "";
    var imageFile2 = "";
    var imageFile3 = "";
    var imageFile4 = "";
    var imageFile5 = "";
    var imageFile6 = "";
    var imageFile7 = "";
    var imageFile8 = "";
    if (content == "" || content==null){
      wx.showModal({
        title: '提示',
        content: "头条内容不能为空",
        success: function (res) {
          if (res.confirm) {
            
          } else {

          }

        }
      })
    }else{
      wx.getStorage({
        key: "token",
        success: function (res) {
          var token = res.data;
          var data = {
            groupId: that.data.groupid,
            content: content, 
            imageFile0: imageFile0, 
            imageFile1: imageFile1, 
            imageFile2: imageFile2, 
            imageFile3: imageFile3, 
            imageFile4: imageFile4, 
            imageFile5: imageFile5, 
            imageFile6: imageFile6, 
            imageFile7: imageFile7, 
            imageFile8: imageFile8, 
          }
          for (var i = 0; i < that.data.uploadimg.length; ++i) {
            switch (i) {
              case 0:
                var imageFile0 = that.data.uploadimg[i]
              break;
              case 1:
                var imageFile1 = that.data.uploadimg[i]
              break;
              case 2:
                var imageFile2 = that.data.uploadimg[i]
              break;
              case 3:
                var imageFile3 = that.data.uploadimg[i]
              break;
              case 4:
                var imageFile4 = that.data.uploadimg[i]
              break;
              case 5:
                var imageFile5 = that.data.uploadimg[i]
              break;
              case 6:
                var imageFile6 = that.data.uploadimg[i]
              break;
              case 7:
                var imageFile7 = that.data.uploadimg[i]
              break;
              case 8:
                var imageFile8 = that.data.uploadimg[i]
              break;
            }

          }
          var contenttype = 'multipart/form-data';
          switch (that.data.uploadimg.length) {
            case 0:
              var data = {
                groupId: that.data.groupid,
                content: content,
              }
              var contenttype = 'application/x-www-form-urlencoded';
              that.uploadtext(token);
            break;
            case 1:
              var data = {
                groupId: that.data.groupid,
                content: content,
                image: [imageFile0]
              }
              var token = res.data;

              that.uploadimg({
                url: baseurl + "common/uploadImage",//这里是你图片上传的接口
                path: data.image//这里是选取的图片的地址数组
              }, contenttype, token, data);
              break;
              
            case 2:
              var data = {
                groupId: that.data.groupid,
                content: content,
                image: [imageFile0, imageFile1]
              }
              var token = res.data;

              that.uploadimg({
                url: baseurl + "common/uploadImage",//这里是你图片上传的接口
                path: data.image//这里是选取的图片的地址数组
              }, contenttype, token, data);
              break;
            case 3:
              var data = {
                groupId: that.data.groupid,
                content: content,
                image: [imageFile0, imageFile1, imageFile2]
              }
              var token = res.data;

              that.uploadimg({
                url: baseurl + "common/uploadImage",//这里是你图片上传的接口
                path: data.image//这里是选取的图片的地址数组
              }, contenttype, token, data);
              break;
            case 4:
              var data = {
                groupId: that.data.groupid,
                content: content,
                image: [imageFile0, imageFile1, imageFile2, imageFile3]
              }
              var token = res.data;

              that.uploadimg({
                url: baseurl + "common/uploadImage",//这里是你图片上传的接口
                path: data.image//这里是选取的图片的地址数组
              }, contenttype, token, data);
              break;
            case 5:
              var data = {
                groupId: that.data.groupid,
                content: content,
                image: [imageFile0, imageFile1, imageFile2, imageFile3, imageFile4]
              }
              var token = res.data;

              that.uploadimg({
                url: baseurl + "common/uploadImage",//这里是你图片上传的接口
                path: data.image//这里是选取的图片的地址数组
              }, contenttype, token, data);
              break;
            case 6:
              var data = {
                groupId: that.data.groupid,
                content: content,
                image: [imageFile0, imageFile1, imageFile2, imageFile3, imageFile4, imageFile5]
              }
              var token = res.data;

              that.uploadimg({
                url: baseurl + "common/uploadImage",//这里是你图片上传的接口
                path: data.image//这里是选取的图片的地址数组
              }, contenttype, token, data);
              break;
            case 7:
              var data = {
                groupId: that.data.groupid,
                content: content,
                image: [imageFile0, imageFile1, imageFile2, imageFile3, imageFile4, imageFile5, imageFile6]
              }
              var token = res.data;

              that.uploadimg({
                url: baseurl + "common/uploadImage",//这里是你图片上传的接口
                path: data.image//这里是选取的图片的地址数组
              }, contenttype, token, data);
              break;
            case 8:
              var data = {
                groupId: that.data.groupid,
                content: content,
                image: [imageFile0, imageFile1, imageFile2, imageFile3, imageFile4, imageFile5, imageFile6, imageFile7]
              }
              var token = res.data;

              that.uploadimg({
                url: baseurl + "common/uploadImage",//这里是你图片上传的接口
                path: data.image//这里是选取的图片的地址数组
              }, contenttype, token, data);
              break;
            case 9:
              var data = {
                groupId: that.data.groupid,
                content: content,
                image: [imageFile0, imageFile1, imageFile2, imageFile3, imageFile4, imageFile5, imageFile6, imageFile7, imageFile8]
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
    }
  },
  uploadtext: function (token){
    var that=this;
    var content = that.data.content;
    for (var i = 0; i < that.data.uploadimg.length; ++i) {
      switch (i) {
        case 0:
          var imageFile0 = that.data.uploadimg[i]
          break;
        case 1:
          var imageFile1 = that.data.uploadimg[i]
          break;
        case 2:
          var imageFile2 = that.data.uploadimg[i]
          break;
        case 3:
          var imageFile3 = that.data.uploadimg[i]
          break;
        case 4:
          var imageFile4 = that.data.uploadimg[i]
          break;
        case 5:
          var imageFile5 = that.data.uploadimg[i]
          break;
        case 6:
          var imageFile6 = that.data.uploadimg[i]
          break;
        case 7:
          var imageFile7 = that.data.uploadimg[i]
          break;
        case 8:
          var imageFile8 = that.data.uploadimg[i]
          break;
      }

    }
    var contenttype = 'application/x-www-form-urlencoded';
    switch (that.data.uploadimg.length) {
      case 0:
        var data = {
          groupId: that.data.groupid,
          content: content,
        }

        break;
      case 1:
        var data = {

          groupId: that.data.groupid,
          content: content,
          imageLink0: imageFile0,
        }
        break;
      case 2:
        var data = {
          groupId: that.data.groupid,
          content: content,
          imageLink0: imageFile0,
          imageLink1: imageFile1,
        }
        break;
      case 3:
        var data = {
          groupId: that.data.groupid,
          content: content,
          imageLink0: imageFile0,
          imageLink1: imageFile1,
          imageLink2: imageFile2,
        }
        break;
      case 4:
        var data = {
          groupId: that.data.groupid,
          content: content,
          imageLink0: imageFile0,
          imageLink1: imageFile1,
          imageLink2: imageFile2,
          imageLink3: imageFile3,
        }
        break;
      case 5:
        var data = {
          groupId: that.data.groupid,
          content: content,
          imageLink0: imageFile0,
          imageLink1: imageFile1,
          imageLink2: imageFile2,
          imageLink3: imageFile3,
          imageLink4: imageFile4,
        }
        break;
      case 6:
        var data = {
          groupId: that.data.groupid,
          content: content,
          imageLink0: imageFile0,
          imageLink1: imageFile1,
          imageLink2: imageFile2,
          imageLink3: imageFile3,
          imageLink4: imageFile4,
          imageLink5: imageFile5,
        }


        break;
      case 7:
        var data = {
          groupId: that.data.groupid,
          content: content,
          imageLink0: imageFile0,
          imageLink1: imageFile1,
          imageLink2: imageFile2,
          imageLink3: imageFile3,
          imageLink4: imageFile4,
          imageLink5: imageFile5,
          imageLink6: imageFile6,
        }

        break;
      case 8:
        var data = {
          groupId: that.data.groupid,
          content: content,
          imageLink0: imageFile0,
          imageLink1: imageFile1,
          imageLink2: imageFile2,
          imageLink3: imageFile3,
          imageLink4: imageFile4,
          imageLink5: imageFile5,
          imageLink6: imageFile6,
          imageLink7: imageFile7
        }
        break;
      case 9:
        var data = {
          groupId: that.data.groupid,
          content: content,
          imageLink0: imageFile0,
          imageLink1: imageFile1,
          imageLink2: imageFile2,
          imageLink3: imageFile3,
          imageLink4: imageFile4,
          imageLink5: imageFile5,
          imageLink6: imageFile6,
          imageLink7: imageFile7,
          imageLink8: imageFile8,
        }

        break;
    }
    wx.request({
      url: baseurl + "group/createHeadline",
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: data,
      header: {
        'content-type': contenttype,
        'token': token
      }, // 设置请求的 header
      success: function (res) {
        console.log(res);
        if (res.data.code == '0') {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 600
          })
          setTimeout(function () {
            wx.redirectTo({
              url: 'groupdetail?groupid=' + that.data.groupid,
            })
          }, 600)
        }
        else if (res.data.code == '2203') {
          wx.showModal({
            title: '发布失败',
            content: res.data.message + ",去完善",
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../account/myaccount?id=1',
                })
              } else {

              }

            }
          })
        } 
        else {
          if (res.data.code == 500) {
            wx.showModal({
              title: '发布失败',
              content: '内容过长！',
              success: function (res) {
                if (res.confirm) {

                } else {

                }

              }
            })
          } else {
            wx.showModal({
              title: '发布失败',
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
          duration: 500
        })

      },
      complete: function () {

      }
    })
  },
  uploadimg: function(data, contenttype, token, datas) {
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
    console.log(data.path);
    wx.showToast({
      title: '发布中',
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
          var imgs = uploadimg[i];
          that.setData({
            uploadimg: that.data.loadimg.concat(JSON.parse(resp.data).data.imageLink),
            loadimg: that.data.loadimg.concat(JSON.parse(resp.data).data.imageLink)
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
//多张图片上传
function uploadimg(data, contenttype, token, datas) {
  var that = this,
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
    var arry=[];
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
      if(resp.data.code==0){
        success++;
        arry = arry.concat(resp.data.data,imageLink)
      }else{
        fail++;
      }
      console.log(resp)
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
        console.log('成功：' + success + " 失败：" + fail + token);
      } else {//若图片还没有传完，则继续调用函数
        console.log(i);
        data.i = i;
        data.success = success;
        data.fail = fail;
        uploadimg(data, contenttype, token, datas);
      }

    }
  });
  console.log(arry);
    return arry;
}