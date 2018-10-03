import { db } from '../../config/db.js';

Component({
  properties: {
    info: {
      type: Object,
    }
  },
  data: {
    likeFlag: 0,
    downloadFlag: 0
  },
  methods: {
    /**
   * 全屏预览函数
   */
    show () {
      wx.previewImage({
        urls: [this.data.info.PURL],
      })
    },
    /**
     * 保存图片函数
     */
    download() {
      if (this.data.downloadFlag == 0) {
        this.data.info.Pdownload += 1;
        this.setData({
          downloadFlag: 1,
          info: this.data.info
        })
        wx.authorize({
          scope: "scope.writePhotosAlbum"
        });
        wx.downloadFile({
          url: this.data.info.PURL,
          success: (res) => {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                wx.showToast({
                  title: '已保存',
                  image: '../../static/success.png'
                });
                wx.removeSavedFile({
                  filePath: res.tempFilePath,
                  complete: (res) => {
                    console.log(res);
                  }
                })
                wx.cloud.callFunction({
                  name: 'addDownload',
                  data: {
                    id: this.data.info._id,
                  },
                  success: (resp) => {
                    console.log(resp)
                  },
                  fail: (error) => {
                    this.data.info.Pdownload -= 1;
                    this.setData({
                      downloadFlag: 0,
                      info: this.data.info
                    })
                    console.log(error);
                    wx.showToast({
                      title: '记录发生错误',
                      image: '../../static/fail.png'
                    });
                    wx.removeSavedFile({
                      filePath: res.tempFilePath,
                      complete: (res) => {
                        console.log(res);
                      }
                    })
                  }
                })
              },
              fail: (error) => {
                this.data.info.Pdownload -= 1;
                this.setData({
                  downloadFlag: 0,
                  info: this.data.info
                })
                console.log(error);
                wx.showToast({
                  title: '保存发生错误',
                  image: '../../static/fail.png'
                });
                wx.removeSavedFile({
                  filePath: res.tempFilePath,
                  complete: (res) => {
                    console.log(res);
                  }
                })
              }
            })
          },
          fail: (error) => {
            wx.showToast({
              title: '下载发生错误',
              image: '../../static/fail.png'
            });
          }
        })
      }
    },
    like () {
      if(this.data.likeFlag == 0) {
        this.data.info.Plike += 1;
        this.setData({
          likeFlag: 1,
          info: this.data.info,
        });
        wx.cloud.callFunction({
          name: 'addLike',
          data: {
            id: this.data.info._id,
          },
          success: (resp) => {
            console.log(resp)
          },
          fail: (error) => {
            this.data.info.Plike -= 1;
            this.setData({
              likeFlag: 0,
              info: this.data.info,
            });
            wx.showToast({
              title: '记录发生错误',
              image: '../../static/fail.png'
            })
          }
        })
      }
    }
  }
})