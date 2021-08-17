import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo:{},
    token:''
  },
  mutations: {
    setuserinfo(state, userinfo){
      console.log(userinfo)
      state.userinfo = userinfo;//将传参设置给state的city
    },
    settoken(state,token){
      state.token=token;
    }
  },
  actions: {
    updatetuserinfo(context,userinfo) {
      console.log(userinfo)
      context.commit("setuserinfo",userinfo);
    },
    updatetoken(context,token){
      context.commit("settoken",token);
    }
  },
  modules: {
  }
})
