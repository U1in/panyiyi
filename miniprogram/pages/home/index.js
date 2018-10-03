import { openId } from '../../config/openId.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord: '',
  },

  /**
   * 跳转搜索
   */
  search () {
    wx.navigateTo({
      url: '../search/index?query=' + encodeURI(this.data.keyWord),
    })
  },
  useless () {
    if (openId === 'oGI095ezSSzRUR7-5maQXfRV9ThA') {
      wx.navigateTo({
        url: '../mine/index',
      })
    }
    else {
      console.log(openId);
    }
  },
  userInfo (e) {
    console.log(e);
  },
  /**
   * 监听输入
   */
  inputKeyword (e) {
    this.setData({
      keyWord: e.detail.value,
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})