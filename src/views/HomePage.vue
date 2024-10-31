<template>
  <div class="home-page">
    <!-- 教室介绍 -->
    <section class="introduction-1">
      <h1>{{ $t('home.welcome_message') }}</h1>
      <p>{{ $t('home.course_description') }}</p>
    </section>

    <section class="introduction-2">
      <div class="left-content">
        <img
          src="https://static.ottercdn.com/trek/media/e8c56e9d-c85c-4e1a-bab4-76325433fd36.png"
          alt="Tourism Japanese"
          class="content-image"
        />
      </div>
      <div class="right-content">
        <h1>旅遊日語班</h1>
        <p>
          讀萬卷書不如行萬里路，讓我們幫助你身體力行吧!<br />
          文化，即是遇見差異的開始。<br />
          語言，將是開啟對話的鑰匙。<br />
          旅行，則是體驗一切的道路。<br />
          精心設計的主題式學習，讓你可以預習旅行中常見的場景。<br />
          準備言語知識，並透過互動實際練習如何思考及應對。
        </p>
      </div>
    </section>

    <section class="introduction-3">
      <div class="left-content">
        <h1>
          主題會話實用班<br />
          基礎文法打底班
        </h1>
        <p>
          - 主題會話實用班：由日籍老師帶領，透過大量的聽說練習和生活化的情境理解享受對話和互動的樂趣！<br />
          - 基礎文法打底版：從基礎開始認識日語的言語知識和法結構，兼具聽說讀寫的紮實訓練讓你能夠開口，也能感受閱讀和書寫的奧妙。<br />
          - 多語咖啡：不定期舉辦線上和實體交流活動，透過與外籍老師、母語者和語言學習者間的互動體驗多樣化的輸出和輸入練習。<br />
          - 無論您是初學者還是有一定基礎，我們都能幫助您在輕鬆有趣的環境中提升日語能力讓您享受學習過程，體驗用日語交流的快樂。
        </p>
      </div>
      <div class="right-content">
        <img
          src="https://static.ottercdn.com/trek/media/e8c56e9d-c85c-4e1a-bab4-76325433fd36.png"
          alt="Tourism Japanese"
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
</style>
