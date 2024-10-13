// src/store/modules/auth.js
import router from '@/router';

const state = {
  token: localStorage.getItem('token') || '',
  role: localStorage.getItem('role') || 'guest',
};

const mutations = {
  SET_TOKEN(state, { token, role }) {
    state.token = token;
    state.role = role;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  },
  CLEAR_TOKEN(state) {
    state.token = '';
    state.role = 'guest';
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  },
};

const actions = {
  login({ commit }, { token, role }) {
    commit('SET_TOKEN', { token, role });
  },
  async logout({ commit }) {
    commit('CLEAR_TOKEN');
    await router.push('/'); // 使用 await 確保路由變更完成
    window.location.reload(); // 重新加載頁面
  },
};

const getters = {
  isAuthenticated: state => !!state.token,
  userRole: state => state.role,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};