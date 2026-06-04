<template>
</template>

<style scoped>
.controls-block {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 10px;
}

.main-tabs {
  display: flex;
  gap: 30px;
  border-bottom: 2px solid #e2e8e1;
}

.tab-btn {
  background: none;
  border: none;
  padding: 12px 5px;
  font-size: 16px;
  font-weight: 600;
  color: #7a8a77;
  cursor: pointer;
  position: relative;
}

.tab-btn.active {
  color: #2c3e29;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 3px;
  background: #4a6b41;
}

/* Фильтры-теги */
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
  padding: 8px 18px;
  font-size: 14px;
  color: #556352;
  cursor: pointer;
  transition: 0.2s;
}

.tag-btn.active {
  background: #4a6b41;
  color: white;
  border-color: #4a6b41;
}

/* Поиск */
.search-box {
  display: flex;
  gap: 10px;
}

.search-input {
  background: white;
  border: 1px solid #e2e8e1;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 14px;
  outline: none;
  width: 240px;
}

.filter-settings-btn {
  background: white;
  border: 1px solid #e2e8e1;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>