<template>
  <div>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-6381709506959276"
         data-ad-slot="your-ad-slot"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Load AdSense script if not already loaded
  if (!window.adsbygoogle) {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6381709506959276';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }

  // Push the ad after the script is loaded
  (window.adsbygoogle = window.adsbygoogle || []).push({});
});
</script>
