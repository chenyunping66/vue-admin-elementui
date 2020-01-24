import axios from 'axios'
import qs from 'qs'
import { config } from '@vue/test-utils'

// axios.get(url, {
//   params: {

//   }
// }).then(response => {

// }).catch(error => {

// })
// 根据环境变量区分接口的默认地址
switch (process.env.NODE_ENV) {
  // 开发环境
  case 'production':
    axios.defaults.baseURL = 'http://120.25.219.238:8888'
    break
  case 'test':
    // 测试环境
    axios.defaults.baseURL = ''
  // eslint-disable-next-line no-fallthrough
  default:
    // 生产环境是部署到服务器上的环境
    axios.defaults.baseURL = ''
}

// 开发环境
axios.defaults.baseURL = 'http://120.25.219.238:8888'

// 设置超时时间和跨域是否允许携带凭证
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true // 跨域是否携带

// 设置请求传递数据的格式(服务器要求什么格式)
// x-www-form-urlencoded
axios.defaults.headers['Content-type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = data => qs.stringify(data) // 改变请求主体格式

// 设置请求拦截器  客户端请求->【请求拦截器】-> 服务器
// 响应拦截器
// TOKEN校验(JWT):接收服务器返回的token，存储到vuex/本地存储中，
// 每一次向服务器请求，我们应该把token带上
axios.interceptors.request.use(config => {
  // 携带上token
  const token = localStorage.getItem('token')
  token && (config.headers.Authorization = token)
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器:服务器返回信息， -> 拦截的统一处理 ->客户端JS获取信息
// 自定义请求状态码
axios.interceptors.response.use(response => {
  console.log(response.data);
  return response.data
}, error => {
   console.log(error)
  const { response } = error
  if (response) {
    // 服务器最新返回结果
    // =>服务器最起码返回结果了
    switch (response.status) {
      case 401: // =》权限
        break
      case 403: // 服务器已经请求但是拒绝执行(token或session过期)
        break
      case 404: // =》找不到页面
        break
    }
    if (!window.navigator.onLine) {
      // 断网处理：可以转到断网页面
      return
    }
    return Promise.reject(error)
  }
})

export default axios
