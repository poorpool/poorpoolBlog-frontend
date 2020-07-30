import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types ={
  SET_AUTHENTICATED: 'SET_AUTHENTICATE',
  SET_USER: 'SET_USER',
  SET_TOKEN: 'SET_TOKEN'
};

const state = {
  isAuthenticated: false,
  user: {},//其实user.aud才是userId
  token: ''
};

const getters ={
  isAuthenticated: state =>state.isAuthenticated,
  user: state => state.user,
  token: state => state.token
};

const mutations ={
  [types.SET_AUTHENTICATED](state,isAuthenticated){      /*设置是否授权*/
    if(isAuthenticated) state.isAuthenticated = isAuthenticated;
    else state.isAuthenticated = false;
  },
  /*类型，参数*/
  [types.SET_USER](state,user){
    if (user) state.user = user;
    else state.user = {};
  },
  [types.SET_TOKEN](state,token){
    if (token && token!=='') state.token = token;
    else state.token = '';
  }
};

/*异步操作  调用mutations*/
const actions ={
  setAuthenticated:( {commit},isAuthenticated) =>{
    commit(types.SET_AUTHENTICATED,isAuthenticated);
  },
  setUser:({commit},user) =>{
    commit(types.SET_USER,user);
  },
  setToken:({commit},token) =>{
    commit(types.SET_TOKEN,token);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});