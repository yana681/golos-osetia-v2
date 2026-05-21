<template>
  <div class="themes-wrapper">
    <section class="themes-accordion">
      <div class="search-bar">
        <img src="/src/assets/icons/search-header.png" alt="search" class="search-icon" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Укажите ключевое слово или словосочетание, характеризующее проблему" 
          class="search-input"
        />
      </div>

      <div class="accordion-list">
        <div 
          v-for="item in filteredThemes" 
          :key="item.id" 
          class="accordion-item"
          :class="{ 'is-active': activeId === item.id }"
        >
          <div class="item-header" @click="toggleAccordion(item.id)">
            <div class="category-info">
              <img :src="item.icon" class="icon" alt="" />
              <span class="category-title">{{ item.title }}</span>
            </div>
            <span class="arrow" :class="{ 'arrow-rotated': activeId === item.id }">∨</span>
          </div>

          <div v-if="activeId === item.id" class="item-content">
            <ul class="subthemes-list">
              <li 
                v-for="(subtheme, idx) in item.subthemes" 
                :key="idx" 
                class="subtheme-item"
                @click="selectSubtheme(item.title, subtheme)"
              >
                <span class="subtheme-bullet"></span>
                <span class="subtheme-text">{{ subtheme }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeId = ref(null)
const searchQuery = ref('')

const themes = [
  { 
    id: 1, 
    title: 'Мой двор', 
    icon: '/src/assets/icons/my-yard-brown.png',
    subthemes: ['Неубранный мусор / переполненные контейнеры', 'Сломанная детская или спортивная площадка', 'Ямы на внутридворовом проезде', 'Плохое освещение во дворе', 'Нарушение правил парковки газонах']
  },
  { 
    id: 2, 
    title: 'Мой дом', 
    icon: '/src/assets/icons/home.png',
    subthemes: ['Протечка кровли / затопление подвала', 'Неисправность лифта', 'Плохая уборка в подъезде', 'Трещины в стенах / разрушение фасада', 'Проблемы с отоплением или водоснабжением']
  },
  { 
    id: 3, 
    title: 'Моя дорога', 
    icon: '/src/assets/icons/road.png',
    subthemes: ['Ямы и выбоины на проезжей части', 'Отсутствие дорожной разметки или знаков', 'Неисправный светофор', 'Плохое состояние тротуаров', 'Гололед или неубранный снег на дороге']
  },
  { 
    id: 4, 
    title: 'Государственные учреждения', 
    icon: '/src/assets/icons/gov.png',
    subthemes: ['Очереди / неудобный график работы', 'Плохое состояние здания или внутренних помещений', 'Отсутствие доступной среды (пандусов) для инвалидов', 'Жалоба на качество обслуживания']
  },
  { 
    id: 5, 
    title: 'Общественный транспорт', 
    icon: '/src/assets/icons/transport.png',
    subthemes: ['Нарушение расписания / долгие интервалы движения', 'Грязь или поломки внутри салона', 'Некорректное поведение водителя или кондуктора', 'Неисправность валидаторов / терминалов оплаты']
  },
  { 
    id: 6, 
    title: 'Городская территория', 
    icon: '/src/assets/icons/territory.png',
    subthemes: ['Несанкционированная свалка в городе', 'Сломанные лавочки или урны в парках', 'Заброшенные здания или опасные строительные объекты', 'Отсутствие озеленения / неухоженные газоны']
  }
]

const filteredThemes = computed(() => {
  if (!searchQuery.value) return themes;
  return themes.filter(theme => 
    theme.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    theme.subthemes.some(sub => sub.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
})
const toggleAccordion = (id) => {
  activeId.value = activeId.value === id ? null : id
}

const selectSubtheme = (category, subtheme) => {
  console.log(`Выбрана категория: ${category}, подтема: ${subtheme}`)
}
onMounted(() => {
  const queryTopic = route.query.topic
  
  if (queryTopic) {
    const topicIdNum = parseInt(queryTopic, 10)
    const found = themes.find(t => t.id === topicIdNum)
    
    if (found) {
      activeId.value = found.id
      setTimeout(() => {
        const activeElement = document.querySelector('.accordion-item.is-active')
        if (activeElement) {
          activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 300)
    }
  }
})
</script>

<style scoped>
.themes-wrapper {
  background-color: #F1DFCB;
  padding-bottom: 100px; 
  width: 100%;
}

.themes-accordion {
  max-width: 1330px; 
  margin: 0 auto;
}

.search-bar {
  background-color: rgba(52, 103, 53, 1); 
  height: 62px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 12px;
  border-radius: 4px 4px 0 0; 
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
  color: #fff; 
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.accordion-list {
  background-color: #efe3d6; 
}

.accordion-item {
  border: 1px solid rgba(52, 103, 50, 1); 
  background-color: #efe3d6; 
  margin-top: -1px; 
  transition: background-color 0.2s;
}

.accordion-item.is-active {
  background-color: #f7ede2;
}

.item-header {
  height: 64px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  cursor: pointer;
  user-select: none;
}

.item-header:hover {
  background-color: rgba(52, 103, 50, 0.05); 
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
  display: inline-block;
  transition: transform 0.2s ease; 
}
.arrow-rotated {
  transform: rotate(180deg);
}

.item-content {
  background-color: #ffffff;
  border-top: 1px solid rgba(52, 103, 50, 0.3);
  padding: 15px 25px 20px 68px; 
}

.subthemes-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subtheme-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 4px 0;
  transition: color 0.2s ease;
}

.subtheme-item:hover {
  color: rgba(52, 103, 53, 1);
}

.subtheme-bullet {
  width: 6px;
  height: 6px;
  background-color: rgba(52, 103, 53, 1);
  border-radius: 50%;
  flex-shrink: 0;
}

.subtheme-text {
  font-family: sans-serif;
  font-size: 16px;
  color: #333333;
  line-height: 1.4;
}

.subtheme-item:hover .subtheme-text {
  color: rgba(52, 103, 53, 1);
}
</style>