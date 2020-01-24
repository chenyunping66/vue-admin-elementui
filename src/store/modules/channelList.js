import axios from 'axios'
import { channel } from '@/api/search'
// eslint-disable-next-line no-irregular-whitespace
// export default {
const my = {
  namespaced: true,
  state: {
    ChannelListData: []
  },

  actions: {
    ChannelList({ commit }, params) {
      // console.log(params, '---1--223-3334')
      debugger
      channel(params)
        .then(res => {
          // params.callBack && params.callBack(res)
          commit('ChannelList', res)
        })
        .catch(e => {
          // params.error && params.error(e)
          console.log(e)
        })
    }

    // ChannelList(context) {
    //   axios.get('/channel/list'
    //     // , {
    //     //   params: {
    //     //     pageNo: this.pageNo
    //     //   }
    //     // }
    //   )
    //     .then(res => {
    //       // debugger
    //       context.commit('ChannelList', res)
    //       // console.log(res.data.data.list)
    //       // alert('888')
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // }
  },
  mutations: {
    ChannelList(state, res) {
      // debugger
      state.ChannelListData = res.data.list
      // state.pageData = res.data
      // console.log(state.ChannelListData)
    }
  }
}
export default my
