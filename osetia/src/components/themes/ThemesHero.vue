<template>
  <section class="problems-section">
    <div class="container">
      <div class="problems-header">
        <h1 class="page-title">Проблемные темы</h1>
        <p class="page-subtitle">
          Расскажи о насущных проблемах и отслеживай результаты
        </p>
      </div>

      <div class="map-container">
        <div class="map-wrapper">
          <img 
            src="/src/assets/fon.jpg" 
            alt="Карта города" 
            class="city-map" 
            data-smart-camera-target="false" 
          />
          
          <div 
            v-for="topic in problemTopics" 
            :key="topic.id"
            class="map-label" 
            :style="{ top: topic.position.top, left: topic.position.left }"
            @click="goToThemesAccordion(topic.id)"
          >
            <div class="label-text">{{ topic.title }}</div>
            <div class="label-line"></div>
            <div class="dot"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const problemTopics = ref([
  {
    id: 4, // Соответствует 'Государственные учреждения'
    title: 'Государственные учреждения',
    position: { top: '48%', left: '28.5%' }
  },
  {
    id: 3, // Соответствует 'Моя дорога'
    title: 'Дороги',
    position: { top: '53.5%', left: '50.7%' }
  },
  {
    id: 5, // Соответствует 'Общественный транспорт'
    title: 'Общественный транспорт',
    position: { top: '78.5%', left: '43.5%' }
  },
  {
    id: 2, // Соответствует 'Мой дом'
    title: 'Мой Дом',
    position: { top: '39.5%', left: '73.2%' }
  },
  {
    id: 6, // Соответствует 'Городская территория'
    title: 'Городская территория',
    position: { top: '61.5%', left: '83.7%' }
  }
])

const goToThemesAccordion = (topicId) => {
  router.push({
    path: '/themes-accordion',
    query: { topic: topicId }
  })
}
</script>

<style scoped>
.problems-section {
  background-color: #F1DFCB;
  padding: 55px 0 60px 0;
}

.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 40px; 
}

.problems-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 25px;
  width: 100%;
}

.page-title {
  font-family: 'Playfair Display', serif;
  font-size: 54px;
  font-weight: 500;
  margin: 0;
  color: #000;
}

.page-subtitle {
  font-family: sans-serif;
  font-size: 14px;
  color: #2b2b2b;
  margin: 0;
  padding-bottom: 10px;
  max-width: 500px;
  text-align: right;
}
.map-container {
  width: 100%;
  box-sizing: border-box;
  background-color: #efe3d6;
}

.map-wrapper {
  position: relative;
  width: 100%;
}

.city-map {
  width: 100%;
  height: auto;
  display: block;
}
.map-label {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -100%);
  cursor: pointer;
  z-index: 10;
  transition: transform 0.2s ease;
}

.map-label:hover {
  transform: translate(-50%, -102%) scale(1.03);
}

.label-text {
  background-color: #7a614c;
  color: #fff;
  padding: 6px 16px;
  border-radius: 8px;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.label-line {
  width: 2px;
  height: 35px;
  background-color: #000;
}

.dot {
  width: 18px;
  height: 10px;
  background-color: #ff0040;
  border-radius: 4px;
  border: 1px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}

@media (max-width: 992px) {
  .page-title {
    font-size: 40px;
  }
  .label-text {
    font-size: 11px;
    padding: 4px 10px;
  }
  .label-line {
    height: 20px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }
  .problems-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .page-subtitle {
    text-align: left;
    padding-bottom: 0;
  }
  .label-text {
    font-size: 9px;
    padding: 2px 6px;
    border-radius: 4px;
  }
  .label-line {
    height: 12px;
  }
  .dot {
    width: 12px;
    height: 7px;
  }
}
</style>