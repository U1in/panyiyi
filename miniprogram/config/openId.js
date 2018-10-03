var openId = '';

wx.cloud.init({
  env: "panyiyi-17ef4a"
});

wx.cloud.callFunction({
  name: "getId",
  data: {},
  success: res => {
    openId = res.result;
  }
})

export { openId };