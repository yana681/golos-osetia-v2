<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-backdrop">
      <div class="modal-content">
        <button class="modal-close" @click="close">✕</button>
        
        <div class="modal-header">
          <h2>{{ report?.subtheme || report?.category || 'Заявка' }}</h2>
          <span class="modal-status" :class="report?.statusClass">
            {{ report?.statusText }}
          </span>
        </div>

        <div class="modal-body">
          <!-- Фото -->
          <div class="modal-image">
            <img 
              :src="report?.photo_url || '/src/assets/placeholder.jpg'" 
              alt="Фото проблемы"
              @error="e => e.target.src = '/src/assets/placeholder.jpg'"
            />
          </div>

          <!-- Информация -->
          <div class="modal-info">
            <div class="info-row">
              <span class="info-label">📂 Категория</span>
              <span class="info-value">{{ report?.category || 'Не указана' }}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">📝 Подтема</span>
              <span class="info-value">{{ report?.subtheme || 'Не указана' }}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">📍 Адрес</span>
              <span class="info-value">{{ report?.address || 'Не указан' }}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">📅 Дата создания</span>
              <span class="info-value">{{ report?.date || 'Не указана' }}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">📞 Контакты</span>
              <span class="info-value">{{ report?.contact || 'Не указаны' }}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">📊 Статус</span>
              <span class="info-value status-badge" :class="report?.statusClass">
                {{ report?.statusText }}
              </span>
            </div>
          </div>

          <!-- Описание -->
          <div class="modal-description">
            <h3>📝 Описание проблемы</h3>
            <p>{{ report?.description || 'Описание отсутствует' }}</p>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-close" @click="close">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  report: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

// Закрытие по Escape
watch(() => props.visible, (newVal) => {
  if (newVal) {
    // ✅ Блокируем прокрутку body
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleEscape)
  }
})

const handleEscape = (e) => {
  if (e.key === 'Escape') {
    close()
  }
}

// При монтировании убеждаемся, что модальное окно будет поверх всего
onMounted(() => {
  // Создаём портал для модального окна, если нужно
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 40px;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999 !important; /* ✅ Максимальный z-index */
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

.modal-backdrop {
  position: relative;
  z-index: 10000 !important;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: #F1DFCB;
  border-radius: 24px;
  max-width: 700px;
  width: 60%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 40px;
  position: relative;
  animation: slideUp 0.3s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  z-index: 10001 !important;
}

@keyframes slideUp {
  from { transform: translateY(30px) scale(0.95); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10002 !important;
}

.modal-close:hover {
  background: #f0f0f0;
  color: #333;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-right: 30px;
}

.modal-header h2 {
  margin: 0;
  font-family: 'Podkova', serif;
  font-size: 24px;
  color: #2c3e29;
}

.modal-status {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  color: white;
  font-family: 'Montserrat', sans-serif;
  white-space: nowrap;
}

.modal-status.checking { background: #e09943; }
.modal-status.in-progress { background: #2f80ed; }
.modal-status.resolved { background: #27ae60; }
.modal-status.rejected { background: #e74c3c; }

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.modal-image {
  width: 100%;
  height: 280px;
  border-radius: 16px;
  overflow: hidden;
  background: #f5f5f5;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-image img[src*="placeholder"] {
  object-fit: contain;
  padding: 20px;
}

.modal-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
  background: #f8f6f4;
  padding: 20px;
  border-radius: 16px;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #90a08d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  color: #2c3e29;
  font-weight: 500;
  word-break: break-word;
}

.info-value.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  color: white;
  width: fit-content;
}

.info-value.status-badge.checking { background: #e09943; }
.info-value.status-badge.in-progress { background: #2f80ed; }
.info-value.status-badge.resolved { background: #27ae60; }
.info-value.status-badge.rejected { background: #e74c3c; }

.modal-description {
  background: #f8f6f4;
  padding: 20px;
  border-radius: 16px;
}

.modal-description h3 {
  margin: 0 0 12px 0;
  font-family: 'Podkova', serif;
  font-size: 18px;
  color: #2c3e29;
}

.modal-description p {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  line-height: 1.6;
  color: #4a5a47;
}

.modal-footer {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

.btn-close {
  padding: 12px 40px;
  background: #4a6b41;
  color: white;
  border: none;
  border-radius: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10002 !important;
}

.btn-close:hover {
  background: #3b5a33;
  transform: scale(1.02);
}

@media (max-width: 600px) {
  .modal-content {
    padding: 24px;
    width: 95%;
  }
  
  .modal-info {
    grid-template-columns: 1fr;
  }
  
  .modal-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .modal-image {
    height: 200px;
  }
}
</style>