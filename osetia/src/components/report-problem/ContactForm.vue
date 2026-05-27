<template>
  <div class="card">
    <h2>5. Контактные данные</h2>

    <input
      type="text"
      placeholder="Email или телефон"
      class="input"
    />

    <button class="submit-btn">
      Отправить сообщение
    </button>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #eee;
}

.input {
  width: 100%;
  margin-top: 20px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
}

.submit-btn {
  margin-top: 20px;
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 14px;
  background: #386633;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
</style>