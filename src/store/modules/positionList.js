import {
  positions
} from '@/api/search'
// import axios from 'axios'
// eslint-disable-next-line no-irregular-whitespace
// export default {
const positionList = {
  namespaced: true,
  state: {
    positionListData: []
  },

  actions: {
    getPositionList({ commit }, params) {
      // console.log(params, '########$$$%%%')
      positions({
        pageNo: params.pageNo,
        pageSize: params.pageSize
      })
        .then(res => {
          params.callBack && params.callBack(res)
          commit('getPositionList', res)
        })
        .catch(e => {
          params.error && params.error(e)
        })
    }
  },
  mutations: {
    getPositionList(state, res) {
      state.positionListData = res.data.list
    //  / var l = res.data.positions.positionId
    }
  }
}
export default positionList

