<template>
  <div class="results-wrapper">
    <div class="container">
      <header class="results-header">
        <h2 class="main-title">Результаты работы портала</h2>
        
        <div class="stats-container">
          <div class="icon-pulse-wrapper">
            <img src="/src/assets/icons/check.png" alt="check" class="check-icon" />
          </div>
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
              <span class="view-details">Подробнее</span>
            </div>
          </div>
          <div class="card-body">
            <p class="card-address">{{ card.address }}</p>
            <div class="card-footer">
              <span class="card-category">{{ card.category }}</span>
              <span 
                class="card-status" 
                :class="{ 'status-in-progress': card.status === 'В работе' }"
              >
                {{ card.status }}
              </span>
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
  padding: 50px 0 30px 0;
  gap: 40px;
}

.main-title {
  width: 420px;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 1.2;
  letter-spacing: -0.5px;
  color: #111111;
  position: relative;
  padding-left: 24px;
}

.main-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4px;
  height: calc(100% - 8px);
  width: 5px;
  background-color: #386633;
  border-radius: 4px;
}
.stats-container {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 12px 24px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 8px 24px rgba(56, 102, 51, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stats-container:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.65);
  box-shadow: 0 12px 30px rgba(56, 102, 51, 0.08);
}

.icon-pulse-wrapper {
  background: rgba(56, 102, 51, 0.1);
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-icon {
  width: 24px;
  height: 24px;
}

.stats-text {
  display: flex;
  flex-direction: column;
}

.count {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 32px;
  color: #783f1c;
  line-height: 1.1;
}

.subtext {
  font-family: sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #444;
}

.info-tags {
  display: flex;
  gap: 20px;
  margin-left: auto;
}

.info-label-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.info-label-wrapper:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}

.info-label {
  font-family: sans-serif;
  font-size: 11px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 700;
  color: #386633;
}

/* Сетка карточек */
.results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 25px;
}

.result-card {
  background: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.result-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(52, 103, 53, 0.12);
}

.card-image-wrapper {
  position: relative;
  overflow: hidden;
  height: 240px;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.result-card:hover .card-img {
  transform: scale(1.04);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(52, 103, 53, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
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
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 24px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50px;
  backdrop-filter: blur(5px);
  transform: translateY(15px);
  transition: transform 0.3s ease;
}

.result-card:hover .view-details {
  transform: translateY(0);
}

.card-body {
  padding: 24px;
}

.card-address {
  font-family: sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 1.5;
  color: #2c3e50;
  margin-bottom: 20px;
  height: 44px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-category {
  font-family: sans-serif;
  font-size: 12px;
  font-weight: 600;
  background: rgba(52, 103, 53, 0.08);
  padding: 6px 14px;
  border-radius: 10px;
  color: #346735;
}
.card-status {
  font-family: sans-serif;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 50px;
  background-color: rgba(46, 204, 113, 0.15);
  color: #27ae60;
  white-space: nowrap;
}

.card-status.status-in-progress {
  background-color: rgba(230, 126, 34, 0.15);
  color: #d35400;
}

.footer-action {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}
.btn-all {
  width: 280px;
  height: 54px;
  background: #825940;
  color: #FFF;
  border: none;
  border-radius: 16px;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(130, 89, 64, 0.15);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-all:hover {
  background: #70472e;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(130, 89, 64, 0.3);
}

.btn-all:active {
  transform: translateY(0);
}

/* Адаптивность */
@media (max-width: 1200px) {
  .results-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  .results-header {
    flex-wrap: wrap;
    gap: 24px;
  }
  
  .info-tags {
    margin-left: 0;
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .main-title {
    width: 100%;
    font-size: 30px;
  }
  
  .stats-container {
    width: 100%;
    box-sizing: border-box;
  }
  
  .info-tags {
    flex-direction: column;
    gap: 12px;
  }
  
  .btn-all {
    width: 100%;
  }
}
</style>