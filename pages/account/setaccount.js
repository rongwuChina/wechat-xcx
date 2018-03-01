
var app = getApp()
var baseurl = "https://test.morpx.com/";
var loadimg = baseurl + "common/uploadImage";
Page({
  data: {
    jobbox:null,
    addnewgroup: "新建群",
    groupimg: "群头像",
    groupname: "群名称",
    grouptag: "群分类",
    groupintro: "群介绍",
    grouplocal: "群位置",
    myname: "名称",
    myintro: null,
    myage: "年龄段 as:90后",
    myphone: "请输入你的手机号",
    myweixin: "输入你的微信号",
    mylocal: "设置你的位置",
    grouptagint: "请添加群分类",
    groupintroint: "请添加群介绍",
    logo: null,
    setgroup1: 'true',
    setgroup2: 'true',
    setgroup3: 'true',
    setgroup4: 'true',
    setgroup5: 'true',
    setgroup6: 'true',
    setgroup7: 'true',
    setgroup8: 'true',
    setgroup9: 'true',
    setgroup10: 'true',
    setgroup11: 'true',
    sexname:["男","女","私密"],
    agename: ['40后','50后','60后','70后','80后','90后','00后'],
    sexid:[],
    tagname: [],
    tagid:[],
    tagname2: [],
    tagid2: [],
    tagchoose: [],
    jobname:[],
    jobid:[],
    jobthis:null ,
    dutyname:[],
    dutyid:[],
    dutythis: null,
    multiArray: [['无脊柱动物', '脊柱动物', '脊柱动物2'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    objectMultiArray: [
      [
         // 第一列 职务总类 分别
        {
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        },
        {
          id: 2,
          name: '脊柱动物2'
        }
      ] 
     
      , [
        {
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ], [
        {
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
    multiIndex: [0, 0, 0],
    thismysex: null,
    joinshow:true,
    jobintronumb:0,
    typeid:null,
    tagthis2:null,
    //职务
    menuType: ['food', 'dust', 'bowl', 'cages', 'toys', 'tools'],
    toView: 'cages',
    activeIndex: 0,
    content: '菜單一',
    needintro:false,
    theintro:null
  },
  changeTab: function (e) {
    console.log(e.currentTarget.dataset.index);
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
      content: e.currentTarget.dataset.name,
      jobbox2: [this.data.jobbox[e.currentTarget.dataset.index]]
    })
  },
  thismysex:"",
  onLoad: function (options) {
    for(let i=0; i<this.data.tagname.length; ++i){
     
      var tagchoosei ='tagchoose['+i+']'
      this.setData({
        [tagchoosei]: null,
      })
    }
    var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   console.log(userInfo);
    //   that.setData({
    //     userInfo: userInfo,
    //     logo: userInfo.avatarUrl
    //   })
    // })
    that.setData({
      setgroup1: options.id == 1 ? false : true,
      setgroup2: options.id == 2 ? false : true,
      setgroup3: options.id == 3 ? false : true,
      setgroup4: options.id == 4 ? false : true,
      setgroup5: options.id == 5 ? false : true,
      setgroup6: options.id == 6 ? false : true,  
      setgroup7: options.id == 7 ? false : true,
      setgroup8: options.id == 8 ? false : true,
      setgroup9: options.id == 9 ? false : true,
      setgroup10: options.id == 10 ? false : true,
      setgroup11: options.id == 11 ? false : true,
    })

    var titlename;
    that.setData({
      typeid: options.id,
      needintro: false,
      theintro:null
    })
    switch (that.data.typeid) {
      
      case '1':
        console.log(options.id=='1');
        wx.setNavigationBarTitle({
          title: '设置头像'
        })
        titlename = '设置头像'
        break;
      case '2':
        wx.setNavigationBarTitle({
          title: '设置名称'
        })
        titlename = '设置名称'
        break;
      case '3':
        wx.setNavigationBarTitle({
          title: '设置性别'
        })
        titlename = '设置性别'
        break;
      case '4':
        wx.setNavigationBarTitle({
          title: '设置行业'
        })
        titlename = '设置行业'
        break;
      case '5':
        wx.setNavigationBarTitle({
          title: '设置职务'
        })
        titlename = '设置职务'
        break;
      case '6':
        wx.setNavigationBarTitle({
          title: '设置年龄段'
        })
        titlename = '设置年龄段'
        break;
      case '7':
        wx.setNavigationBarTitle({
          title: '设置电话'
        })
        titlename = '设置电话'
        break;
      case '8':
        wx.setNavigationBarTitle({
          title: '设置微信'
        })
        titlename = '设置微信'
        break;
      case '9':
        wx.setNavigationBarTitle({
          title: '设置位置'
        })
        titlename = '设置位置'
        break;
      case '10':
        wx.setNavigationBarTitle({
          title: '设置我的标签'
        })
        titlename = '设置我的标签'
        
        break;
      case '11':
        wx.setNavigationBarTitle({
          title: '设置个人描述'
        })
        titlename = '设置个人描述'
        that.setData({
          needintro: true,
          theintro:'个人描述'
        })
      break;

    }
    that.setData({
      titlename: titlename
    })
    that.loaduserinfo();
    
  },
/**
* 我的
*/
loaduserinfo: function () {
    var that = this;
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;

        /**
         * 个人信息
         */
        wx.request({
          url: baseurl + "user/getUserInfo",
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
            var user = res.data.data.userInfo;
            if (user.sex == 0) {
              var sex = '未指定';
            } else if (user.sex == 1) {
              var sex = '男';
            } else {
              var sex = '女';
            }
            var generation = '';
            switch (user.generation) {
              case 0:
                generation = "未指定"
                break;
              case 1:
                generation = "40后"
                break;
              case 2:
                generation = "50后"
                break;
              case 3:
                generation = "60后"
                break;
              case 4:
                generation = "70后"
                break;
              case 5:
                generation = "80后"
                break;
              case 6:
                generation = "90后"
                break;
              case 7:
                generation = "00后"
                break;
            }
            if (user.industryList.length == 0) {
              var industryList = '未指定';
            }
            if (user.jobDuty == undefined || user.jobDuty.name == undefined) {
              var jobduty = '';
            } else {
              var jobduty = user.jobDuty.name;
            }
            if (that.data.needintro){
              that.setData({
                userid: user.id,
                logo: user.imageLink,
                myname: user.nickName,
                mysex: sex,
                myjob: industryList,
                myjobname: jobduty,
                myage: generation,
                myphone: user.phone,
                myweixin: user.wechatId,
                myintro: user.note,
                // tagname: tagname
              })
            }else{
              that.setData({
                userid: user.id,
                logo: user.imageLink,
                myname: user.nickName,
                mysex: sex,
                myjob: industryList,
                myjobname: jobduty,
                myage: generation,
                myphone: user.phone,
                myweixin: user.wechatId,
                myintro: '',
                // tagname: tagname
              })
            }
            
          },
          fail: function () {

          },
          complete: function () {
            wx.hideToast();
          }
        })
        /**
         * 个人标签列表
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
        /**
         * 获取行业列表
         */
        wx.request({
          url: baseurl + "common/getIndustryList",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            pageSize: 1000000
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            var tagname = [];
            var tagid = [];

            for (var i = 0; i < res.data.data.result.length; ++i) {
              tagname = tagname.concat(res.data.data.result[i].name)
              tagid = tagid.concat(res.data.data.result[i].id)
            }
            that.setData({
              dutyname: tagname,
              dutyid: tagid
            })
          },
          fail: function () {

          },
          complete: function () {
            wx.hideToast();
          }
        })
        /**
         * 获取职业树
         */
        wx.request({
          url: baseurl + "common/getJobDutyTree",
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            pageSize: 1000000
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            

            var joblist=[]
            var leadname=[]
            var parent=[]
            var parentname=[]
            var job=[]
            var jobname=[]
            var jobid=[]
            
            for (var i = 0; i < res.data.data.length; ++i) {
              var item = res.data.data[i]
              leadname[i] = item.name
              for (var j = 0; j < item.subJobDuty.length; ++j) {
                var item2 = item.subJobDuty[j]
                for (var t = 0; t < item2.subJobDuty.length; ++t) {
                  var item3 = item2.subJobDuty[t]
                  jobname[t] = item3.name
                  jobid[t]=item3.id
                }
                job[j] = {
                  jobname: jobname,
                  jobid: jobid
                }
                parentname[j] = item2.name
              }
                
                parent[i]={
                      parentname:parentname,
                      job:job
                } 
            }
            var joblist = {
              leadname: leadname,
              parent:parent
            }
            
            that.setData({
              jobbox: res.data.data,
              jobbox2: [res.data.data[0]],
            })
            console.log(that.data.jobbox);
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
  newgroupsub: function (e) {
    console.log(e.detail.value);
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
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      count: 1,
      success: function (res) {
        console.log(res.tempFilePaths);
        _this.setData({
          logo: res.tempFilePaths[0],
        })
      }
    })
  },
  savegroupimage: function () {
    console.log('a=' + this.data.logo)
    var filePath = this.data.logo;
    var rootUrl = 'http://example.com/';
    var url = 'upload';
    var formData = "";
    wx.uploadFile({
      url: rootUrl + url,
      filePath: filePath,
      header: {
        'content-type': 'multipart/form-data'
      }, // 设置请求的 header
      formData: formData, // HTTP 请求中其他额外的 form data
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200 && !res.data.result_code) {
          typeof success == "function" && success(res.data);
        } else {
          typeof fail == "function" && fail(res);
        }
      },
      fail: function (res) {
        console.log(res);
        typeof fail == "function" && fail(res);
      }
    })
  },
/**
 * setsex
 * 设置性别
 * 弹框与tag选择
 */
agechoose:function(e){
  this.setData({
    tagthis2: e.currentTarget.id
  })
},
//职务
selectMenuAct: function (e) {

  //typename
  var id = e.target.dataset.id;
  var tType = this.data.menuType[id];
  console.log(e),
    this.setData({
      scrollNum: id,
      toView: tType
      //scrollTop: this.data.heightList[id]
    });
},
jobchoose: function (e) {
  this.setData({
    jobthis: e.currentTarget.id
  })
  console.log(e.currentTarget.id);
},
dutychoose: function (e) {
  this.setData({
    dutythis: e.currentTarget.id
  })
  console.log(e.currentTarget.id);
},
sexchoose: function(e){
    this.setData({ 
      tagthis: e.currentTarget.id,
      thismysex:e.currentTarget.id
    });
  },
tagchoose2: function (e) {
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
          [tagnamei]: this.data.dutyname[e.currentTarget.id],
          [tagidi]: this.data.dutyid[e.currentTarget.id]
        })

      }

    }

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
  /*
  *设置职务
  */
    bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          // 第二列 职务类型
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            // data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            // data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
          case 2:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            // data.multiArray[2] = ['鲫鱼', '带鱼'];
            break; 
          case 2:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            // data.multiArray[2] = ['鲫鱼', '带鱼'];
            break; 
          case 2:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            // data.multiArray[2] = ['鲫鱼', '带鱼'];
            break; 
          case 2:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            // data.multiArray[2] = ['鲫鱼', '带鱼'];
            break; 
          case 2:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            // data.multiArray[2] = ['鲫鱼', '带鱼'];
            break; 
          case 2:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            // data.multiArray[2] = ['鲫鱼', '带鱼'];
            break; 
          case 2:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            // data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;  
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {  
              // 第三列 职务名称
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  /**
   * 设置标签
   */
  setmytag: function(){
    
  },
  /**
   * 头像
   */
  uploadimg: function (data, token) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0
    console.log('data.url');
    console.log(data.url);
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
            logo: JSON.parse(resp.data).data.imageLink,
          })

          // prevPage.setData({
          //   logo: JSON.parse(resp.data).data.imageLink
          // })
          // console.log(prevPage.data.logo);

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
          data = {
            imageLink: that.data.logo,
            fillType: 2
          }
          //保存修改
          wx.request({
            url: baseurl + "user/updateUserInfo",
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
                wx.navigateBack({
                  url: "../index/index"
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
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data, token);
        }

      }
    });

  },
  nameinput: function (e) {
    this.setData({
      myname: e.detail.value,
    })
  },
  introinput: function (e) {
    this.setData({
      myintro: e.detail.value,
    })
  },
  phoneinput: function (e) {
    this.setData({
      myphone: e.detail.value,
    })
  },
  wxinput: function (e) {
    this.setData({
      myweixin: e.detail.value,
    })
  },
  jobnameinput: function (e) {
    this.setData({
      intro: e.detail.value,
    })
  },

  joingroup: function (e) {

    this.setData({
      joinshow: this.data.joinshow == false ? true : false
    })
  },
  joinsubmit: function (e) {
  },
  subduty:function(e){
    console.log(e.detail.value.name);
    var name = e.detail.value.name;
    var that=this;
    /**
    * 添加行业标签
    */
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        //保存修改
        wx.request({
          url: baseurl + "common/reportIndustry",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            name: name
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            if (res.data.code == '0') {
              wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 500
              })
              that.joinreset();
              that.loaduserinfo();
            } else {
              wx.showModal({
                title: '添加失败',
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
              title: '添加失败',
              icon: 'success',
              duration: 500
            })
          },
          complete: function () {

          }
        })
      }
    })
    
  },
  submytag: function (e) {
    console.log(e.detail.value.name);
    var name = e.detail.value.name;
    var that = this;
    /**
    * 添加我的标签
    */
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        //保存修改
        wx.request({
          url: baseurl + "common/reportPersonalTag",
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            name: name
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token
          }, // 设置请求的 header
          success: function (res) {
            console.log(res);
            if (res.data.code == '0') {
              wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 800
              })
              that.joinreset();
            } else {
              wx.showModal({
                title: '添加失败',
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
              title: '添加失败',
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
  joinreset: function (e) {

    this.setData({
      joinshow: this.data.joinshow == true ? false : true,
      thejoinmsg: ""
    })
  },

  savethis: function () {
    var that = this
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    var data
    switch (that.data.typeid) {

      case '1':
        wx.getStorage({
          key: "token",
          success: function (res) {
            var token = res.data;
            that.uploadimg({
              url: loadimg,
              path:[that.data.logo] 
            },token);           
            }
        })
        
        break;
      case '2':
        data = {
          name: that.data.myname,
          nickName: that.data.myname,
          fillType: 2
        }
      break;
      case '11':
        data = {
          note: that.data.myintro,
          fillType: 2
        }
        break;
      case '3':
        data = {
          sex: that.data.thismysex + 1,
          fillType: 2
        }
        break;
      case '4':
        data = {
          industryId: that.data.tagid2,
          fillType: 2
        }
        break;
      case '5':
        data = {
          jobDutyId: that.data.jobthis,
          fillType: 2
        }
        console.log(data);
        break;
      case '6':
        wx.setNavigationBarTitle({
          title: '设置年龄段'
        })
        data = {
          generation: that.data.tagthis2,
          fillType: 2
        }
        break;
      case '7':
        data = {
          phone: that.data.myphone,
          fillType: 2
        }
        break;
      case '8':
        data = {
          wechatId: that.data.myweixin,
          fillType: 2
        }
        break;
      case '10':
        data = {
          tagId: that.data.tagid2,
          fillType: 2
        }
        console.log(data);
        break;
    }
    wx.showToast({
      title: '保存中',
      icon: 'loading',
      duration: 5000
    })

    /**
     * 更新个人信息
     */
    wx.getStorage({
      key: "token",
      success: function (res) {
        var token = res.data;
        //保存修改
        wx.request({
          url: baseurl + "user/updateUserInfo",
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
              wx.navigateBack({
                url: "../index/index"
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
               setTimeout(function(){
                 wx.hideToast();
               },600)
          }
        })
      }
    })
  },
  saveback: function () {
    wx.navigateBack({
      url: '../index/index'
    })
  },
  
})