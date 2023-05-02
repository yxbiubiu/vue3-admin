import { createStore } from 'vuex'
import user from './userInfo'
export default createStore({
  //全局的状态初始值
  state: {
  },
  //计算state，获取对应的值
  getters: {
  },
  //更新状态的方法-更新state的唯一方法，commit mutation
  mutations: {
  },
  //可以异步操作，可以返回promise，更改数据还是传递到mutation去更改
  actions: {
  },
  //数据比较多，分模块
  modules: {
    user
  }
})
