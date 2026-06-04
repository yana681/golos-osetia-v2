<template>
  <div class="controls-block">
    <div class="filter-row">
      <div class="tags">
        <button 
          v-for="tag in tags" 
          :key="tag.value"
          class="tag-btn" 
          :class="{ active: currentFilter === tag.value }" 
          @click="$emit('update:currentFilter', tag.value)"
        >
          {{ tag.label }}
        </button>
      </div>
      
      <div class="search-box">
        <input 
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          type="text" 
          placeholder="Поиск по ключевым словам..." 
          class="search-input" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentFilter: { type: String, required: true },
  searchQuery: { type: String, default: '' }
})

defineEmits(['update:currentFilter', 'update:searchQuery'])

const tags = [
  { label: 'Все заявки', value: 'all' },
  { label: 'Новые / На проверке', value: 'checking' },
  { label: 'В работе', value: 'in-progress' },
  { label: 'Решенные', value: 'resolved' }
]
</script>

<style scoped>
.controls-block {
  margin-top: 10px;
}

.filter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tags {
  display: flex;
  gap: 10px;
}

.tag-btn {
  background: white;
  border: 1px solid #e2e8e1;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 14px;
  color: #556352;
  cursor: pointer;
  transition: 0.2s;
  font-weight: 500;
}

.tag-btn.active {
  background: #4a6b41;
  color: white;
  border-color: #4a6b41;
}

.search-input {
  background: white;
  border: 1px solid #e2e8e1;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 14px;
  outline: none;
  width: 280px;
}

@media (max-width: 600px) {
  .filter-row {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  .search-input {
    width: 100%;
  }
}
</style>