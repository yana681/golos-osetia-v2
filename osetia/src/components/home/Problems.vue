<template>
  <section class="problems">
    <div class="container">
      <div class="problems-header">
        <h2 class="section-title">Актуальные проблемы</h2>
        <a href="#" class="all-themes">все темы</a>
      </div>

      <div class="problems-grid">
        <div v-for="(problem, index) in problems" :key="index" class="problem-card">
          <div class="card-content">
            <div class="card-title-wrapper">
              <img :src="problem.icon" alt="" class="card-icon" />
              <h3 class="card-title">{{ problem.title }}</h3>
            </div>
            <p class="card-text">{{ problem.description }}</p>
          </div>
          
          <div class="card-footer">
            <div class="problem-count">
              {{ problem.count }} проблем
            </div>
            <button class="arrow-btn">
              <img src="/src/assets/icons/right-arrow.png" alt="Подробнее" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const problems = [
  {
    title: 'Мой двор',
    description: 'Неубранная дворовая территория',
    count: 100,
    icon: '/src/assets/icons/my-yard.png'
  },
  {
    title: 'Благоустройство',
    description: 'Мусор, несанкционированные свалки, плохое состояние парков и скверов',
    count: 100,
    icon: '/src/assets/icons/flower.png'
  },
  {
    title: 'Социальная сфера',
    description: 'Школы, детские сады, медицина',
    count: 100,
    icon: '/src/assets/icons/flower.png'
  },
  {
    title: 'Моя дорога',
    description: 'Повреждение дорожного покрытия на проезжей части/тротуаре (ямы, выбоины, провалы)',
    count: 100,
    icon: '/src/assets/icons/flower.png'
  }
];
</script>

<style scoped>
.problems {
  padding: 60px 0;
  background-color: #efe3d6; 
  border-top: 2px solid rgba(97, 173, 99, 1);
}

.container {
  max-width: 1320px; 
  margin: 0 auto;
  padding: 0 15px;
}

.problems-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  font-weight: 700;
  color: #000;
  margin: 0;
}

.all-themes {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  color: rgba(52, 103, 53, 1);
  text-decoration: underline;
}

.problems-grid {
  display: flex;
  gap: 20px;
}

.problem-card {
  /* Заменяем flex: 1 на фиксированные размеры из макета */
  flex: 0 0 315px;
  height: 365px;
  background-color: rgba(52, 103, 50, 1);
  border-radius: 20px;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  box-sizing: border-box; /* Чтобы padding не увеличивал размер карточки */
}
.card-title-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.card-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.card-text {
  font-family: 'Playfair Display', serif;
  font-size: 20px; /* Size 20px */
  line-height: 30px; /* Line height 30px */
  font-weight: 500;
  opacity: 0.9;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.problem-count {
  border: 1px solid #fff;
  padding: 8px 20px;
  border-radius: 50px;
  font-family: 'Playfair Display', serif;
  font-size: 16px;
}

.arrow-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.arrow-btn img {
  width: 30px;
  transition: transform 0.3s;
}

.arrow-btn:hover img {
  transform: translateX(5px);
}
</style>