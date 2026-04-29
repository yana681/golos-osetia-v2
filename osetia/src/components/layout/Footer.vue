<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-column">
          <h3 class="footer-title">Посетителям</h3>
          <ul class="footer-links">
            <li><a href="#">Актуальные проблемы</a></li>
            <li><a href="#">Карта проблем</a></li>
            <li><a href="#">О проекте</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3 class="footer-title">Приложение</h3>
          <div class="app-buttons">
            <a href="#" class="app-link">
              <img src="/src/assets/icons/app-gallery.png" alt="Доступно в AppGallery" />
            </a>
            <a href="#" class="app-link">
              <img src="/src/assets/icons/app-store.png" alt="Загрузите в App Store" />
            </a>
            <a href="#" class="app-link">
              <img src="/src/assets/icons/ru-market.png" alt="Загрузите в RuMarket" />
            </a>
          </div>
        </div>

        <div class="footer-column">
          <h3 class="footer-title">Мы в соцсетях</h3>
          <div class="social-links">
            <a href="#" class="social-link">
              <img src="/src/assets/icons/ok-social.png" alt="Одноклассники" />
            </a>
            <a href="#" class="social-link">
              <img src="/src/assets/icons/vk-social.png" alt="ВКонтакте" />
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2026 Голос Осетии. Северо-осетинский государственный университет.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: rgba(52, 103, 50, 1); /* Зеленый фон из макета */
  padding: 60px 0 30px 0;
  color: #ffffff;
}

.container {
  max-width: 1320px; /* Стандартная ширина контейнера проекта */
  margin: 0 auto;
  padding: 0 15px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-title {
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 42px; /* По макету */
  margin: 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-links a {
  color: #ffffff;
  text-decoration: none;
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.footer-links a:hover {
  opacity: 1;
}

.app-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.app-link img {
  height: 42px; /* Высота кнопок магазинов по макету */
  width: auto;
}

.social-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.social-link img {
  width: 32px; /* Размер иконок соцсетей */
  height: 32px;
  transition: transform 0.3s;
}

.social-link:hover img {
  transform: scale(1.1);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 20px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  opacity: 0.6;
}
</style>