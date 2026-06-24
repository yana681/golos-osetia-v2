<template>
  <div class="profile-header">
    <div class="left">
      <img
        :src="user?.avatar || 'https://i.pinimg.com/originals/77/98/e1/7798e172c38272ebabe28c6891dccd36.jpg'"
        class="avatar"
      />

      <div class="user-info">
        <span class="badge">Активный житель</span>
        <h1>{{ user?.username || 'Пользователь' }}</h1>
        <p class="email">{{ user?.email || 'example@gmail.com' }}</p>
        
        <div class="meta-info">
          <span>📍 Владикавказ</span>
          <span>🕒 С нами с марта 2023</span>
        </div>
      </div>
    </div>

    <!--<div class="right-buttons">
      <button class="btn-edit">Редактировать профиль</button>
      <button class="btn-settings">⚙️ Настройки</button>
    </div>-->
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    default: () => null
  }
})
</script>

<style scoped>
.profile-header {
  background: #386633;
  border-radius: 30px;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: white;
}

.left {
  display: flex;
  gap: 30px;
  margin-left: 50px;
  align-items: center;
}

.avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.2);
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  align-items: flex-start;
}

.badge {
  display: inline-block;
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 12px;
  font-family: "Montserrat";
  margin-bottom: 2px;
}

.user-info h1 {
  margin: 0 0 3px 0;
  font-size: 46px;
  padding: 6px;
  font-weight: 500;
  font-family: "Podkova";
}

.email {
  margin: 0 0 15px 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  font-family: "Montserrat";
  margin-left: 10px;
}

.meta-info {
  display: flex;
  gap: 20px;
  font-size: 13px;
  font-family:"montserrat";
  color: rgba(255, 255, 255, 0.8);
}
/*
.right-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.right-buttons button {
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
  width: 220px;
  text-align: center;
}

.btn-edit {
  background: white;
  color: #3d5a35;
}

.btn-edit:hover {
  background: #f0f2f0;
}

.btn-settings {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.btn-settings:hover {
  background: rgba(255, 255, 255, 0.2);
}*/
</style>