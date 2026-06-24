<script setup>
import { ref, watch } from 'vue'
import ThemesHero from '../components/themes/ThemesHero.vue'
import ThemesAccordion from '../components/themes/ThemesAccordion.vue'

// ✅ Состояние для выбранной темы
const selectedTopicId = ref(null)

// ✅ Обработчик клика по метке на карте
const handleTopicSelect = (topicId) => {
  console.log('🔵 Получен ID из карты:', topicId)
  selectedTopicId.value = topicId
}

// ✅ Следим за изменением и передаём в аккордеон
watch(selectedTopicId, (newId) => {
  console.log('🟣 Передаём в аккордеон ID:', newId)
})
</script>

<template>
  <div class="themes-page">
    <div class="container">
      <ThemesHero @select-topic="handleTopicSelect" />
      
      <!-- ✅ Передаём выбранный ID в аккордеон -->
      <ThemesAccordion :topicId="selectedTopicId" />
    </div>
  </div>
</template>

<style scoped>
.themes-page {
  background-color: #F1DFCB; 
  min-height: 100vh;
}

.container {
  max-width: 1330px; 
  margin: 0 auto;
}
</style>