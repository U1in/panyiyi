import { list } from './list.js';
import { db } from '../../config/db.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    page: 1,
    list: [],
    showTop: false
  },
  showMore (e) {
    db.collection('picture').orderBy('Plike', 'desc').orderBy('Pdownload', 'desc').skip(20 * this.data.page).limit(20).get().then(res => {
      console.log(res);
    });
  },
  reflash() {
    db.collection('picture').orderBy('Plike', 'desc').orderBy('Pdownload', 'desc').limit(20).get().then(res => {
      this.setData({
        list: res.data,
        scrollTop: 0,
      })
    });
  },
  scrollToTop () {
    this.setData({
      scrollTop: 0,
    })
  },
  scroll (e) {
    if (e.detail.scrollTop > 500) {
      this.setData({
        showTop: true
      });
    } else {
      this.setData({
        showTop: false
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reflash();
    wx.authorize({
      scope: "scope.writePhotosAlbum",
      success: function() {
        
      },
      fail: function() {

      }
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
    db.collection('picture').orderBy('Plike', 'desc').orderBy('Pdownload', 'desc').limit(20).get().then(res => {
      this.setData({
        list: res.data
      })
      wx.stopPullDownRefresh({});
    });
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