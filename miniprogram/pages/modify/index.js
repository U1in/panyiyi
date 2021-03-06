import { db } from '../../config/db.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    page: 1,
  },
  showMore () {
    db.collection('picture').orderBy('time', 'desc').skip(20 * this.data.page).limit(20).get().then(res => {
      console.log(res);
      this.setData({
        images: this.data.images.concat(res.data),
        page: this.data.page + 1,
      });
      console.log(this.data.images);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('picture').orderBy('time', 'desc').limit(20).get().then( res => {
      this.setData({
        images: res.data,
      })
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