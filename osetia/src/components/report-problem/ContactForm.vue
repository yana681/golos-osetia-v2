<template>
  <div class="card">
    <h2>Контакты</h2>

    <input
      v-model="contact"
      type="text"
      placeholder="Email или телефон"
      class="input"
    />

    <button class="submit-btn" @click="submit">
      Отправить сообщение
    </button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['submit'])
const contact = ref('')

const submit = () => {
  emit('submit', contact.value)
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

.input {
  width: 100%;
  box-sizing: border-box;
  margin-top: 16px;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid #ddd;
}

.submit-btn {
  margin-top: 16px;
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 14px;
  background: #386633;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
}

.submit-btn:hover {
  background: #2f552a;
}
</style>