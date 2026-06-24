<template>
  <header class="header">
    <div class="container">
      <div class="logo-container">
        <img src="/src/assets/logo.png" alt="Голос Осетии" class="logo-img" />
        <router-link to="/" class="logo-text">Голос Осетии</router-link>
      </div>

      <nav class="nav">
        <router-link to="/themes" class="nav-link">Темы</router-link>
        <router-link to="/results" class="nav-link">Результаты</router-link>
        <router-link to="/news" class="nav-link">Новости</router-link>
        <router-link to="/about" class="nav-link">О портале</router-link>
      </nav>

      <div class="actions">
        <button class="action-btn">
          <img src="/src/assets/icons/search-header.png" alt="Поиск" class="header-icon" />
        </button>
        
        <button class="action-btn" @click="handleFavorites">
          <img src="/src/assets/icons/save-header.png" alt="Избранные" class="header-icon" />
        </button>
        
        <template v-if="isAuthenticated">
          <router-link v-if="isAdmin" to="/admin" class="action-btn admin-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
            </svg>
          </router-link>
          <router-link v-else to="/profile" class="action-btn">
            <img src="/src/assets/icons/user-header.png" alt="Профиль" class="header-icon" />
          </router-link>
        </template>
        <router-link v-else to="/login" class="action-btn">
          <img src="/src/assets/icons/user-header.png" alt="Профиль" class="header-icon" />
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = ref(false)
const isAdmin = ref(false)

onMounted(() => {
  const user = localStorage.getItem('user')
  if (user) {
    try {
      const userData = JSON.parse(user)
      isAuthenticated.value = true
      isAdmin.value = userData.role === 'admin'
    } catch (e) {
      console.error('Ошибка парсинга user:', e)
    }
  }
})

const handleFavorites = () => {
  if (isAuthenticated.value) {
    router.push('/profile?tab=favorites')
  } else {
    router.push('/login')
  }
}
</script>

<style scoped>
.header {
  background-color: #F1DFCB;
  padding: 20px 0;
  border-bottom: 2px solid #2e5a27;
}

.container {
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-img {
  height: 60px;
  width: auto;
}

.logo-text {
  font-family: 'Podkova', serif;
  font-weight: 900;
  line-height: 16px;
  font-size: 32px;
  color: #783F1C;
  text-transform: none;
  text-decoration: none; 
}

.nav {
  display: flex;
  gap: 25px;
  margin-left: 275px;
}

.nav-link {
  font-family: 'Montserrat', serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 16px;
  text-transform: uppercase;
  text-decoration: none;
  color: #783F1C;
  transition: opacity 0.3s;
}

.nav-link:hover {
  opacity: 0.7;
}

.actions {
  display: flex;
  align-items: center; 
  gap: 20px; 
}

.action-btn {
  background: none;
  filter: brightness(0) saturate(100%) invert(27%) sepia(42%) saturate(1319%) hue-rotate(350deg) brightness(96%) contrast(90%);
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  text-decoration: none; 
  transition: transform 0.2s;
}

.action-btn:hover {
  transform: scale(1.1);
}

.action-btn.admin-link {
  filter: none;
  color: #783F1C;
}

.action-btn.admin-link svg {
  stroke: #783F1C;
}

.header-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
</style>