<template>
  <div class="card">
    <h2>Фото</h2>

    <div class="upload-box" @click="trigger">
      <input
        ref="fileInput"
        type="file"
        hidden
        multiple
        @change="onFileChange"
      />

      <p>📷 Нажмите для загрузки фото</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['update'])
const fileInput = ref(null)

const trigger = () => {
  fileInput.value.click()
}

const onFileChange = (e) => {
  emit('update', Array.from(e.target.files))
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #eee;
  box-shadow: 0 6px 20px rgba(0,0,0,0.04);
}

.upload-box {
  margin-top: 16px;
  border: 2px dashed #cfd8cf;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
}

.upload-box:hover {
  border-color: #386633;
  background: #f7faf7;
}
</style>