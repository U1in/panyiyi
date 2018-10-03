import { db } from '../../config/db.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    badge: '',
    query: '',
    images: []
  },
  inputSearch(e) {
    this.setData({
      query: e.detail.value,
    })
  },
  getResult() {
    db.collection('picture').where({
      Desc: db.command.in(this.data.query.split(' ')),
    }).get().then(res => {
      this.setData({
        resultList: res.data
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      badge: decodeURI(options.query),
    })
    wx.setNavigationBarTitle({
      title: decodeURI(options.query),
    });
    db.collection('picture').get().then(res => {
      this.setData({
        images: res.data,
      })
      console.log(this.data.images);
    })
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