import createPersistedState from 'vuex-persistedstate'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { AddPosition } from '@/api/search'
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})
const PositionSelectId = {

  // modules: {
  namespaced: true,
  state: {
    positions: []
  },
  getters: {},
  actions: {},
  mutations: {
    setPrint(state, positions) {
      state.positions = positions
    }
  },
  // },
  // strict: debug,
  plugins: [vuexLocal.plugin]
  // plugins: [
  //   new VuexPersistence({
  //     reducer: state => ({
  //       positions: state.positions // 这个就是存入localStorage的值
  //     })
  //   }).plugin
  // ]
}

export default PositionSelectId

// const state = {
//   all: {
//     // positions: localStorage.getItem('positions')
//     positions: ''
//   }
// }

// const getters = {}

// const actions = {}

// const mutations = {
//   setPrint(state, all) {
//     state.all = all
//     // localStorage.setItem('all', all)
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   getters,
//   actions,
//   mutations
// }
