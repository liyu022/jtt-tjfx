// 日志记录
import axios from 'axios'
import qs from 'qs'

const LogURL = 'http://10.228.2.135:7001/jtyj/rest/base/tmSysLogHandler/saveSyslog'

export default {
  logging (funcId, funcName, logMsg) {
    let userId = sessionStorage.getItem('userId')
    let data =
      {
        'funcId': funcId,
        'funcName': funcName,
        'logMsg': logMsg,
        'userId': userId
      }
    if(userId != null && userId != '' && userId != 'undefined'){
      axios.post(
        LogURL,
        qs.stringify(data),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }
      ).then(function (response) {
        console.log(response)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
