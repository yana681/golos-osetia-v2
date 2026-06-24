<template>
  <div class="report-card">
    <div class="image-container">
      <img :src="imgSrc" alt="Проблема">
      <span class="status-badge" :class="statusClass">{{ statusText }}</span>
    </div>

    <div class="content">
      <h3>{{ title }}</h3>
      <p class="description">{{ description }}</p>

      <div class="meta-row">
        <span class="location">📍 {{ location }}</span>
        <span class="date">📅 {{ date }}</span>
      </div>

      <div class="card-footer">
        <div class="likes">❤ {{ likes }}</div>
        <button class="details-btn">Подробнее ➔</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Яма на тротуаре по ул. Ленина, 23' },
  description: { type: String, default: 'Глубокая яма мешает проходу, особенно в дождливую погоду.' },
  statusText: { type: String, default: 'На проверке' },
  statusClass: { type: String, default: 'checking' },
  location: { type: String, default: 'ул. Ленина, 23' },
  date: { type: String, default: '12.05.2025' },
  likes: { type: Number, default: 12 },
  imgSrc: { type: String, default: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=400&q=80' }
})
</script>

<style scoped>
.report-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  text-align: left;
}

.image-container {
  position: relative;
  width: 100%;
  height: 200px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 2px 15px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  font-family: "montserrat";
  color: white;
}

.status-badge.checking { background: #e09943; } /* На проверке - оранжевый */
.status-badge.in-progress { background: #2f80ed; } /* В работе - синий */
.status-badge.resolved { background: #27ae60; } /* Решено - зеленый */
.status-badge.rejected { background: #e93737;} /*отклонено - красный*/

.content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.content h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #2c3e29;
  font-weight: 600;
  font-family: "montserrat";
  line-height: 1.4;
}

.description {
  margin: 0 0 1px 0;
  font-size: 13px;
  font-family: "montserrat";
  color: #7a8a77;
  line-height: 1.5;
  flex-grow: 1;
}

.meta-row {
  display: flex;
  gap: 15px;
  font-size: 12px;
  font-family: "Montserrat";
  color: #90a08d;
  margin-bottom: 5px;
  border-bottom: 1px solid #f0f4ef;
  padding-bottom: 15px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.likes {
  font-size: 14px;
  color: #556352;
  font-weight: 500;
  font-family: "montserrat";
}

.details-btn {
  background: none;
  border: none;
  color: #4a6b41;
  font-weight: 600;
  font-size: 13px;
  font-family: "Montserrat";
  cursor: pointer;
  padding: 0;
}

.details-btn:hover {
  text-decoration: underline;
}
</style>