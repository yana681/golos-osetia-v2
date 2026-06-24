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
          :ref="el => { if (el) accordionRefs[item.id] = el }"
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
                @click="selectSubtheme(item.id, item.title, subtheme)"
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
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  topicId: {
    type: Number,
    default: null
  }
})

const activeId = ref(null)
const searchQuery = ref('')
const accordionRefs = ref({})

const themes = [
  { 
    id: 1, 
    title: 'Мой двор', 
    icon: '/src/assets/icons/my-yard-brown.png',
    subthemes: [
      'Неубранный мусор / переполненные контейнеры',
      'Сломанная детская или спортивная площадка',
      'Ямы на внутридворовом проезде',
      'Плохое освещение во дворе',
      'Нарушение правил парковки на газонах'
    ]
  },
  { 
    id: 2, 
    title: 'Мой дом', 
    icon: '/src/assets/icons/home.png',
    subthemes: [
      'Протечка кровли / затопление подвала',
      'Неисправность лифта',
      'Плохая уборка в подъезде',
      'Трещины в стенах / разрушение фасада',
      'Проблемы с отоплением или водоснабжением'
    ]
  },
  { 
    id: 3, 
    title: 'Моя дорога', 
    icon: '/src/assets/icons/road.png',
    subthemes: [
      'Ямы и выбоины на проезжей части',
      'Отсутствие дорожной разметки или знаков',
      'Неисправный светофор',
      'Плохое состояние тротуаров',
      'Гололед или неубранный снег на дороге'
    ]
  },
  { 
    id: 4, 
    title: 'Государственные учреждения', 
    icon: '/src/assets/icons/gov.png',
    subthemes: [
      'Очереди / неудобный график работы',
      'Плохое состояние здания или внутренних помещений',
      'Отсутствие доступной среды (пандусов) для инвалидов',
      'Жалоба на качество обслуживания'
    ]
  },
  { 
    id: 5, 
    title: 'Общественный транспорт', 
    icon: '/src/assets/icons/transport.png',
    subthemes: [
      'Нарушение расписания / долгие интервалы движения',
      'Грязь или поломки внутри салона',
      'Некорректное поведение водителя или кондуктора',
      'Неисправность валидаторов / терминалов оплаты'
    ]
  },
  { 
    id: 6, 
    title: 'Городская территория', 
    icon: '/src/assets/icons/territory.png',
    subthemes: [
      'Несанкционированная свалка в городе',
      'Сломанные лавочки или урны в парках',
      'Заброшенные здания или опасные строительные объекты',
      'Отсутствие озеленения / неухоженные газоны'
    ]
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

const openTopic = (topicId) => {
  const topic = themes.find(t => t.id === topicId)
  if (topic) {
    activeId.value = topicId
    
    nextTick(() => {
      const element = accordionRefs.value[topicId]
      if (element) {
        const offset = 120
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    })
  }
}

// ✅ Функция выбора подтемы
const selectSubtheme = (categoryId, categoryTitle, subtheme) => {
  console.log(`📝 Выбрано: категория ${categoryTitle}, подтема: ${subtheme}`)
  
  // Проверяем авторизацию
  const user = localStorage.getItem('user')
  
  if (!user) {
    // Если не авторизован - перенаправляем на страницу входа
    router.push('/login')
    return
  }
  
  // Если авторизован - перенаправляем на страницу подачи заявки с параметрами
  router.push({
    path: '/report-problem',
    query: {
      category: categoryTitle,
      subtheme: subtheme,
      categoryId: categoryId
    }
  })
}

// Следим за изменением prop от родителя
watch(() => props.topicId, (newId) => {
  if (newId) {
    openTopic(newId)
  }
}, { immediate: true })

// Проверяем URL параметр при загрузке
onMounted(() => {
  const queryTopic = route.query.topic
  
  if (queryTopic) {
    const topicIdNum = parseInt(queryTopic, 10)
    openTopic(topicIdNum)
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
  font-family: 'Montserrat', serif; 
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #fff; 
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.accordion-list {
  background-color: #F1DFCB; 
}

.accordion-item {
  border: 1px solid rgba(52, 103, 50, 1); 
  background-color: #F1DFCB; 
  margin-top: -1px; 
  transition: 0.2s;
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
  font-family: 'Montserrat', serif;
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
  background-color:#f7ede2;
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
  font-family: "Montserrat";
  color: #333333;
  line-height: 1.4;
}

.subtheme-item:hover .subtheme-text {
  color: rgba(52, 103, 53, 1);
}
</style>