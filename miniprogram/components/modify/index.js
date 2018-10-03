import { db } from '../../config/db.js'

Component({
  properties: {
    info: {
      type: Object,
    },
  },
  data: {
    modifyShow: false,
    inputString: '',
    reset: '',
    show: true,
  },
  methods: {
    showModify() {
      this.setData({
        modifyShow: !this.data.modifyShow
      })
    },
    input (e) {
      this.setData({
        inputString: e.detail.value,
      })
    },
    addKeyWord () {
      if (this.data.info.Desc.indexOf(this.data.inputString) < 0) {
        this.data.info.Desc.push(this.data.inputString)
        this.setData({
          info: this.data.info
        })
      }
      else {
        wx.showToast({
          title: '已存在标签',
          image: '../../static/fail.png'
        })
      }
    },
    removeKeyWord (e) {
      let index = e.currentTarget.dataset.index;
      this.data.info.Desc.splice(index, 1);
      this.setData({
        info: this.data.info,
      })
    },
    modify () {
      db.collection('picture').doc(this.data.info._id).update({
        data: {
          Desc: this.data.info.Desc,
        },
        success: (res) => {
          wx.showToast({
            title: '修改成功',
            image: '../../static/success.png'
          });
          this.setData({
            inputString: '',
            reset: '',
          })
        },
        fail: (error) => {
          console.log(error);
        }
      })
    },
    remove () {
      wx.request({
        url: this.data.info.DURL,
        success: (res) => {
          console.log(res);
          db.collection('picture').doc(this.data.info._id).remove({
            success: () => {
              wx.showToast({
                title: '删除成功',
                image: '../../static/success.png'
              });
              this.setData({
                show: false,
              })
            },
            fail: () => {
              wx.showToast({
                title: '删除出错',
                image: '../../static/fail.png'
              })
            }
          })
        },
        fail: (error) => {
          console.log(error);
        }
      })
    }
  }
})