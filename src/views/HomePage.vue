<template>
  <div class="home-page">
    <!-- 教室介紹 -->
    <section class="introduction-1">
      <h1>{{ $t('home.welcome_message') }}</h1>
      <p>{{ $t('home.course_description') }}</p>
    </section>

    <section class="introduction-2">
      <div class="left-content">
        <img
          src="https://static.ottercdn.com/trek/media/e8c56e9d-c85c-4e1a-bab4-76325433fd36.png"
          :alt="$t('home.course_name')"
          class="content-image"
        />
      </div>
      <div class="right-content">
        <h1>{{ $t('home.course_name') }}</h1>
        <p>{{ $t('home.course_description') }}</p>
      </div>
    </section>

    <section class="introduction-3">
      <div class="left-content">
        <h1>{{ $t('home.theme_conversation_class') }}</h1>
        <p class="description">{{ $t('home.theme_class_description') }}</p>
      </div>
      <div class="right-content">
        <img
          src="https://static.ottercdn.com/trek/media/e8c56e9d-c85c-4e1a-bab4-76325433fd36.png"
          :alt="$t('home.course_name')"
          class="content-image"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
});
</script>

<style scoped>
.home-page {
  padding: 0;
  background-color: #f8f9fa;
  font-family: 'Arial', sans-serif;
}

.introduction-1 {
  text-align: center;
  background-image: url("https://static.ottercdn.com/trek/media/a6844ae0-502a-4abe-81d8-0535ad91dd7f.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 5rem 2rem;
  color: #fff;
  margin: 0;
}

.introduction-1 h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.introduction-1 p {
  font-size: 1.2rem;
}

.introduction-2,
.introduction-3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background-size: cover;
  color: #333;
  margin: 0;
}

.introduction-2 {
  background: url("https://png.pngtree.com/background/20210709/original/pngtree-japan-zephyr-japanese-lucky-cat-picture-image_928602.jpg")
    no-repeat center center;
  background-size: cover;
}

.introduction-2 .left-content {
  flex: 1;
  max-width: 40%;
  padding: 1rem;
}

.introduction-2 .right-content {
  flex: 1;
  max-width: 50%;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
}

.introduction-2 h1 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: #d32f2f;
}

.introduction-2 p {
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.introduction-3 {
  background: url("https://png.pngtree.com/thumb_back/fh260/back_our/20190617/ourmid/pngtree-pink-romantic-cherry-blossom-festival-travel-background-image_129806.jpg")
    no-repeat center center;
  background-size: cover;
}

.introduction-3 .left-content {
  flex: 1;
  max-width: 60%;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
}

.introduction-3 .right-content {
  flex: 1;
  max-width: 40%;
  padding: 1rem;
}

.introduction-3 h1 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: #388e3c;
}

.introduction-3 p {
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.content-image {
  max-width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.description {
  white-space: pre-line;
}
</style>
