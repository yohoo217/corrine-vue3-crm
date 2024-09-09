<!-- src/components/CourseList.vue -->
<template>
  <div>
    <h2>課程列表</h2>
    <ul>
      <li v-for="course in courses" :key="course.id">
        {{ course.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';

export default {
  name: 'CourseList',
  setup() {    
    const store = useStore();

    onMounted(() => {
      store.dispatch('courses/fetchCourses');
    });
    
    const courses = computed(() => store.state.courses.list);

    return {
      courses,
    };
  }
}
</script>