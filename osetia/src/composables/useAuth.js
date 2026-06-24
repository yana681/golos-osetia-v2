import { ref } from "vue";
import { authService } from "../services/auth.services.js";

const user = ref(null);
const isAuthenticated = ref(false);
const isAdmin = ref(false);
const loading = ref(false);
const error = ref(null);

export function useAuth() {
  const register = async (userData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await authService.register(userData);
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const login = async (credentials) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await authService.login(credentials);
      if (response.success) {
        user.value = response.user;
        isAuthenticated.value = true;
        
        // Сохраняем пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // ✅ Проверяем, является ли пользователь администратором
        await checkAdminStatus();
      }
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // ✅ Новая функция для проверки статуса администратора
  const checkAdminStatus = async () => {
    try {
      const response = await authService.checkAdminRole();
      if (response.success) {
        isAdmin.value = response.isAdmin;
        // Сохраняем роль в localStorage
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        userData.role = response.role;
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (err) {
      console.error("Ошибка проверки роли:", err);
      isAdmin.value = false;
    }
  };

  const logout = async () => {
    loading.value = true;

    try {
      await authService.logout();
      user.value = null;
      isAuthenticated.value = false;
      isAdmin.value = false;
      localStorage.removeItem('user');
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const checkAuth = async () => {
    // Сначала проверяем localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        user.value = parsedUser;
        isAuthenticated.value = true;
        // Проверяем роль
        if (parsedUser.role === 'admin') {
          isAdmin.value = true;
        } else {
          await checkAdminStatus();
        }
        return;
      } catch (e) {
        localStorage.removeItem('user');
      }
    }

    // Если в localStorage нет, проверяем через API
    loading.value = true;
    try {
      const response = await authService.checkAuth();
      if (response.authenticated) {
        user.value = response.user;
        isAuthenticated.value = true;
        localStorage.setItem('user', JSON.stringify(response.user));
        await checkAdminStatus();
      } else {
        user.value = null;
        isAuthenticated.value = false;
        isAdmin.value = false;
        localStorage.removeItem('user');
      }
    } catch (err) {
      user.value = null;
      isAuthenticated.value = false;
      isAdmin.value = false;
      localStorage.removeItem('user');
    } finally {
      loading.value = false;
    }
  };

  const loadProfile = async () => {
    try {
      const response = await authService.getProfile();
      if (response.success) {
        user.value = response.user;
        localStorage.setItem('user', JSON.stringify(response.user));
        await checkAdminStatus();
      }
    } catch (err) {
      console.error("Failed to load profile:", err);
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    // Состояние
    user,
    isAuthenticated,
    isAdmin,
    loading,
    error,

    // Методы
    register,
    login,
    logout,
    checkAuth,
    checkAdminStatus,
    loadProfile,
    clearError,
  };
}