import { openId } from '../../config/openId.js';
import { db } from '../../config/db.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {
      mages: 0,
      download: 0,
      like: 0
    }
  },

  upload () {
    wx.navigateTo({
      url: '../upload/index',
    })
  },
  modify () {
    wx.navigateTo({
      url: '../modify/index',
    })
  },
  create () {
    wx.navigateTo({
      url: '../create/index',
    })
  },
  bodify () {
    wx.navigateTo({
      url: '../bodify/index',
    })
  },
  give () {
    wx.navigateTo({
      url: '../give/index',
    })
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
    wx.cloud.callFunction({
      name: 'getInfo',
      success: res => {
        this.setData({
          info: res.result,
        })
      }
    })
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