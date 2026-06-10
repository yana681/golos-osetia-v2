import { ref } from "vue";
import { authService } from "../services/auth.services.js";

const user = ref(null);
const isAuthenticated = ref(false);
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
        
        // Сохраняем пользователя в localStorage (опционально)
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    loading.value = true;

    try {
      await authService.logout();
      user.value = null;
      isAuthenticated.value = false;
      localStorage.removeItem('user');
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const checkAuth = async () => {
    loading.value = true;

    try {
      const response = await authService.checkAuth();
      if (response.authenticated) {
        user.value = response.user;
        isAuthenticated.value = true;
      } else {
        user.value = null;
        isAuthenticated.value = false;
      }
    } catch (err) {
      user.value = null;
      isAuthenticated.value = false;
    } finally {
      loading.value = false;
    }
  };

  const loadProfile = async () => {
    try {
      const response = await authService.getProfile();
      if (response.success) {
        user.value = response.user;
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
    loading,
    error,

    // Методы
    register,
    login,
    logout,
    checkAuth,
    loadProfile,
    clearError,
  };
}