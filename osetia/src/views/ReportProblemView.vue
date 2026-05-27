<script setup>
import ProblemCategorySelector from '../components/report-problem/ProblemCategorySelector.vue'
import ProblemDescription from '../components/report-problem/ProblemDescription.vue'
import AddressInput from '../components/report-problem/AddressInput.vue'
import PhotoUploader from '../components/report-problem/PhotoUploader.vue'
import ContactForm from '../components/report-problem/ContactForm.vue'
import HowToBlock from '../components/report-problem/HowToBlock.vue'
import NextStepsBlock from '../components/report-problem/NextStepsBlock.vue'
</script>

<template>
  <div class="report-page">

    <div class="container">

      <h1 class="title">
        Сообщить о проблеме
      </h1>

      <div class="report-layout">

        <!-- Левая колонка -->
        <div class="left-column">

          <ProblemCategorySelector />

          <ProblemDescription />

          <AddressInput />

          <PhotoUploader />

          <ContactForm />

        </div>

        <!-- Правая колонка -->
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
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.title {
  margin-bottom: 30px;
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
</style>