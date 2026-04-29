<template>
  <div class="news-page">
    <div class="container">
      <div class="news-controls">
        <h1 class="news-title">Новости</h1>
        
        <div class="search-wrap">
          <img src="/src/assets/icons/search-header.png" alt="search" class="search-icon" />
          <input type="text" placeholder="Поиск новости" class="search-input" />
        </div>
      </div>

      <div class="news-grid">
        <div v-for="n in 6" :key="n" class="news-card">
          <div class="card-image-wrap">
            <img src="/src/assets/prospect.png" alt="prospect" class="card-img" />
            <button class="save-btn">
              <img src="/src/assets/icons/save-header.png" alt="save" class="save-icon" />
            </button>
          </div>

          <div class="card-content">
            <span class="publish-date">Опубликовано 16.03.2026</span>
            <h3 class="card-headline">
              Перекрытие движения во Владикавказе 29 марта: ограничения на проспекте Мира и улице Джанаева
            </h3>
            
            <div class="card-footer">
              <button class="read-more">Читать полностью</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-page {
  background-color: #efe3d6;
  min-height: 100vh;
  padding-bottom: 100px;
}

.container {
  max-width: 1330px;
  margin: 0 auto;
  padding: 0 20px;
}

.news-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
}

.news-title {
  width: 141px;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 32px;
  color: #000;
}

.search-wrap {
  width: 1042.5px;
  height: 50px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 12px;
}

.search-input {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-family: 'Playfair Display', serif;
  font-size: 18px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.news-card {
  width: 427.33px;
  height: 480px; 
  background: #FFFFFF;
  border: 1px solid rgba(85, 102, 187, 1);
  border-radius: 10px; 
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
}

.news-card:hover {
  transform: translateY(-5px);
}

.card-image-wrap {
  position: relative;
  width: 100%;
  height: 230px;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.save-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.save-icon {
  width: 14px;
  height: 18px;
}

.card-content {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.publish-date {
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  color: #9396A3;
  margin-bottom: 10px;
}

.card-headline {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.3;
  color: #1a1a1a; 
  margin-bottom: 15px;
}

.card-footer {
  margin-top: auto;
  border-top: 1px solid rgba(85, 102, 187, 0.1);
  padding-top: 15px;
  display: flex;
  justify-content: flex-end;
}

.read-more {
  background: none;
  border: none;
  color: rgba(85, 102, 187, 1);
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  padding: 5px 0;
  transition: opacity 0.2s;
}

.read-more:hover {
  text-decoration: underline;
  opacity: 0.8;
}
</style>