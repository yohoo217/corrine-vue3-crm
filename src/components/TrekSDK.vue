<template>
  <div>
    <div id="supr-ad-container"></div>
    <div v-if="showAdsense">
      <GoogleAdsense />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import GoogleAdsense from './GoogleAdsense.vue';

const showAdsense = ref(false);

onMounted(() => {
  (function (w, d, s, src, n) {
    var js,
      ajs = d.getElementsByTagName(s)[0];
    if (d.getElementById(n)) return;
    js = d.createElement(s);
    js.id = n;
    w[n] =
      w[n] ||
      function () {
        (w[n].q = w[n].q || []).push(arguments);
      };
    w[n].l = 1 * new Date();
    js.async = 1;
    js.src = src;
    ajs.parentNode.insertBefore(js, ajs);
  })(
    window,
    document,
    "script",
    "https://static.aottercdn.com/trek/sdk/3.5.4/sdk.js",
    "AotterTrek"
  );

  // Initialize AotterTrek
  window.AotterTrek("init", "3tAOxQn5xG//E4tv3J6B");
  window.AotterTrek("send");

  // Initialize SuprAd
  window.AotterTrek("suprAd", {
    selector: "#supr-ad-container",
    place: "5a41c4d0-b268-43b2-9536-d774f46c33bf",
    onAdLoad: () => {
      showAdsense.value = false;
    },
    onAdFail: () => {
      showAdsense.value = true;
    },
  });

  window.AotterTrek("tkadn", "PageView");
});
</script>
