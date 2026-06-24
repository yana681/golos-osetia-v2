import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export function useAuthGuard() {
  const router = useRouter()
  const isAuthenticated = ref(false)
  const user = ref(null)

  const checkAuth = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
        isAuthenticated.value = true
        return true
      } catch (e) {
        console.error('Ошибка парсинга пользователя:', e)
        localStorage.removeItem('user')
        isAuthenticated.value = false
        user.value = null
        return false
      }
    }
    isAuthenticated.value = false
    user.value = null
    return false
  }

  const requireAuth = (redirectTo = '/login') => {
    if (!checkAuth()) {
      router.push(redirectTo)
      return false
    }
    return true
  }

  onMounted(() => {
    checkAuth()
  })

  return {
    isAuthenticated,
    user,
    checkAuth,
    requireAuth
  }
}