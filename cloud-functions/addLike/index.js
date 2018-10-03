// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {

  const image = await db.collection('picture').doc(event.id).get();

  let res = await db.collection('picture').doc(event.id).update({
    data: {
      Plike: image.data.Plike + 1,
    },
    success: (res) => {
      console.log(res);
      return res;
    },
    fail: (error) => {
      console.log(error);
      return error;
    }
  });

  return res;
}