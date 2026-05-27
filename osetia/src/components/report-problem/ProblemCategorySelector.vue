<template>
  <div class="card">

    <h2>1. Что случилось?</h2>

    <div class="categories">

      <button class="category-btn">
        Дороги и тротуары
      </button>

      <button class="category-btn">
        Благоустройство
      </button>

      <button class="category-btn">
        Освещение
      </button>

      <button class="category-btn">
        ЖКХ
      </button>

      <button class="category-btn">
        Транспорт
      </button>

    </div>

  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #eee;
}

.categories {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 20px;
}

.category-btn {
  padding: 20px;
  border-radius: 14px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}
</style>