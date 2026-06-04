<template>
  <div class="stats-container">
    <div class="stat-item">
      <h2>18</h2>
      <div class="stat-label">Сообщений</div>
      <div class="stat-sub">Вы оставили</div>
    </div>
    
    <div class="stat-item">
      <h2 class="resolved">5</h2>
      <div class="stat-label">Решено</div>
      <div class="stat-sub">Спасибо за активность!</div>
    </div>
    
    <div class="stat-item">
      <h2 class="in-progress">7</h2>
      <div class="stat-label">В работе</div>
      <div class="stat-sub">Следим за ситуацией</div>
    </div>
    
    <div class="stat-item">
      <h2>12</h2>
      <div class="stat-label">Нравится</div>
      <div class="stat-sub">Вашим сообщениям</div>
    </div>
  </div>
</template>

<style scoped>
.stats-container {
  background: white;
  border-radius: 24px;
  padding: 30px 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.stat-item {
  text-align: left;
  padding: 0 40px;
  border-right: 1px solid #edf2ec;
}

.stat-item:last-child {
  border-right: none;
}

.stat-item h2 {
  margin: 0 0 8px 0;
  font-size: 36px;
  font-weight: 600;
  color: #2c3e29;
}

.stat-item h2.resolved { color: #b07c5b; }
.stat-item h2.in-progress { color: #4a6b41; }

.stat-label {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e29;
  margin-bottom: 4px;
}

.stat-sub {
  font-size: 12px;
  color: #90a08d;
}
</style>