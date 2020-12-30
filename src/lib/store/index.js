import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import {state} from './state'
import mutations from './mutations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  // 将各组件分别模块化存入 Store
  actions,
  getters,
  mutations,
  state,
  strict: debug
})
