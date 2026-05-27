<template>
  <div class="card">
    <h2>Описание проблемы</h2>

    <textarea
      v-model="text"
      placeholder="Опишите проблему..."
      class="textarea"
    />

    <div class="hint">
      Расскажите подробно: что случилось, как давно, что мешает
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref, watch } from 'vue'

const emit = defineEmits(['update'])
const text = ref('')

watch(text, (val) => {
  emit('update', val)
})
</script>

<style scoped>
.card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #eee;
  box-shadow: 0 6px 20px rgba(0,0,0,0.04);
}

.textarea {
  width: 100%;
  min-height: 140px;
  box-sizing: border-box;
  margin-top: 16px;
  border-radius: 14px;
  border: 1px solid #ddd;
  padding: 14px;
  outline: none;
}

.textarea:focus {
  border-color: #386633;
}

.hint {
  margin-top: 10px;
  font-size: 12px;
  color: #888;
}
</style>