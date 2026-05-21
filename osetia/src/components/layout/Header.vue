<template>
  <header class="header">
    <div class="container">
      <div class="logo-container">
        <img src="/src/assets/logo.png" alt="Голос Осетии" class="logo-img" />
        <router-link to="/" class="logo-text">Голос Осетии</router-link>
      </div>

      <nav class="nav">
        <a href="#" class="nav-link">Карта</a>
        <router-link to="/themes" class="nav-link">Темы</router-link>
        <router-link to="/results" class="nav-link">Результаты</router-link>
        <router-link to="/news" class="nav-link">Новости</router-link>
        <router-link to="/about" class="nav-link">О портале</router-link>
      </nav>

      <div class="actions">
        <button class="action-btn">
          <img src="/src/assets/icons/search-header.png" alt="Поиск" class="header-icon" />
        </button>
        <button class="action-btn">
          <img src="/src/assets/icons/save-header.png" alt="Избранные" class="header-icon" />
        </button>
        <router-link to="/login" class="action-btn">
          <img src="/src/assets/icons/user-header.png" alt="Профиль" class="header-icon" />
        </router-link>
      </div>
    </div>
  </header>
</template>

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
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 24px;
  color: #721e1e;
  text-transform: none;
  text-decoration: none; 
}

.nav {
  display: flex;
  gap: 25px;
}

.nav-link {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 16px;
  text-transform: uppercase;
  text-decoration: none;
  color: #721e1e;
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

.header-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
</style>