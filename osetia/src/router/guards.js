// src/router/guards.js
export function requireAuth(to, from, next) {
  const user = localStorage.getItem('user');
  
  if (user) {
    next();
  } else {
    next('/login');
  }
}

export function redirectIfAuth(to, from, next) {
  const user = localStorage.getItem('user');
  
  if (user) {
    try {
      const userData = JSON.parse(user);
      // ✅ Если админ - перенаправляем в админ-панель
      if (userData.role === 'admin') {
        next('/admin');
      } else {
        next('/profile');
      }
    } catch (e) {
      next('/profile');
    }
  } else {
    next();
  }
}

// ✅ Проверка на администратора
export function requireAdmin(to, from, next) {
  const user = localStorage.getItem('user');
  
  if (!user) {
    next('/login');
    return;
  }
  
  try {
    const userData = JSON.parse(user);
    
    if (userData.role === 'admin') {
      next();
    } else {
      // Если не админ - перенаправляем на профиль
      next('/profile');
    }
  } catch (e) {
    console.error('Ошибка проверки роли:', e);
    next('/login');
  }
}

// ✅ Новый guard - запрещает доступ админам к странице профиля
export function preventAdminAccess(to, from, next) {
  const user = localStorage.getItem('user');
  
  if (!user) {
    next('/login');
    return;
  }
  
  try {
    const userData = JSON.parse(user);
    
    if (userData.role === 'admin') {
      // Если админ пытается зайти на страницу профиля - перенаправляем в админ-панель
      next('/admin');
    } else {
      next();
    }
  } catch (e) {
    console.error('Ошибка проверки роли:', e);
    next('/login');
  }
}