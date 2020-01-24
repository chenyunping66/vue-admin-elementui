import axios from './http'

function login() {
  const url = this.GLOBAL.BASE_URL + '/login'
  return axios.post(url)
}

export default {
  login
}
