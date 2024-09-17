<!-- src/views/CourseDetail.vue -->
<template>
  <div class="course-detail" v-if="course">
    <!-- 課程標題 -->
    <section class="header-section">
      <h1>{{ course.name }}</h1>
    </section>

    <!-- 課程描述和圖片區塊 -->
    <section class="description-section">
      <div class="description-image">
        <img :src="course.image" :alt="course.name" />
      </div>
      <div class="description-content">
        <h2>{{ course.subname }}</h2>
        <p>{{ course.description }}</p>
      </div>
    </section>

    <!-- 課程特色 -->
    <section class="features-section" v-if="course.features && course.features.length">
      <div class="feature-card" v-for="feature in course.features" :key="feature.title">
        <img :src="feature.image" :alt="feature.title" class="feature-image" />
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </section>
  </div>
  <p v-else>Loading course details...</p> <!-- Optional loading message -->
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  name: 'CourseDetail',
  setup() {
    const store = useStore();
    const route = useRoute();
    const courseId = computed(() => route.params.id);
    const course = computed(() => 
      store.state.courses.list.find(c => c.id === courseId.value || c._id === courseId.value)
    );

    onMounted(() => {
      if (!course.value) {
        store.dispatch('courses/fetchCourses').then(() => {
          if (!course.value) {
            store.dispatch('courses/fetchCourseById', courseId.value);
          }
        });
      }
    });

    return { course };
  }
}
</script>

<style scoped>
.course-detail {
  padding: 20px;
}

.header-section {
  background-image: url('https://static.ottercdn.com/trek/media/df096fdf-e364-4633-8bac-55ffe2d8151f.jpg'); /* 替換成適當的背景圖 */
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: #fff;
}

.header-section h1 {
  font-size: 3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.description-section {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  align-items: center;
}

.description-image img {
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.description-content {
  max-width: 600px;
}

.description-content h2 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.description-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
}

.features-section {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.feature-card {
  text-align: center;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 250px;
}

.feature-card img {
  max-width: 150px;
  height: auto;
  margin-bottom: 8px;
}

.feature-card h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.feature-card p {
  font-size: 0.9rem;
  color: #555;
}
</style>
