<!-- src/components/SiteFooter.vue -->
<template>
  <footer class="footer">
    <div class="footer-content">
      <p>
        copyright © 2024 Corrine's Language Cafe
        | <a href="#">{{ $t('footer.privacy_policy') }}</a>
        | <a href="#">{{ $t('footer.terms_of_use') }}</a>
        | <a href="#">{{ $t('footer.legal_notice') }}</a>
        | <a href="#">{{ $t('footer.site_map') }}</a>
      </p>
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
    <select @change="changeLanguage($event)">
      <option value="zh">中文</option>
      <option value="en">English</option>
    </select>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  methods: {
    changeLanguage(event) {
      const selectedLanguage = event.target.value;
      this.$i18n.locale = selectedLanguage;
      localStorage.setItem('language', selectedLanguage);
    }
  }
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
