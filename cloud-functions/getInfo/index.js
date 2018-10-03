// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  let res = {
    images: 0,
    download: 0,
    like: 0,
  }

  let totleImage = await db.collection('picture').where({
    _openid: event.userInfo.openId
  }).get();

  for (let i in totleImage.data) {
    res.images += 1;
    res.download += totleImage.data[i].Pdownload;
    res.like += totleImage.data[i].Plike;
  }

  return res;
}