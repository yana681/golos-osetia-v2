<template>
  <div class="about-page">
    <div class="container">
      <section class="about-hero">
        <h1 class="page-title">О портале</h1>
        <p class="hero-subtitle">
          Единая платформа для взаимодействия жителей и городских служб Владикавказа.
        </p>
      </section>

      <div class="about-content">
        <div class="info-block">
          <h2 class="section-title">Наша миссия</h2>
          <p class="text-p">
            Портал создан для того, чтобы каждый житель мог напрямую участвовать в развитии города. 
            Мы верим, что совместными усилиями можно сделать наш город чище, уютнее и безопаснее.
          </p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <h3 class="feature-title">Оперативность</h3>
            <p class="feature-text">Ваши обращения поступают напрямую ответственным ведомствам без лишней бюрократии.</p>
          </div>
          <div class="feature-card">
            <h3 class="feature-title">Прозрачность</h3>
            <p class="feature-text">Вы можете отслеживать статус решения проблемы в режиме реального времени.</p>
          </div>
          <div class="feature-card">
            <h3 class="feature-title">Результат</h3>
            <p class="feature-text">Более 182 тысяч решенных проблем — это реальный вклад жителей в жизнь города.</p>
          </div>
        </div>

        <section class="about-stats">
          <div class="stat-item">
            <img src="/src/assets/icons/check.png" alt="check" class="stat-icon" />
            <div class="stat-text">
              <span class="stat-number">182 256</span>
              <span class="stat-label">проблем решено</span>
            </div>
          </div>
          
          <div class="stat-divider"></div>
          
          <div class="stat-item">
            <img src="/src/assets/icons/time.png" alt="time" class="stat-icon" />
            <div class="stat-text">
              <span class="stat-number">24 / 7</span>
              <span class="stat-label">прием заявок</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  background-color: #efe3d6;
  min-height: 100vh;
  padding-bottom: 100px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.about-hero {
  padding: 60px 0;
  text-align: center;
}

.page-title {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 48px;
  color: #000;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  color: rgba(52, 103, 53, 1);
  max-width: 600px;
  margin: 0 auto;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  margin-bottom: 20px;
  color: #000;
}

.text-p {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  line-height: 1.6;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature-card {
  background: #FFFFFF;
  border: 1px solid rgba(52, 103, 53, 0.3);
  border-radius: 10px;
  padding: 25px;
}

.feature-title {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 20px;
  color: rgba(120, 63, 28, 1);
  margin-bottom: 15px;
}

.feature-text {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  color: #555;
  line-height: 1.4;
}

/* Стили для блока статистики с иконками */
.about-stats {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  margin-top: 40px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-icon {
  width: 45px; 
  height: auto;
  object-fit: contain;
}

.stat-text {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 42px;
  line-height: 1;
  color: rgba(120, 63, 28, 1);
}

.stat-label {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  color: #000;
  margin-top: 5px;
}

.stat-divider {
  width: 1px;
  height: 70px;
  background-color: rgba(52, 103, 53, 0.2);
}
</style>