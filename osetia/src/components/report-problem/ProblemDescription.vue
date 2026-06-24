<template>
  <div class="card">
    <h2>Описание проблемы</h2>

    <!-- ❌ Убрали визуальное отображение подтемы -->

    <textarea
      v-model="text"
      :placeholder="placeholderText"
      class="textarea"
    />

    <div class="hint">
      Расскажите подробно: что случилось, как давно, что мешает
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
  initialSubtheme: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update'])
const text = ref('')
const subtheme = ref('')

// Плейсхолдер в зависимости от выбранной подтемы
const placeholderText = computed(() => {
  if (subtheme.value) {
    return `Опишите подробно: ${subtheme.value.toLowerCase()}...`
  }
  return 'Опишите проблему...'
})

// Проверяем URL параметры при загрузке
onMounted(() => {
  const subthemeParam = route.query.subtheme || props.initialSubtheme
  if (subthemeParam) {
    subtheme.value = subthemeParam
    // Добавляем подсказку в текст
    text.value = `Проблема: ${subthemeParam}\n\n`
    emit('update', text.value)
  }
})

// Следим за изменением props
watch(() => props.initialSubtheme, (newSubtheme) => {
  if (newSubtheme) {
    subtheme.value = newSubtheme
    if (!text.value.startsWith('Проблема:')) {
      text.value = `Проблема: ${newSubtheme}\n\n`
      emit('update', text.value)
    }
  }
})

// Следим за изменением URL
watch(() => route.query.subtheme, (newSubtheme) => {
  if (newSubtheme) {
    subtheme.value = newSubtheme
    if (!text.value.startsWith('Проблема:')) {
      text.value = `Проблема: ${newSubtheme}\n\n`
      emit('update', text.value)
    }
  }
})

watch(text, (val) => {
  emit('update', val)
})
</script>

<style scoped>
.card {
  background: #fff9f4;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #eee;
  box-shadow: 0 6px 20px rgba(0,0,0,0.04);
  font-family: "podkova";
}

.textarea {
  width: 100%;
  min-height: 140px;
  box-sizing: border-box;
  margin-top: 16px;
  border-radius: 14px;
  border: 1px solid #ddd;
  padding: 14px;
  outline: none;
  font-family: "Montserrat";
  resize: vertical;
}

.textarea:focus {
  border-color: #386633;
}

.hint {
  margin-top: 10px;
  font-size: 12px;
  color: #888;
  font-family: "Montserrat";
}
</style>