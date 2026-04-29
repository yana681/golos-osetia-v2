<script setup>
import ThemesHero from '../components/themes/ThemesHero.vue'
import ThemesAccordion from '../components/themes/ThemesAccordion.vue'
</script>

<template>
  <div class="themes-page">
    <div class="container">
      <ThemesHero />
      <ThemesAccordion />
    </div>
  </div>
</template>

<style scoped>
.themes-page {
  background-color: #efe3d6; 
  min-height: 100vh;
}
.container {
  max-width: 1330px; 
  margin: 0 auto;
}
</style>