//src/store/index.js
import { createStore } from "vuex";
import axios from "axios";
import courses from "./modules/courses";
import auth from './modules/auth';
import users from './modules/users';

// const API_URL = "http://localhost:5001/api";
const API_URL = "https://wangcom.online/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

const bookings = {
  namespaced: true,
  state: () => ({
    list: [],
  }),
  mutations: {
    setBookings(state, bookings) {
      state.list = bookings;
    },
    addBooking(state, booking) {
      state.list.push(booking);
    },
  },
  actions: {
    async fetchBookings({ commit }) {
      try {
        const response = await apiClient.get("/bookings");
        commit("setBookings", response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
      }
    },
    async createBooking({ commit }, bookingData) {
      try {
        console.log("Creating booking with data:", JSON.stringify(bookingData));
        const response = await apiClient.post("/bookings", bookingData);
        console.log("Booking creation response:", response.data);
        commit("addBooking", response.data);
        return response.data;
      } catch (error) {
        console.error("Error in createBooking action:", error.response?.data);
        throw error;
      }
    },
  },
};

export default createStore({
  modules: {
    courses,
    bookings,
    auth,
    users
  },
});
