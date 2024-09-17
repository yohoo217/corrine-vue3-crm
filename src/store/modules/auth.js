// src/store/modules/auth.js
const state = {
  token: localStorage.getItem('token') || '',
  role: localStorage.getItem('role') || 'guest', // 默认状态为 guest
};

const mutations = {
  SET_TOKEN(state, { token, role }) {
    state.token = token;
    state.role = role;
    localStorage.setItem('token', token); // 存储 token
    localStorage.setItem('role', role);   // 存储角色
  },
  CLEAR_TOKEN(state) {
    state.token = '';
    state.role = 'guest'; // 清除后状态重置为 guest
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  },
};

const actions = {
  login({ commit }, { token, role }) {
    commit('SET_TOKEN', { token, role }); // 更新状态为登录
  },
  logout({ commit }) {
    commit('CLEAR_TOKEN'); // 更新状态为未登录
  },
};

const getters = {
  isAuthenticated: state => !!state.token, // 返回 true 表示已登录
  userRole: state => state.role, // 获取用户角色
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
