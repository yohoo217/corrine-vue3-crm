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
          image: "https://static.ottercdn.com/trek/media/3ff9c4c0-797e-447f-9b9d-773378fb60b1.png",
        },
        {
          _id: "66ad08a4841e69a74ed3e4f2",
          name: "日文主題會話班",
          image: "https://static.ottercdn.com/trek/media/e8c56e9d-c85c-4e1a-bab4-76325433fd36.png",
        },
        {
          _id: "66ad0e5f405be3b46210760e",
          name: "日語家教",
          image: "https://static.ottercdn.com/trek/media/a255e599-b72d-44b3-a777-dcac018662c0.png",
        },
        {
          _id: "66ae5f68efe57d99fac184ae",
          name: "英語家教",
          image: "https://static.ottercdn.com/trek/media/ad3a4121-f149-4edd-84b8-d506f82206e0.webp",
        },
      ],
    };
  },
  methods: {
    goToCourseDetail(courseId) {
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
  background-color: #f8f9fa;
  font-family: 'Arial', sans-serif;
}

.header-section {
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://static.ottercdn.com/trek/media/df096fdf-e364-4633-8bac-55ffe2d8151f.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  margin-bottom: 40px;
}

.header-section h1 {
  color: white;
  font-size: 4rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  letter-spacing: 2px;
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  border: none;
  text-align: center;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.course-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.course-image {
  max-width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 15px;
  transition: transform 0.3s ease;
}

.course-card:hover .course-image {
  transform: scale(1.05);
}

.course-card h3 {
  font-size: 1.4rem;
  margin: 0 0 10px;
  color: #333;
  font-weight: 600;
}

.course-card p {
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
}

.course-card .btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 15px;
  transition: background-color 0.3s ease;
}

.course-card .btn:hover {
  background-color: #0056b3;
}
</style>