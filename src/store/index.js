import { createStore } from 'vuex'
import axios from 'axios'
import courses from './modules/courses'

const API_URL = 'http://localhost:5001/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  withCredentials: true
});

const customers = {
  // 保持為空，如原始代碼
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
        const response = await apiClient.get('/bookings');
        commit('setBookings', response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }
    },
    async createBooking({ commit }, booking) {
      try {
        const response = await apiClient.post('/bookings', booking);
        commit('addBooking', response.data);
      } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
      }
    }
  }
};

// 修改 courses 模塊以使用新的 apiClient
const updatedCourses = {
  ...courses,
  actions: {
    ...courses.actions,
    async fetchCourses({ commit }) {
      try {
        const response = await apiClient.get('/courses');
        commit('setCourses', response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
      }
    },
    async addCourse({ dispatch }, courseData) {
      try {
        await apiClient.post('/courses', courseData);
        await dispatch('fetchCourses');
      } catch (error) {
        console.error('Error adding course:', error);
        throw error;
      }
    }
  }
};

export default createStore({
  modules: {
    customers,
    courses: updatedCourses,
    bookings
  }
})