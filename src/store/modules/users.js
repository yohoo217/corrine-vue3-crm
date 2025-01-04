// src/store/modules/users.js
import apiClient from '../../api/config';

const state = {
  list: []
};

const mutations = {
  SET_USERS(state, users) {
    state.list = users;
  },
  ADD_USER(state, user) {
    state.list.push(user);
  },
  UPDATE_USER(state, updatedUser) {
    const index = state.list.findIndex(u => u._id === updatedUser._id);
    if (index !== -1) {
      state.list.splice(index, 1, updatedUser);
    }
  },
  DELETE_USER(state, userId) {
    state.list = state.list.filter(user => user._id !== userId);
  }
};

const actions = {
  async fetchUsers({ commit, rootState }) {
    try {
      const token = rootState.auth.token;
      const response = await apiClient.get('users/non-admin', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const users = response.data.map(user => ({
        ...user,
        _id: user._id.$oid || user._id,
      }));
      commit('SET_USERS', users);
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async addUser({ commit, rootState }, userData) {
    try {
      const token = rootState.auth.token;
      const response = await apiClient.post('users', userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      commit('ADD_USER', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  async updateUser({ commit, rootState }, user) {
    try {
      const token = rootState.auth.token;
      const response = await apiClient.put(`users/${user._id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Updated user response:', response.data);
      commit('UPDATE_USER', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  async deleteUser({ commit, rootState }, userId) {
    try {
      const token = rootState.auth.token;
      await apiClient.delete(`users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      commit('DELETE_USER', userId);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};

const getters = {
  getUsers: state => state.list
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
