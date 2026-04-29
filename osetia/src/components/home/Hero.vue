<template>
  <section class="hero">
    <div class="container">
      <div class="hero-card">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="title-bold">Голос Осетии -</span>
            <span class="title-regular">платформа для помощи <br>городу</span>
          </h1>
        </div>
        <div class="hero-image">
          <img src="/src/assets/hero.png" alt="Hero Image" />
        </div>
      </div>

      <div class="hero-footer">
        <div class="footer-left">
          <p class="hero-description">
            Вы сообщаете о проблемах, мы разбираемся и придаем огласке. Вместе делаем город лучше!
          </p>
          <button class="cta-button">Сообщить о проблеме</button>
        </div>

        <div class="stats">
          <div class="stat-item">
            <img src="/src/assets/icons/check.png" alt="" class="stat-icon" />
            <div class="stat-info">
              <span class="stat-value">182</span>
              <span class="stat-label">проблем решено</span>
            </div>
          </div>
          <div class="stat-item">
            <img src="/src/assets/user.png" alt="" class="stat-icon" />
            <div class="stat-info">
              <span class="stat-value">100</span>
              <span class="stat-label">зарегистрировано пользователей</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 40px 0;
  background-color: #efe3d6;
  overflow-x: hidden;
}

.container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 15px;
}

.hero-card {
  display: flex;
  background-color: #386633;
  border-radius: 211px;
  overflow: hidden;
  height: 398px;
  margin-bottom: 40px;
  position: relative;
}

.hero-content {
  flex: 1.2;
  display: flex;
  align-items: center;
  padding-left: 80px;
  color: #fff;
  z-index: 2;
}

.hero-title {
  line-height: 110%;
  max-width: 550px;
}

.title-bold {
  display: block;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 64px;
}

.title-regular {
  display: block;
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  font-size: 36px;
  margin-top: 10px;
}

.hero-image {
  flex: 1;
  display: flex;
  width: 716px;
  position: absolute;
  right: 0;
  /* Начальная позиция - слева (за пределами видимости) */
  transform: translateX(-100%);
  opacity: 0;
  /* Анимация перемещения */
  animation: slideFromLeftToRight 0.8s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

@keyframes slideFromLeftToRight {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.hero-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 40px;
}

.footer-left {
  max-width: 600px;
}

.hero-description {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 500;
  color: #000;
  line-height: 120%;
  margin-bottom: 30px;
}

.cta-button {
  background-color: #825940;
  color: #fff;
  border: none;
  padding: 18px 45px;
  border-radius: 50px;
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.cta-button:hover {
  transform: scale(1.05);
}

.stat-value {
  display: block;
  font-family: 'Roboto', sans-serif;
  font-size: 48px;
  font-weight: 900;
  color: rgba(130, 89, 64, 1);
  line-height: 52px;
}

.stat-label {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  color: #2c1a11;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  opacity: 0;
  transform: translateX(30px);
  animation: fadeInRight 0.6s ease-out forwards;
}

.stat-item:nth-child(1) {
  animation-delay: 0.3s;
}

.stat-item:nth-child(2) {
  animation-delay: 0.5s;
}

@keyframes fadeInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.stat-icon {
  width: 35px;
  height: auto;
}
</style>