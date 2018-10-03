import { db } from '../../config/db.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    badgeName: '',
    badgeDesc: '',
    badgeRemark: '',
    reset: ''
  },
  createName (e) {
    this.setData({
      badgeName: e.detail.value
    })
  },
  createDesc (e) {
    this.setData({
      badgeDesc: e.detail.value
    })
  },
  createRemark (e) {
    this.setData({
      badgeRemark: e.detail.value
    })
  },
  create () {
    if (this.data.badgeName != '' && this.data.badgeDesc != '' && this.data.badgeRemark != '') {
      db.collection('badge').add({
        data: {
          Bname: this.data.badgeName,
          Bdesc: this.data.badgeDesc,
          Bremark: this.data.badgeRemark
        },
        success: (res) => {
          console.log(res);
          wx.showToast({
            title: '创建徽章成功',
            image: '../../static/success.png'
          });
          this.setData({
            badgeName: '',
            badgeDesc: '',
            badgeRemark: '',
            reset: ''
          })
        },
        fail: (error) => {
          console.log(error);
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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