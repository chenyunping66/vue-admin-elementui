import {
  AddDepartment
} from '@/api/search'
import axios from 'axios'
// eslint-disable-next-line no-irregular-whitespace
// export default {
const my = {
  namespaced: true, // 命名空间
  state: {
    AddDepartmentData: []
  },

  actions: {
    AddDepart(context) {
      axios.get('/departments')
        .then(res => {
          // debugger
          context.commit('AddDepart', res)
          // console.log(res.data.data.list)
          // alert('888')
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mutations: {
    AddDepart(state, res) {
      state.AddDepartmentData = res.data.data
      state.pageData = res.data
      // console.log(state.AddDepartmentData)
    }
  }
}
export default my
