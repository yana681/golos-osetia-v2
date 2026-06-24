<template>
  <div class="card">
    <h2>Фото</h2>

    <div class="upload-area" @click="triggerFileInput" @dragover.prevent @drop.prevent="handleDrop">
      <input
        ref="fileInput"
        type="file"
        hidden
        accept="image/*"
        @change="onFileChange"
      />

      <!-- Если фото ещё не загружено -->
      <div v-if="!image" class="upload-placeholder">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#b0c0ad" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <p class="upload-text">📷 Нажмите или перетащите фото сюда</p>
        <p class="upload-hint">Поддерживаются JPG, PNG, WEBP (макс. 5MB)</p>
      </div>

      <!-- Предпросмотр загруженного фото -->
      <div v-else class="preview-container">
        <div class="preview-item">
          <img :src="image.url" alt="Загруженное фото" class="preview-image" />
          <button class="remove-btn" @click.stop="removeImage">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div class="image-overlay">
            <span class="image-status">✓ Фото загружено</span>
          </div>
        </div>
        
        <!-- Кнопка заменить фото -->
        <button class="replace-btn" @click.stop="triggerFileInput">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7"/>
            <polyline points="17 2 21 6 17 10"/>
            <line x1="21" y1="6" x2="11" y2="6"/>
          </svg>
          Заменить фото
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['update'])

const fileInput = ref(null)
const image = ref(null)

// Максимальный размер файла - 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024
// Разрешенные типы файлов
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

// Открыть диалог выбора файлов
const triggerFileInput = () => {
  fileInput.value.click()
}

// Обработка выбора файла
const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    processFile(file)
  }
  // Очищаем input для возможности повторной загрузки того же файла
  e.target.value = ''
}

// Обработка перетаскивания
const handleDrop = (e) => {
  const file = e.dataTransfer.files[0]
  if (file) {
    processFile(file)
  }
}

// Обработка файла
const processFile = (file) => {
  // Проверка типа файла
  if (!ALLOWED_TYPES.includes(file.type)) {
    alert(`Файл "${file.name}" имеет неподдерживаемый формат. Разрешены: JPG, PNG, WEBP, GIF`)
    return
  }
  
  // Проверка размера
  if (file.size > MAX_FILE_SIZE) {
    alert(`Файл "${file.name}" слишком большой (${(file.size / 1024 / 1024).toFixed(1)}MB). Максимальный размер: 5MB`)
    return
  }

  // Если уже есть фото - удаляем старый URL
  if (image.value) {
    URL.revokeObjectURL(image.value.url)
  }

  // Создаём URL для предпросмотра
  const url = URL.createObjectURL(file)
  image.value = {
    file: file,
    url: url
  }

  // Эмитим событие с файлом
  emit('update', file)
}

// Удаление фото
const removeImage = () => {
  if (image.value) {
    URL.revokeObjectURL(image.value.url)
    image.value = null
    emit('update', null)
  }
}

// Очистка фото (можно добавить, если нужно)
const clearImage = () => {
  if (image.value) {
    URL.revokeObjectURL(image.value.url)
    image.value = null
    emit('update', null)
  }
}

// Получить загруженный файл
const getImage = () => {
  return image.value ? image.value.file : null
}

// Освобождаем память при уничтожении компонента
defineExpose({
  clearImage,
  getImage
})
</script>

<style scoped>
.card {
  background: #fff9f4;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #eee;
  box-shadow: 0 6px 20px rgba(0,0,0,0.04);
  font-family: "Podkova";
}

.upload-area {
  margin-top: 16px;
  border: 2px dashed #cfd8cf;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-area:hover {
  border-color: #386633;
  background: #f7faf7;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.upload-text {
  font-family: "Montserrat";
  font-size: 16px;
  color: #7a8a77;
  margin: 8px 0 4px 0;
}

.upload-hint {
  font-family: "Montserrat";
  font-size: 12px;
  color: #b0c0ad;
  margin: 0;
}

.preview-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.preview-item {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 4/3;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e8f0e6;
  transition: all 0.3s ease;
}

.preview-item:hover {
  border-color: #386633;
  transform: scale(1.01);
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 0;
  z-index: 2;
}

.remove-btn:hover {
  background: rgba(220, 53, 69, 1);
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  display: flex;
  justify-content: center;
}

.image-status {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  color: white;
  font-weight: 500;
}

.replace-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: rgba(56, 102, 51, 0.08);
  border: 1px solid #cfd8cf;
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #556352;
  cursor: pointer;
  transition: all 0.3s ease;
}

.replace-btn:hover {
  background: rgba(56, 102, 51, 0.15);
  border-color: #386633;
}

/* Адаптив для мобильных */
@media (max-width: 480px) {
  .upload-area {
    padding: 20px;
    min-height: 150px;
  }
  
  .preview-item {
    max-width: 100%;
  }
}
</style>