<template>
  <div class="news-page">
    <!-- Header Section with Background Image and Title -->
    <section class="header-section">
      <h1>{{ $t("news.title") }}</h1>
    </section>

    <!-- News List Section -->
    <section class="news-list">
      <div class="news-item" v-for="news in newsList" :key="news.id">
        <div class="news-date">
          <p>{{ formatDate(news.date) }}</p>
        </div>
        <div class="news-content">
          <h3>{{ $t(news.titleKey) }}</h3>
          <p>{{ $t(news.summaryKey) }}</p>
          <a
            :href="news.link"
            target="_blank"
            rel="noopener noreferrer"
            class="read-more"
            >{{ $t("news.read_more") }}</a
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "NewsPage",
  data() {
    return {
      newsList: [
        {
          id: 1,
          date: "2024-07-24",
          titleKey: "news.autumn_course.title",
          summaryKey: "news.autumn_course.summary",
          link: "https://www.instagram.com/p/C9zTBFfvmYW/?img_index=1",
        },
        {
          id: 2,
          date: "2024-07-01",
          titleKey: "news.bilingual_cafe_july.title",
          summaryKey: "news.bilingual_cafe_july.summary",
          link: "https://www.facebook.com/events/1180796836497258/",
        },
        {
          id: 3,
          date: "2024-05-28",
          titleKey: "news.bilingual_cafe_may.title",
          summaryKey: "news.bilingual_cafe_may.summary",
          link: "https://www.facebook.com/events/782798813976465/",
        },
        {
          id: 4,
          date: "2024-03-26",
          titleKey: "news.mini_japanese_class.title",
          summaryKey: "news.mini_japanese_class.summary",
          link: "https://www.facebook.com/share/p/uLfR4ZwdrSiJYmgv/",
        },
      ],
    };
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(this.$i18n.locale, options);
    },
  },
};
</script>

<style scoped>
.news-page {
  padding: 20px;
  font-family: "Arial", sans-serif;
  background-color: #f8f9fa;
}

.header-section {
  width: 100%;
  background: url("https://static.ottercdn.com/trek/media/df096fdf-e364-4633-8bac-55ffe2d8151f.jpg")
    no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  margin-bottom: 20px;
}

.header-section h1 {
  color: white;
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-item {
  display: flex;
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
  transition: background-color 0.3s;
}

.news-item:hover {
  background-color: #f0f0f0;
}

.news-date {
  flex: 0 0 150px;
  font-size: 1rem;
  color: #555;
}

.news-content {
  flex: 1;
  padding-left: 20px;
}

.news-content h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.news-content p {
  margin: 10px 0;
  font-size: 1rem;
  color: #666;
}

.read-more {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.read-more:hover {
  text-decoration: underline;
}
</style>
