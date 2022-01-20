import axios from 'axios'
import Qs from 'qs'
const service=axios.create({
    //10.0.0.124
    //https://localhost:5001/api/
    baseURL:'https://localhost:5001/api/',
    transformRequest:[ (data,config)=>{
      if (!config["Content-Type"]) return Qs.stringify(data);
        switch (config["Content-Type"].toLowerCase()) {
            case "application/json;charset=utf-8": {
                return JSON.stringify(data);
            }
            case "multipart/form-data;charset=utf-8": {
                return data;
            }
            default: {
                return Qs.stringify(data);
            }
        }
    }],
    // timeout:5000,
    //responseType:'json',
    //application/x-www-form-urlencoded;charset=UTF-8
    headers:{
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
        
    }
})
//请求拦截
service.interceptors.request.use(config=>{
    config.headers.Authorization=sessionStorage.getItem('token')?sessionStorage.getItem('token'):'';
    return config
})
service.interceptors.response.use(res=>{
    return res.data
},error=>{
  /***** 接收到异常响应的处理开始 *****/
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        // window.location.href = "/NotFound"
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
        break;
      }
    }
    return error
})
export default service