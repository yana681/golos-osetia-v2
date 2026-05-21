<template>
  <section class="steps">
    <div class="container">
      <h2 class="steps-title">Как мы решаем проблемы</h2>
      
      <div class="steps-grid">
        <div v-for="(step, index) in steps" :key="index" class="step-item">
          <div 
            class="step-number-box" 
            :style="{ backgroundColor: step.bgColor }"
          >
            <span class="step-number">{{ index + 1 }}</span>
          </div>
          
          <div class="step-content">
            <h3 class="step-header">{{ index + 1 }}. {{ step.title }}</h3>
            <p class="step-text">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    title: 'Вы сообщаете',
    description: 'Оставляете заявку с описанием и фото проблемы',
    bgColor: '#522c14'
  },
  {
    title: 'Мы проверяем',
    description: 'Анализируем и передаем информацию ответственным органам',
    bgColor: '#783f1c'
  },
  {
    title: 'Придаем огласке',
    description: 'Делаем проблему публичной и следим за ее решением',
    bgColor: '#825940'
  },
  {
    title: 'Проблема решена',
    description: 'Контролируем устранение и сообщаем вам о результате',
    bgColor: '#b68b69'
  }
];
</script>

<style scoped>
.steps {
  padding: 80px 0;background-color: #F1DFCB;
  border-top: 2px solid rgba(52, 103, 50, 1); 
}

.container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 15px;
}

.steps-title {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 60px;
  color: #000;
}

.steps-grid {
  display: flex;
  justify-content: space-between;
  gap: 30px; 
}

.step-item {
  display: flex;
  flex-direction: row; 
  align-items: flex-start;
  gap: 20px;
  flex: 1;
}

.step-number-box {
  width: 120px;
  height: 120px;
  border-radius: 20px;
  background-color: #522c14;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  flex-shrink: 0;
}

.step-number {
  font-family: 'Playfair Display', serif;
  font-size: 64px;
  font-weight: 700;
  color: #fff;
  line-height: 0; 
  display: block;
  padding-top: 5px; 
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 10px;
}

.step-header {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: #000;
}

.step-text {
  font-family: 'Playfair Display', serif;
  font-size: 16px; 
  line-height: 1.2;
  color: #000;
  margin: 0;
  opacity: 0.9;
}
</style>