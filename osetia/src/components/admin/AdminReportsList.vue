<template>
  <div>
    <div class="admin-grid" v-if="reports.length > 0">
      <div v-for="(report, index) in reports" :key="index" class="admin-card">
        <div class="card-image-box">
          <img :src="report.imgSrc" alt="Проблема">
          <span class="status-badge" :class="report.statusClass">{{ report.statusText }}</span>
        </div>
        
        <div class="card-content">
          <div class="card-meta">📍 {{ report.location }} | 📅 {{ report.date }}</div>
          <h3>{{ report.title }}</h3>
          <p class="description">{{ report.description }}</p>
          
          <div class="admin-actions">
            <label class="action-label">Изменить статус:</label>
            <select 
              :value="report.statusClass" 
              @change="$emit('update-status', { report, newStatus: $event.target.value })" 
              class="status-select"
            >
              <option value="checking">На проверке</option>
              <option value="in-progress">В работе</option>
              <option value="resolved">Решено</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="no-reports" v-else>
      🔎 Заявок по вашему запросу не найдено.
    </div>
  </div>
</template>

<script setup>
defineProps({
  reports: { type: Array, required: true }
})

defineEmits(['update-status'])
</script>

<style scoped>
.admin-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.admin-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  text-align: left;
}

.card-image-box {
  position: relative;
  width: 100%;
  height: 180px;
}

.card-image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.status-badge.checking { background: #e09943; }
.status-badge.in-progress { background: #2f80ed; }
.status-badge.resolved { background: #27ae60; }

.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-meta {
  font-size: 12px;
  color: #90a08d;
  margin-bottom: 8px;
}

.card-content h3 {
  margin: 0 0 10px 0;
  font-size: 17px;
  color: #2c3e29;
  font-weight: 600;
}

.description {
  margin: 0 0 20px 0;
  font-size: 13px;
  color: #7a8a77;
  line-height: 1.5;
  flex-grow: 1;
}

.admin-actions {
  border-top: 1px solid #f0f4ef;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-label {
  font-size: 12px;
  font-weight: 600;
  color: #556352;
}

.status-select {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #e2e8e1;
  background-color: #fcfdfc;
  color: #2c3e29;
  font-size: 13px;
  outline: none;
  cursor: pointer;
}

.no-reports {
  text-align: center;
  padding: 50px;
  background: white;
  border-radius: 20px;
  color: #7a8a77;
  font-size: 16px;
}

@media (max-width: 992px) {
  .admin-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .admin-grid { grid-template-columns: 1fr; }
}
</style>