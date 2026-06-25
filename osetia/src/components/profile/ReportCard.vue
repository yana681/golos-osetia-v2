<template>
  <div class="report-card">
    <div class="image-container">
      <img :src="imgSrc" alt="Проблема" @error="handleImageError" />
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
        <button class="details-btn" @click="$emit('view-details')">
          Подробнее ➔
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: 'Яма на тротуаре по ул. Ленина, 23' },
  description: { type: String, default: 'Глубокая яма мешает проходу, особенно в дождливую погоду.' },
  statusText: { type: String, default: 'На проверке' },
  statusClass: { type: String, default: 'checking' },
  location: { type: String, default: 'ул. Ленина, 23' },
  date: { type: String, default: '12.05.2025' },
  likes: { type: Number, default: 12 },
  imgSrc: { type: String, default: '/src/assets/placeholder.jpg' }
})

// ✅ Добавляем emit
defineEmits(['view-details'])

const handleImageError = (e) => {
  e.target.src = '/src/assets/placeholder.jpg'
}
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
  transition: all 0.3s ease;
}

.report-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.06);
}

.image-container {
  position: relative;
  width: 100%;
  height: 200px;
  background: #f5f5f5;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-container img[src*="placeholder"] {
  object-fit: contain;
  padding: 20px;
}

.status-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-family: "Montserrat";
  font-weight: 600;
  color: white;
}

.status-badge.checking { background: #e09943; }
.status-badge.in-progress { background: #2f80ed; }
.status-badge.resolved { background: #27ae60; }
.status-badge.rejected { background: #e74c3c; }

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
  font-family: "Montserrat";
  line-height: 1.4;
}

.description {
  margin: 0 0 15px 0;
  font-size: 13px;
  font-family: "Montserrat";
  color: #7a8a77;
  line-height: 1.5;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta-row {
  display: flex;
  gap: 15px;
  font-size: 12px;
  font-family: 'Montserrat';
  color: #90a08d;
  margin-bottom: 15px;
  border-bottom: 1px solid #f0f4ef;
  padding-bottom: 12px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.likes {
  font-size: 14px;
  color: #556352;
  font-weight: 500;
}

.details-btn {
  background: none;
  border: none;
  color: #4a6b41;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.details-btn:hover {
  background: rgba(74, 107, 65, 0.08);
  text-decoration: underline;
}
</style>