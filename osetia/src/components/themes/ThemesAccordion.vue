<template>
  <div class="themes-wrapper">
 <section class="themes-accordion">
    <div class="search-bar">
      <img src="/src/assets/icons/search-header.png" alt="search" class="search-icon" />
      <input 
        type="text" 
        placeholder="Укажите ключевое слово или словосочетание, характеризующее проблему" 
        class="search-input"
      />
    </div>
    <div class="accordion-list">
      <div v-for="item in themes" :key="item.id" class="accordion-item">
        <div class="item-header">
          <div class="category-info">
            <img :src="item.icon" class="icon" />
            <span class="category-title">{{ item.title }}</span>
          </div>
          <span class="arrow">∨</span>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
const themes = [
  { id: 1, title: 'Мой двор', icon: '/src/assets/icons/my-yard-brown.png' },
  { id: 2, title: 'Мой дом', icon: '/src/assets/icons/home.png' },
  { id: 3, title: 'Моя дорога', icon: '/src/assets/icons/road.png' },
  { id: 4, title: 'Государственные учреждения', icon: '/src/assets/icons/gov.png' },
  { id: 5, title: 'Общественный транспорт', icon: '/src/assets/icons/transport.png' },
  { id: 6, title: 'Городская территория', icon: '/src/assets/icons/territory.png' }
]
</script>

<style scoped>
.themes-wrapper {
  background-color: #efe3d6; 
  padding-bottom: 100px; 
  width: 100%;
}

.themes-accordion {
  max-width: 1330px; /* Ширина из макета */
  margin: 0 auto;
}

.search-bar {
  background-color: rgba(52, 103, 53, 1); /* Цвет из макета */
  height: 62px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 12px;
  border-radius: 4px 4px 0 0; /* Легкое скругление верхних углов */
}

.search-icon {
  width: 20px;
  height: 20px;
}

.search-input {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-family: 'Playfair Display', serif; 
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: rgba(255, 255, 255, 0.6); 
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.accordion-list {
  background-color: #efe3d6; /* Цвет фона элементов */
}

.accordion-item {
  border: 1px solid rgba(52, 103, 50, 1); 
  background-color: #efe3d6; 
  cursor: pointer;
  margin-top: -1px; /* Схлопывание границ между элементами */
  transition: background-color 0.2s;
}

.accordion-item:hover {
  background-color: #e5d8c9; /* Эффект наведения */
}

.item-header {
  height: 64px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
}

.category-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.category-title {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 400;
  color: #000;
}

.arrow {
  font-size: 18px;
  color: #333;
  font-weight: 300;
}
</style>