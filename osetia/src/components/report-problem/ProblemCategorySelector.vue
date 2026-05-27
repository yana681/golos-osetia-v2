<template>
  <div class="card">
    <h2>1. Что случилось?</h2>

    <div class="categories">
      <button
        class="category-btn"
        :class="{ active: selectedCategory === 'roads' }"
        @click="selectCategory('roads')"
      >
        Дороги и тротуары
      </button>

      <button
        class="category-btn"
        :class="{ active: selectedCategory === 'improvement' }"
        @click="selectCategory('improvement')"
      >
        Благоустройство
      </button>

      <button
        class="category-btn"
        :class="{ active: selectedCategory === 'lighting' }"
        @click="selectCategory('lighting')"
      >
        Освещение
      </button>

      <button
        class="category-btn"
        :class="{ active: selectedCategory === 'utilities' }"
        @click="selectCategory('utilities')"
      >
        ЖКХ
      </button>

      <button
        class="category-btn"
        :class="{ active: selectedCategory === 'transport' }"
        @click="selectCategory('transport')"
      >
        Транспорт
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: null
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category
    }
  }
}
</script>

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
  transition: 0.2s;
}

.category-btn.active {
  background: #2e5a27;
  color: white;
  border-color:#2e5a27;
}
</style>