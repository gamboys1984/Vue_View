import axios from 'axios'
import qs from 'qs'
// axios 配置
axios.defaults.timeout = 50000000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.baseURL = 'http://localhost:6275/'
axios.defaults.baseURL = process.env.API_URL + '/'
// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  alert('错误的传参', 'fail')
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
  if (!res.data.Result) {
    // _.toast(res.data.msg);
    return Promise.reject(res)
  }
  return res
}, (error) => {
  alert('网络异常', 'fail')
  return Promise.reject(error)
})

export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function post (url, data = {}, page) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(res => {
        resolve(res.data)
        if (page) {
          setTimeout(function () {
            page.$emit('frameHeight')
          }, 500)
        }
      }, err => {
        reject(err)
      })
  })
}

export default {
  // ### 后台维护相关接口
  GetHelpDetail (params, page) {
    return post('api/9999999/Get_Help_Detail?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  SetHelpDetail (params, page) {
    return post('api/9999999/Set_Help_Question?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  DelHelpDetail (params, page) {
    return post('api/9999999/Del_Help_Question?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  // ### end
  GetOnlineHelpList (params, page) {
    return post('api/9999999/Get_OnlineHelpList?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  GetSystemSetting (params, page) {
    return post('api/9999999/Get_SystemSetting?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  GetOnlineHelpDetail (params, page) {
    return post('api/9999999/Get_OnlineHelpDetail?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  UploadImg (params, page) {
    return post('api/9999999/Upload_Img?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  AddOnlineHelp (params, page) {
    return post('api/9999999/Add_OnlineHelp?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  AddFAQInfo (params, page) {
    return post('api/9999999/Add_FAQInfo?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  GetVersionList (params, page) {
    let http = axios.create({
      baseURL: process.env.VERSION_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        // Do whatever you want to transform the data
        return qs.stringify(data)
      }]
    })
    return http.post('api/Get_VersionList?App=IEMyLife', {
      content: params
    }, page).then((res) => res.data)
  },
  GetVersionDetail (params, page) {
    let http = axios.create({
      baseURL: process.env.VERSION_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        // Do whatever you want to transform the data
        return qs.stringify(data)
      }]
    })
    return http.post('api/Get_SpecificVersion?App=IEMyLife', {
      content: params
    }).then((res) => res.data)
  },
  SetDueDataInfo (params, page) {
    return post('api/9999999/Set_DueData_Info?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  GetDueDataInfo (params, page) {
    return post('api/9999999/Get_DueData_Info?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  DelDueDataInfo (params, page) {
    return post('api/9999999/Del_DueData_Info?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  // ### 问题路径相关接口
  SetProblemPath (params, page) {
    return post('api/9999999/Set_ProblemPath?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  GetProblemPath (params, page) {
    return post('api/9999999/Get_ProblemPath?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  DelProblemPath (params, page) {
    return post('api/9999999/Del_ProblemPath?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  // # end
  // # 标签 贴纸等相关接口
  GetStickerTags (params, page) {
    return post('api/9999999/Get_Sticker_Tags?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  SetStickerTags (params, page) {
    return post('api/9999999/Set_Sticker_Tags?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  DelStickerTags (params, page) {
    return post('api/9999999/Del_Sticker_Tags?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  // # end
  GetShareVideo (params, page) {
    return post(`api/9999999/Get_Share_Video?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112&SC=001cfe2fe7044aa691d4e6eff9bfb56c&SV=e078a3439cb54cb7823751f3e52caaa7&ShareID=${params}`, page)
  },
  GetGrowBabyList (params, page) {
    return post('api/9999999/Get_GrowUpBaby_InfoList?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  OperationGrowUpBaby (params, page) {
    return post('api/9999999/Operation_GrowUpBaby?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  GetQingGongList (params, page) {
    return post('api/9999999/Get_QingGong_List?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  },
  UploadQingGong (params, page) {
    return post('api/9999999/Upload_QingGong?Agent=IPhone&AgentID=064f951395e14bb590ab2ca6ff985e50&Hw=&HwVer=&Fw=&FwVer=&Os=IOS&OsVer=IOS 8.1&App=BabyDiary&AppID=f382ef332dcc45dcbfc85dda0d66f386&AppVer=0.0.0.1&Account=&Language=中文&Locale=&Token=f09296781cfc41e896bb22c3be57d112', {
      content: params
    }, page)
  }
}
