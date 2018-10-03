import { db } from '../../config/db.js';

Component({
  properties: {
    item: {
      type: Object,
    },
    badge: {
      type: String
    }
  },
  data: {
    already: -1,
  },
  attached () {
    /*
      created 组件实例化，但节点树还未导入，因此这时不能用setData
      attached 节点树完成，可以用setData渲染节点，但无法操作节点
      ready 组件布局完成，这时可以获取节点信息，也可以操作节点
      moved 组件实例被移动到树的另一个位置
      detached 组件实例从节点树中移除
     */
    this.setData({
      already: this.data.item.Desc.indexOf("#" + this.data.badge),
    })
  },
  methods: {
    doGive() {
      let index = -1;
      let newBadge = '#' + this.data.badge;
      if (this.data.item.Desc.indexOf(newBadge) < 0 ){
        for (let i = 0; i < this.data.item.Desc.length; i++) {
          if (this.data.item.Desc[i][0] == '#') {
            index = i;
          }
        }
        this.data.item.Desc.splice(index + 1, 0, newBadge);
        db.collection('picture').doc(this.data.item._id).update({
          data: {
            Desc: this.data.item.Desc,
          },
          success: (res) => {
            this.setData({
              item: this.data.item,
              already: this.data.item.Desc.indexOf("#" + this.data.badge),
            }); 
            wx.showToast({
              title: '授予成功',
              image: '../../static/success.png',
            })
          },
          fail: (error) => {
            console.log(error);
          }
        })
      }
      else {
        wx.showToast({
          title: '已授予徽章',
          image: '../../static/fail.png',
        })
      }
    },
  }
})