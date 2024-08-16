import { createStore } from 'vuex'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

const customers = {
  // ... 保持現有的 customers 模塊不變
}

const courses = {
  // ... 保持現有的 courses 模塊不變
}

const bookings = {
  namespaced: true,
  state: () => ({
    list: []
  }),
  mutations: {
    setBookings(state, bookings) {
      state.list = bookings;
    },
    addBooking(state, booking) {
      state.list.push(booking);
    }
  },
  actions: {
    async fetchBookings({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/bookings`);
        commit('setBookings', response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }
    },
    async createBooking({ commit }, booking) {
      try {
        const response = await axios.post(`${API_URL}/bookings`, booking);
        commit('addBooking', response.data);
      } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
      }
    }
  }
};

export default createStore({
  modules: {
    customers,
    courses,
    bookings
  }
})