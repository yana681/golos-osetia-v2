<template>
  <div class="results-wrapper">
    <div class="container">
      <header class="results-header">
        <h2 class="main-title">Результаты работы портала</h2>
        
        <div class="stats-container">
          <img src="/src/assets/icons/check.png" alt="check" class="check-icon" />
          <div class="stats-text">
            <span class="count">182 256</span>
            <span class="subtext">проблем решено</span>
          </div>
        </div>

        <div class="info-tags">
          <div class="info-label-wrapper">
            <span class="info-label">Самая популярная тема:</span>
            <span class="info-value">Дороги</span>
          </div>
          <div class="info-label-wrapper">
            <span class="info-label">Самый активный район:</span>
            <span class="info-value">Центральный</span>
          </div>
        </div>
      </header>

      <div class="results-grid">
       <div v-for="card in resultsData" :key="card.id" class="result-card">
          <div class="card-image-wrapper">
            <img :src="card.image" :alt="card.category" class="card-img" />
            <div class="card-overlay">
              <span class="view-details">Подробнее →</span>
            </div>
          </div>
          <div class="card-body">
            <p class="card-address">{{ card.address }}</p>
            <div class="card-footer">
              <span class="card-category">{{ card.category }}</span>
              <span class="card-status">{{ card.status }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-action">
        <button class="btn-all">Показать все</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const resultsData = ref([
  {
    id: 1,
    image: '/src/assets/garbage.png',
    address: 'Липовая аллея, улица Красного Маяка, дом 17, корпус 2',
    category: 'Парк',
    status: 'Решено'
  },
  {
    id: 2,
    image: '/src/assets/garbage.png',
    address: 'Проспект Мира, дом 45, перекресток с ул. Ленина',
    category: 'Дороги',
    status: 'В работе'
  },
  {
    id: 3,
    image: '/src/assets/garbage.png',
    address: 'Бульвар Гагарина, дом 8, дворовая территория',
    category: 'Мой двор',
    status: 'Решено'
  },
  {
    id: 4,
    image: '/src/assets/garbage.png',
    address: 'Остановка "Дворец спорта", маршрут №5',
    category: 'Транспорт',
    status: 'Решено'
  },
  {
    id: 5,
    image: '/src/assets/garbage.png',
    address: 'Улица Пушкина, дом 23, контейнерная площадка',
    category: 'Мусор',
    status: 'В работе'
  },
  {
    id: 6,
    image: '/src/assets/garbage.png',
    address: 'Парк им. Коста Хетагурова, центральная аллея',
    category: 'Экология',
    status: 'Решено'
  },
  {
    id: 7,
    image: '/src/assets/garbage.png',
    address: 'Улица Московская, дом 56, пешеходный переход',
    category: 'Безопасность',
    status: 'В работе'
  },
  {
    id: 8,
    image: '/src/assets/garbage.png',
    address: 'Переулок Спортивный, дом 3, детская площадка',
    category: 'Мой двор',
    status: 'Решено'
  },
  {
    id: 9,
    image: '/src/assets/garbage.png',
    address: 'Проспект Коста, дом 101, прилегающая территория',
    category: 'Городская территория',
    status: 'Решено'
  }
])
</script>

<style scoped>
.results-wrapper {
  background-color: #efe3d6;
  padding-bottom: 100px;
  min-height: 100vh;
}

.container {
  max-width: 1330px;
  margin: 0 auto;
  padding: 0 20px;
}

.results-header {
  display: flex;
  align-items: center;
  padding: 40px 0;
  gap: 60px;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-title {
  width: 460px;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2;
  letter-spacing: -0.32px;
  color: #000;
  position: relative;
  padding-left: 20px;
}

.main-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #386633;
  border-radius: 2px;
}

.stats-container {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(56, 102, 51, 0.1);
  padding: 10px 20px;
  border-radius: 50px;
  transition: transform 0.3s ease, background 0.3s ease;
}

.stats-container:hover {
  transform: translateY(-3px);
  background: rgba(56, 102, 51, 0.15);
}

.check-icon {
  width: 34px;
  height: 35px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.stats-text {
  display: flex;
  flex-direction: column;
}

.count {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 34px;
  color: rgba(120, 63, 28, 1);
  line-height: 1;
}

.subtext {
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  color: #000;
}

.info-tags {
  display: flex;
  gap: 40px;
  margin-left: auto;
}

.info-label-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.info-label-wrapper:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.7);
}

.info-label {
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  color: #666;
}

.info-value {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 700;
  color: #386633;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 20px;
}

.result-card {
  background: #FFFFFF;
  border: 1px solid rgba(52, 103, 53, 1);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border-color: rgba(130, 89, 64, 1);
}

.card-image-wrapper {
  position: relative;
  overflow: hidden;
  height: 285px;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.result-card:hover .card-img {
  transform: scale(1.08);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(56, 102, 51, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.result-card:hover .card-overlay {
  opacity: 1;
}

.view-details {
  color: white;
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 600;
  padding: 10px 20px;
  border: 2px solid white;
  border-radius: 30px;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.result-card:hover .view-details {
  transform: translateY(0);
}

.card-body {
  padding: 15px 19px;
}

.card-address {
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.4;
  color: rgba(52, 103, 53, 1);
  margin-bottom: 12px;
  transition: color 0.3s ease;
}

.result-card:hover .card-address {
  color: rgba(130, 89, 64, 1);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-category {
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  background: rgba(52, 103, 53, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
  color: rgba(52, 103, 53, 1);
}

.card-status {
  font-family: 'Playfair Display', serif;
  font-size: 12px;
  color: #4caf50;
  font-weight: 600;
}

.card-status:contains("В работе") {
  color: #ff9800;
}

.footer-action {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.btn-all {
  width: 382px;
  height: 51px;
  background: rgba(130, 89, 64, 1);
  color: #FFF;
  border: none;
  border-radius: 25px;
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-all::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-all:hover {
  background: rgba(100, 50, 20, 1);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn-all:hover::before {
  width: 300px;
  height: 300px;
}

.btn-all:active {
  transform: translateY(0);
}

/* Адаптивность */
@media (max-width: 1200px) {
  .results-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .results-header {
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .info-tags {
    margin-left: 0;
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .main-title {
    width: 100%;
    font-size: 28px;
  }
  
  .stats-container {
    width: 100%;
    justify-content: center;
  }
  
  .info-tags {
    flex-direction: column;
    gap: 10px;
  }
  
  .btn-all {
    width: 100%;
    max-width: 382px;
  }
}
</style>