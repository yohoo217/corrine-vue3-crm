// src/store/modules/courses.js
import axios from "axios";
import apiClient from "@/api/config";

axios.defaults.baseURL = "http://localhost:5001/api";

const state = {
  list: [],
};

const mutations = {
  setCourses(state, courses) {
    console.log("Setting courses in state, raw data:", JSON.stringify(courses));
    state.list = courses.map((course) => ({
      id: course.id || course._id, // 使用 id 或 _id
      name: course.name,
      // 添加其他需要的字段
    }));
    console.log("Courses after mapping:", JSON.stringify(state.list));
  },
  addCourse(state, course) {
    state.list.push(course);
  },
  updateCourse(state, updatedCourse) {
    const index = state.list.findIndex((c) => c.id === updatedCourse.id);
    if (index !== -1) {
      state.list.splice(index, 1, updatedCourse);
    }
  },
  deleteCourse(state, courseId) {
    state.list = state.list.filter((c) => c.id !== courseId);
  },
};

const actions = {
  async fetchCourses({ commit }) {
    console.log("fetchCourses action called");
    try {
      const response = await apiClient.get("/courses");
      console.log(
        "Courses fetched successfully, raw data:",
        JSON.stringify(response.data)
      );
      commit("setCourses", response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },
  async addCourse({ commit }, course) {
    try {
      const response = await axios.post("/courses", course);
      commit("addCourse", response.data);
    } catch (error) {
      console.error("Error adding course:", error);
      throw error;
    }
  },
  async updateCourse({ commit }, course) {
    try {
      const response = await axios.put(`/courses/${course.id}`, course);
      commit("updateCourse", response.data);
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  },
  async deleteCourse({ commit }, courseId) {
    try {
      await axios.delete(`/courses/${courseId}`);
      commit("deleteCourse", courseId);
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    }
  },
  async fetchCourseById({ commit, state }, courseId) {
    if (state.list.some((c) => c.id === courseId)) {
      return; // Course already in state, no need to fetch
    }
    try {
      const response = await axios.get(`/courses/${courseId}`);
      commit("addCourse", response.data);
    } catch (error) {
      console.error("Error fetching course:", error);
      throw error;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
