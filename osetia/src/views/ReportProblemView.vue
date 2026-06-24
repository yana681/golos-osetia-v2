<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProblemCategorySelector from '../components/report-problem/ProblemCategorySelector.vue'
import ProblemDescription from '../components/report-problem/ProblemDescription.vue'
import AddressInput from '../components/report-problem/AddressInput.vue'
import PhotoUploader from '../components/report-problem/PhotoUploader.vue'
import ContactForm from '../components/report-problem/ContactForm.vue'
import HowToBlock from '../components/report-problem/HowToBlock.vue'
import NextStepsBlock from '../components/report-problem/NextStepsBlock.vue'
import { authService } from '../services/auth.services.js'

const route = useRoute()
const router = useRouter()

const formData = ref({
  category: '',
  subtheme: '',
  description: '',
  address: '',
  contact: '',
  photo_path: null
})

const isLoading = ref(false)
const submitMessage = ref('')
const selectedCategory = ref('')
const selectedSubtheme = ref('')

onMounted(() => {
  const category = route.query.category
  const subtheme = route.query.subtheme
  
  if (category) {
    selectedCategory.value = category
    formData.value.category = category
  }
  if (subtheme) {
    selectedSubtheme.value = subtheme
    formData.value.subtheme = subtheme
  }
})

const updateCategory = (value) => { formData.value.category = value }
const updateSubtheme = (value) => { formData.value.subtheme = value }
const updateDescription = (value) => { formData.value.description = value }
const updateAddress = (value) => { formData.value.address = value }
const updateContact = (value) => { formData.value.contact = value }

// ✅ Получаем путь к фото от PhotoUploader
const updatePhoto = (photoPath) => {
  formData.value.photo_path = photoPath
  console.log('📸 Путь к фото:', photoPath)
}

const submitForm = async () => {
  if (!formData.value.category) {
    alert('Пожалуйста, выберите категорию')
    return
  }
  
  if (!formData.value.description) {
    alert('Пожалуйста, опишите проблему')
    return
  }
  
  if (!formData.value.address) {
    alert('Пожалуйста, укажите адрес')
    return
  }
  
  if (!formData.value.photo_path) {
    alert('Пожалуйста, загрузите фото')
    return
  }

  isLoading.value = true
  submitMessage.value = ''

  try {
    const reportData = {
      category: formData.value.category,
      subtheme: formData.value.subtheme || 'Не указано',
      description: formData.value.description,
      address: formData.value.address,
      contact: formData.value.contact || '',
      photo_path: formData.value.photo_path
    }

    console.log('📤 Отправка заявки с фото:', reportData)

    const response = await authService.submitReport(reportData)

    if (response.success) {
      submitMessage.value = '✅ Заявка успешно отправлена!'
      
      formData.value = {
        category: '',
        subtheme: '',
        description: '',
        address: '',
        contact: '',
        photo_path: null
      }
      
      setTimeout(() => {
        router.push('/profile')
      }, 2000)
    }
  } catch (error) {
    console.error('Ошибка отправки:', error)
    submitMessage.value = '❌ Ошибка: ' + error.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="report-page">
    <div class="container">
      <h1 class="title">Сообщить о проблеме</h1>

      <div v-if="submitMessage" class="submit-message" :class="{ success: submitMessage.includes('✅'), error: submitMessage.includes('❌') }">
        {{ submitMessage }}
      </div>

      <div class="report-layout">
        <div class="left-column">
          <ProblemCategorySelector 
            :initialCategory="selectedCategory"
            :initialSubtheme="selectedSubtheme"
            @update:category="updateCategory"
            @update:subtheme="updateSubtheme"
          />
          <ProblemDescription :initialSubtheme="selectedSubtheme" @update="updateDescription" />
          <AddressInput @update="updateAddress" />
          <PhotoUploader @update="updatePhoto" />
          <ContactForm @submit="updateContact" />
          
          <button class="submit-report-btn" @click="submitForm" :disabled="isLoading">
            {{ isLoading ? 'Отправка...' : 'Отправить заявку' }}
          </button>
        </div>

        <div class="right-column">
          <HowToBlock />
          <NextStepsBlock />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.report-page {
  padding: 40px 0;
  background-color: #f1dfcb;
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.title {
  margin-bottom: 30px;
  font-family: "Podkova";
  font-size: 38px;
  color: #2c3e29;
}

.submit-message {
  padding: 16px 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 500;
}

.submit-message.success {
  background: rgba(46, 204, 113, 0.15);
  color: #27ae60;
  border: 1px solid #27ae60;
}

.submit-message.error {
  background: rgba(231, 76, 60, 0.15);
  color: #e74c3c;
  border: 1px solid #e74c3c;
}

.report-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.submit-report-btn {
  width: 100%;
  padding: 18px;
  background: #4a6b41;
  color: white;
  border: none;
  border-radius: 14px;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-report-btn:hover:not(:disabled) {
  background: #3b5a33;
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(74, 107, 65, 0.3);
}

.submit-report-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 992px) {
  .report-layout {
    grid-template-columns: 1fr;
  }
  .title {
    font-size: 30px;
  }
}
</style>