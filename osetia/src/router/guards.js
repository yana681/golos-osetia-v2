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
      next('/profile');
    }
  } catch (e) {
    console.error('Ошибка проверки роли:', e);
    next('/login');
  }
}

export function preventAdminAccess(to, from, next) {
  const user = localStorage.getItem('user');
  
  if (!user) {
    next('/login');
    return;
  }
  
  try {
    const userData = JSON.parse(user);
    
    if (userData.role === 'admin') {
      next('/admin');
    } else {
      next();
    }
  } catch (e) {
    console.error('Ошибка проверки роли:', e);
    next('/login');
  }
}