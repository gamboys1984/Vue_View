var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  aaa:'"dev"',
  VERSION_URL:'"https://apiint.iemylife.com/"',    //升级平台接口URL
  IOS_SCHEMAIOS_URL:'"babydailytest"',    //IOS版本信息唯一标识，请求升级平台接口用
  ANDROID_SCHEMAIOS_URL:'"com.innovation.chengzhangriji.vip.testurl"', //安卓版本信息唯一标识，请求升级平台接口用
  ANDROID_PROP_SCHEMAIOS_URL:'"com.innovation.chengzhangriji.vip.testurl"',        //store的IOS版本信息唯一标识，请求升级平台接口用 
  IOS_PROP_SCHEMAIOS_URL:'"babydailytest"',    //store的安卓版本信息唯一标识，请求升级平台接口用
  ROUTER_PATH: '""',    //VUE发布路由路径
  //API_URL:'"http://localhost:6275/"', //API接口的基本路径
  API_URL:'"https://czrjapidev.iemylife.com/"', //API接口的基本路径
  //Admin_URL:'"http://localhost:39370"',//WebAPP页获取的后台的域名
  Admin_URL:'"https://czrjdev.iemylife.com/"',//WebAPP页获取的后台的域名
  //LOCAL_URL:'"http://localhost:6275/"'  // 本地路径：http://localhost:8080
  UN:'"15822524987"',  //当前登录账号
  AccessToken:'"1b5a283db95640849e191a89278a3c71"',  //当前登录账号Token
  UPLOAD_DOMAIN:'"http://192.168.10.13:8013/controller.ashx"'  //富文本上传图片的接口地址
})
