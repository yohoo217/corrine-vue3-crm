<template>
  <div class="news-page">
    <!-- Header Section with Background Image and Title -->
    <section class="header-section">
      <h1>最新消息</h1>
    </section>

    <!-- News List Section -->
    <section class="news-list">
      <div class="news-item" v-for="news in newsList" :key="news.id">
        <div class="news-date">
          <p>{{ formatDate(news.date) }}</p>
        </div>
        <div class="news-content">
          <h3>{{ news.title }}</h3>
          <p>{{ news.summary }}</p>
          <a :href="news.link" target="_blank" rel="noopener noreferrer" class="read-more">閱讀更多</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NewsPage',
  data() {
    return {
      newsList: [
        {
          id: 1,
          date: '2024-07-24',
          title: '秋季日語課程即將開放報名',
          summary: '我們很高興地宣布，2024年秋季日語課程現招生開跑囉以「主題情境」來編排課程，讓大家嘗試跳脫以語彙和文法為主的學習模式，透過多樣化的情境聯想，練習相關的對話內容和所需的詞彙與文法。！本季課程將聚焦於日本文化與商務日語，幫助學員在工作和生活中更好地運用日語。',
          link: 'https://www.instagram.com/p/C9zTBFfvmYW/?img_index=1',
        },
        {
          id: 2,
          date: '2024-07-01',
          title: '[ Bilingual Cafe 雙語文藝講咖啡 ] @ Hualien City - 23',
          summary: '歡迎參加我們每月的實體雙語咖啡聚會！這次時間訂在 7/6 (Sat) 19:30~，目前我們有說英語、中文、日語的夥伴們，歡迎大家介紹大家，讓我們在花蓮多一個超棒的活動喔！',
          link: 'https://www.facebook.com/events/1180796836497258/',
        },
        {
          id: 3,
          date: '2024-05-28',
          title: '[ Bilingual Cafe 雙語文藝講咖啡 ] @ Hualien City - 21',
          summary: '歡迎參加我們每月的實體雙語咖啡聚會！這次時間訂在 6/1 (Sat) 19:30~，目前我們有說英語、中文、日語的夥伴們，歡迎大家介紹大家，讓我們在花蓮多一個超棒的活動喔！',
          link: 'https://www.facebook.com/events/782798813976465/',
        },    
        {
          id: 4,
          date: '2024-03-26',
          title: '迷你日語會話班開放報名',
          summary: '以「不先教50音あいうえお」為第一步，而是以「主題式會話」的方式，讓大家不再因為怎麼樣都背不起來的平假、片假名，扼殺了享受學習和開口說日語的動力。',
          link: 'https://www.facebook.com/share/p/uLfR4ZwdrSiJYmgv/',
        },           
      ],
    };
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('zh-TW', options);
    },
  },
};
</script>

<style scoped>
.news-page {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
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