<template>
  <div class="card">
    <h2>Контакты</h2>

    <input
      v-model="contact"
      type="text"
      placeholder="Email или телефон"
      class="input"
    />
  </div>
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue'

const emit = defineEmits(['submit'])
const contact = ref('')

const submit = () => {
  emit('submit', contact.value)
}

// Автоматически отправляем при изменении
watch(contact, (val) => {
  emit('submit', val)
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

.input {
  width: 100%;
  font-family: "Montserrat";
  box-sizing: border-box;
  margin-top: 16px;
  margin-bottom: 20px;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid #ddd;
  outline: none;
}

.input:focus {
  border-color: #386633;
}
</style>