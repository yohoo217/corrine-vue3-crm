<template>
  <div class="course-info-page">
    <!-- Header Section with Background Image and Title -->
    <section class="header-section">
      <h1>課程資訊</h1>
    </section>

    <!-- Course Cards Section -->
    <section class="courses-grid">
      <div class="course-card" v-for="course in courses" :key="course._id" @click="goToCourseDetail(course._id)">
        <img :src="course.image" :alt="course.name" class="course-image" />
        <h3>{{ course.name }}</h3>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "CourseInfo",
  data() {
    return {
      courses: [
        {
          _id: "66ae5d1359e9598a463be248",
          name: "旅遊日文班",
          image: "https://static.ottercdn.com/trek/media/3ff9c4c0-797e-447f-9b9d-773378fb60b1.png", // URL for Travel Japanese
        },
        {
          _id: "66ad08a4841e69a74ed3e4f2",
          name: "日文主題會話班",
          image: "https://static.ottercdn.com/trek/media/e8c56e9d-c85c-4e1a-bab4-76325433fd36.png", // URL for Japanese Conversation Class
        },
        {
          _id: "66ad0e5f405be3b46210760e",
          name: "日語家教",
          image: "https://static.ottercdn.com/trek/media/a255e599-b72d-44b3-a777-dcac018662c0.png", // URL for Japanese Tutor
        },
        {
          _id: "66ae5f68efe57d99fac184ae",
          name: "英語家教",
          image: "https://static.ottercdn.com/trek/media/ad3a4121-f149-4edd-84b8-d506f82206e0.webp", // URL for English Tutor
        },
      ],
    };
  },
  methods: {
    goToCourseDetail(courseId) {
      // 使用 _id 進行導航
      this.$router.push({ path: `/course/${courseId}` });
    },
  },
};
</script>

<style scoped>
.course-info-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.header-section {
  width: 100%;
  background: url('https://static.ottercdn.com/trek/media/df096fdf-e364-4633-8bac-55ffe2d8151f.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  margin-bottom: 20px;
  position: relative;
}

.header-section h1 {
  color: white;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.course-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;
}

.course-card:hover {
  transform: translateY(-5px);
}

.course-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.course-card h3 {
  font-size: 1.2rem;
  margin: 0;
  color: #333;
}
</style>
