<template>
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="page-title">Проблемные темы</h1>
      <p class="page-subtitle">
        Расскажи о насущных проблемах и отслеживай результаты
      </p>
      <button class="report-btn">Сообщить о проблеме</button>
    </div>

    <div class="map-container">
      <div class="map-wrapper">
        <img src="/src/assets/Union.png" alt="Карта города" class="city-map" />
        <div 
          v-for="topic in problemTopics" 
          :key="topic.id"
          class="map-label" 
          :class="topic.className"
          :style="{ top: topic.position.top, left: topic.position.left }"
          @click="goToThemesAccordion(topic.id)"
        >
          <span class="label-text">{{ topic.title }}</span>
          <span class="dot"></span>
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
    id: 'territory',
    title: 'Городская территория',
    className: 'label-territory',
    position: { top: '28%', left: '26%' }
  },
  {
    id: 'yard',
    title: 'Мой двор',
    className: 'label-yard',
    position: { top: '30%', left: '88%' }
  },
  {
    id: 'institutions',
    title: 'Государственные учреждения',
    className: 'label-institutions',
    position: { top: '43%', left: '15%' }
  },
  {
    id: 'house',
    title: 'Мой дом',
    className: 'label-house',
    position: { top: '43%', left: '65%' }
  },
  {
    id: 'transport',
    title: 'Общественный транспорт',
    className: 'label-transport',
    position: { top: '68%', left: '23%' }
  },
  {
    id: 'roads',
    title: 'Дороги',
    className: 'label-roads',
    position: { top: '66%', left: '77%' }
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
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 40px 0 60px 0;
  background-color: #efe3d6;
}

.hero-content {
  flex: 0 0 518px;
  padding-left: 80px;
}

.page-title {
  font-family: 'Playfair Display', serif;
  font-size: 80px;
  line-height: 1.1;
  font-weight: 700;
  margin: 0 0 20px 0;
  color: #000;
}

.page-subtitle {
  font-family: 'Playfair Display', serif;
  font-size: 21px;
  line-height: 1.3;
  margin-bottom: 60px;
  color: #000;
}

.report-btn {
  width: 449px;
  height: 63px;
  background-color: rgba(120, 63, 28, 1);
  color: #fff;
  border: none;
  border-radius: 40px;
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  cursor: pointer;
  transition: background 0.3s;
}

.report-btn:hover {
  background-color: rgba(100, 50, 20, 1);
}

.map-container {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 80px;
}

.map-wrapper {
  position: relative;
  width: 100%;
  max-width: 800px;
}

.city-map {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 20px;
}

.map-label {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  transform: translate(-50%, -100%);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.map-label:hover {
  transform: translate(-50%, -100%) scale(1.1);
}

.map-label:hover .label-text {
  background-color: #386633;
  color: white;
}

.map-label:hover .dot {
  background-color: #ff6600;
  transform: scale(1.3);
}

.dot {
  width: 12px;
  height: 12px;
  background-color: #ff0000;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.label-text {
  background-color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  white-space: nowrap;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #000;
  transition: all 0.3s ease;
  pointer-events: none;
}

@media (max-width: 1200px) {
  .hero-section {
    flex-direction: column;
  }
  
  .hero-content {
    padding-left: 20px;
  }
  
  .map-container {
    padding-right: 20px;
  }
  
  .page-title {
    font-size: 60px;
  }
  
  .report-btn {
    width: 100%;
    max-width: 449px;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 40px;
  }
  
  .label-text {
    display: none;
  }
}
</style>