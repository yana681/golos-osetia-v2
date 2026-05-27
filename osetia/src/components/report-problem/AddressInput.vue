<template>
  <div class="card">
    <h2>Место</h2>

    <input
      v-model="address"
      type="text"
      placeholder="Введите адрес"
      class="input"
    />
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue'

const emit = defineEmits(['update'])
const address = ref('')

watch(address, v => emit('update', v))
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
  outline: none;
}

.input:focus {
  border-color: #386633;
}
</style>