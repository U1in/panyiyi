import { db } from '../../config/db.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    column1: [],
    column2: [],
    column3: [],
  },
  search (e) {
    wx.navigateTo({
      url: '../search/index?query=' + encodeURI('#'+ e.currentTarget.dataset.badge),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('badge').get().then( res => {
      res.data.sort( (a,b) => {
        return a.Bdesc.length - b.Bdesc.length;
      })
      let data = res.data;
      for (let i = 0, j = 0, p = data.length - 1; j <= data.length - 1; j++) {
        if(j % 2 == 0) {
          this.data['column' + ((j % 3) + 1)].push(data[i]);
          i++;
        }
        else {
          this.data['column' + ((j % 3) + 1)].push(data[p]);
          p--;
        }
      }
      this.setData({
        column1: this.data.column1,
        column2: this.data.column2,
        column3: this.data.column3,
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