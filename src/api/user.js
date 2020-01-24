import request from '@/utils/request'

export function login(params) {
  // const datas = {
  //   'username': 'admin',
  //   'password': '888888'
  // }
  return request({
    url: '/login',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    // params: {
    //   data: this.$qs.stringify(datas)
    // }
    params
  })
}

export function getInfo(token) {
  return request({
    url: '/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
