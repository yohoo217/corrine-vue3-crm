// src/store/modules/customers.js
import apiClient from '../../api/config';

const state = {
  list: []
};

const mutations = {
  SET_CUSTOMERS(state, customers) {
    state.list = customers;
  },
  ADD_CUSTOMER(state, customer) {
    state.list.push(customer);
  },
  UPDATE_CUSTOMER(state, updatedCustomer) {
    const index = state.list.findIndex(c => c._id === updatedCustomer._id);
    if (index !== -1) {
      state.list.splice(index, 1, updatedCustomer);
    }
  },
  DELETE_CUSTOMER(state, customerId) {
    state.list = state.list.filter(customer => customer._id !== customerId);
  }
};

const actions = {
    async fetchCustomers({ commit }) {
        try {
          const response = await apiClient.get('/customers');
          const customers = response.data.map(customer => ({
            ...customer,
            _id: customer._id.$oid || customer._id, // Extract the string ID
          }));
          commit('SET_CUSTOMERS', customers); // Use 'customers' here
        } catch (error) {
          console.error('Failed to fetch customers:', error);
        }
      },
  async addCustomer({ commit }, customer) {
    try {
      const response = await apiClient.post('/customers', customer);
      commit('ADD_CUSTOMER', response.data);
    } catch (error) {
      console.error('Failed to add customer:', error);
    }
  },
  async updateCustomer({ commit }, customer) {
    try {
      const response = await apiClient.put(`/customers/${customer._id}`, customer);
      console.log('Updated customer response:', response.data); // Add this log
      commit('UPDATE_CUSTOMER', response.data);
    } catch (error) {
      console.error('Failed to update customer:', error);
    }
  },
  async deleteCustomer({ commit }, customerId) {
    try {
      console.log('Attempting to delete customer:', customerId);
      const id = customerId.$oid || customerId; // 處理可能的對象格式
      const response = await apiClient.delete(`/customers/${id}`);
      console.log('Delete response:', response);
      if (response.status === 200) {
        commit('DELETE_CUSTOMER', id);
      } else {
        throw new Error('Failed to delete customer');
      }
    } catch (error) {
      console.error('Failed to delete customer:', error);
      throw error;
    }
  }
};

const getters = {
  getCustomers: state => state.list
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
