// src/store/modules/auth.js
const state = {
    token: localStorage.getItem('token') || '',
  };
  
  const mutations = {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    CLEAR_TOKEN(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
  };
  
  const actions = {
    login({ commit }, token) {
      commit('SET_TOKEN', token);
    },
    logout({ commit }) {
      commit('CLEAR_TOKEN');
    },
  };
  
  const getters = {
    isAuthenticated: state => !!state.token,
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  