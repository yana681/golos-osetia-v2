const API_BASE_URL = "/api"
const defaultOptions = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Ошибка сервера");
  return data;
}

export const authService = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/register.php`, {
      ...defaultOptions,
      method: "POST",
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login.php`, {
      ...defaultOptions,
      method: "POST",
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/logout.php`, {
      ...defaultOptions,
      method: "POST",
    });
    return handleResponse(response);
  },

  checkAuth: async () => {
    const response = await fetch(`${API_BASE_URL}/check-auth.php`, {
      ...defaultOptions,
      method: "GET",
    });
    return handleResponse(response);
  },

  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/profile.php`, {
      ...defaultOptions,
      method: "GET",
    });
    return handleResponse(response);
  },

  // ✅ Новая функция для проверки роли пользователя
  checkAdminRole: async () => {
    const response = await fetch(`${API_BASE_URL}/check-admin.php`, {
      ...defaultOptions,
      method: "GET",
    });
    return handleResponse(response);
  },
};