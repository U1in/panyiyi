// pages/upload/index.js
import { db } from '../../config/db.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: '',
    keyWordString: '',
    keyWordArray: [],
  },
  /**
   * 选择图片函数
   */
  chooseImage () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: (res) => {
        console.log(res);
        // tempFilePath可以作为img标签的src属性显示图片
        this.setData({
          tempFilePaths: res.tempFilePaths[0],
        })
      }
    });
  },
  /**
   * 上传图床函数
   */
  upload () {
    if (this.data.tempFilePaths != '' && this.data.keyWordArray.length != 0) {
      wx.uploadFile({
        url: 'https://sm.ms/api/upload', //仅为示例，非真实的接口地址
        filePath: this.data.tempFilePaths,
        name: 'smfile',
        success: (res) => {
          let resp = JSON.parse(res.data);
          console.log(resp);
          let info = {
            Desc: this.data.keyWordArray,
            PURL: resp.data.url,
            DURL: resp.data.delete,
            Pdownload: 0,
            Plike: 0,
            time: new Date().getTime(),
          };
          db.collection('picture').add({
            data: info
          }).then(res => {
            this.setData({
              tempFilePaths: '',
              keyWordString: '',
              keyWordArray: [],
            });
            wx.showToast({
              title: "发布成功！",
              mask: true,
              image: '../../static/success.png'
            })
          });
        }
      })
    }
    
  },
  /**
   * 输入input函数
   */
  inputKeyword (e) {
    this.setData({
      keyWordString: e.detail.value
    })
  },
  /**
   * 添加标签函数
   */
  keyWordString2Array () {
    if (this.data.keyWordString[0] == "#") {
      wx.showToast({
        title: "不允许添加徽章。",
        mask: true,
        image: '../../static/fail.png'
      })
    }
    else {
      this.data.keyWordArray.push(this.data.keyWordString);
      this.setData({
        keyWordArray: this.data.keyWordArray,
        keyWordString: '',
      })
    }
  },
  /**
   * 删除标签函数
   */
  removeKeyWord (e) {
    let index = e.currentTarget.dataset.index;
    this.data.keyWordArray.splice(index, 1);
    this.setData({
      keyWordArray: this.data.keyWordArray,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(new Date().getTime());
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})