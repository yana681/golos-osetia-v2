<template>
  <div class="card">
    <h2>1. Что случилось?</h2>

    <!-- ❌ Убрали визуальное отображение выбранной категории и подтемы -->
    <!-- Оставляем только кнопки выбора категории -->

    <div class="categories">
      <button
        v-for="cat in categories"
        :key="cat.value"
        class="category-btn"
        :class="{ active: selectedCategory === cat.value }"
        @click="selectCategory(cat.value)"
      >
        {{ cat.label }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  props: {
    initialCategory: {
      type: String,
      default: ''
    },
    initialSubtheme: {
      type: String,
      default: ''
    }
  },
  emits: ['update:category', 'update:subtheme'],
  setup(props, { emit }) {
    const route = useRoute()
    const selectedCategory = ref(null)
    const selectedSubtheme = ref(null)

    const categories = [
      { label: 'Дороги и тротуары', value: 'roads' },
      { label: 'Благоустройство', value: 'improvement' },
      { label: 'Освещение', value: 'lighting' },
      { label: 'ЖКХ', value: 'utilities' },
      { label: 'Транспорт', value: 'transport' }
    ]

    // Маппинг категорий из аккордеона на категории в форме
    const categoryMapping = {
      'Мой двор': 'improvement',
      'Мой дом': 'utilities',
      'Моя дорога': 'roads',
      'Государственные учреждения': 'utilities',
      'Общественный транспорт': 'transport',
      'Городская территория': 'improvement'
    }

    const selectCategory = (category) => {
      selectedCategory.value = category
      emit('update:category', category)
    }

    // Проверяем URL параметры при загрузке
    onMounted(() => {
      const categoryParam = route.query.category || props.initialCategory
      const subthemeParam = route.query.subtheme || props.initialSubtheme

      if (categoryParam) {
        const mappedCategory = categoryMapping[categoryParam]
        if (mappedCategory) {
          selectedCategory.value = mappedCategory
          emit('update:category', mappedCategory)
        }
      }
      
      if (subthemeParam) {
        selectedSubtheme.value = subthemeParam
        emit('update:subtheme', subthemeParam)
      }
    })

    // Следим за изменением props
    watch(() => props.initialCategory, (newVal) => {
      if (newVal) {
        const mappedCategory = categoryMapping[newVal]
        if (mappedCategory) {
          selectedCategory.value = mappedCategory
          emit('update:category', mappedCategory)
        }
      }
    })

    watch(() => props.initialSubtheme, (newVal) => {
      if (newVal) {
        selectedSubtheme.value = newVal
        emit('update:subtheme', newVal)
      }
    })

    return {
      selectedCategory,
      selectedSubtheme,
      categories,
      selectCategory
    }
  }
}
</script>

<style scoped>
.card {
  background: #fff9f4;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #eee;
  font-family: "Podkova";
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
  font-family: "Montserrat";
  transition: 0.2s;
}

.category-btn:hover {
  border-color: #386633;
  background: #f7faf7;
}

.category-btn.active {
  background: #2e5a27;
  color: white;
  border-color: #2e5a27;
}
</style>