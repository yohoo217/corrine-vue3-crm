<!-- src/components/SiteFooter.vue -->
<template>
  <footer class="footer">
    <div class="footer-content">
      <p>copyright © 2024 Corrine's Language Cafe 2024 版權所有 | 隱私權政策 | 使用條款 | 法律聲明 | 網站地圖</p>
      <div class="footer-icons">
        <a href="https://www.facebook.com/profile.php?id=100063904926422&sk=mentions" target="_blank" aria-label="Facebook">
          <img src="https://static.aottercdn.com/trek/media/aba4c2d5-7e42-49fe-8ae2-8bd7778cbf1a.png" alt="Facebook" />
        </a>
        <a href="https://www.instagram.com/corrinesensei539?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" aria-label="Instagram">
          <img src="https://static.aottercdn.com/trek/media/2fe1de3c-1ca7-403d-b2b2-1b14347213fb.png" alt="Instagram" />
        </a>
        <a href="https://lin.ee/9Bby5Hj" target="_blank" aria-label="Line">
          <img src="https://static.aottercdn.com/trek/media/fb910c51-a411-4a86-8de4-eacd99dee9c6.png" alt="Line" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter', // 修改組件名稱為多字詞
};
</script>

<style scoped>
.footer {
  background-color: #f8d7da;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed #ddd;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.footer p {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
}

.footer-icons {
  display: flex;
  gap: 10px;
}

.footer-icons a img {
  width: 24px;
  height: 24px;
}
</style>
