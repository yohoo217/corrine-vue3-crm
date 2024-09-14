<!-- src/views/CourseDetail.vue -->
<template>
  <div class="course-detail" v-if="course">
    <h2>{{ course.name }}</h2>
    <!-- Add more course details here -->
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';  // 移除 ref
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  name: 'CourseDetail',
  setup() {
    const store = useStore();
    const route = useRoute();
    const courseId = computed(() => route.params.id);
    const course = computed(() => 
      store.state.courses.list.find(c => c.id === courseId.value)
    );

    onMounted(() => {
      if (!course.value) {
        store.dispatch('courses/fetchCourses');
      }
    });

    return { course };
  }
}
</script>