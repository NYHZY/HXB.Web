import request from './request.js'
//restful路径参数替换
const toRest = (url,params) => {
  let paramArr = url.match(/(?<=\{).*?(?=\})/gi)
  for (let key in params) {
    url +="\/"+params[key]
   }
  return url
}
const http ={
  /**
   * methods: 请求
   * @param url 请求地址 
   * @param params 请求参数
   */
  get(url,params){
      const config = {
          method: 'get',
          url:toRest(url,params)
      }
      // if(params) config.params = params
      return request(config)
  },
  post(url,params){
      const config = {
          method: 'post',
          url:url
      }
      if(params) config.data = params
      return request(config)
  },
  put(url,params){
      const config = {
          method: 'put',
          url:url
      }
      if(params) config.params = params
      return request(config)
  },
  delete(url,params){
      const config = {
          method: 'delete',
          url:url
      }
      if(params) config.params = params
      return request(config)
  }
}
//导出
export default http