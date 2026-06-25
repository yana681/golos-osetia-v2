import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProblemThemesView from '../views/ProblemThemesView.vue'
import ResultsView from '../views/ResultsView.vue'
import NewsView from '../views/NewsView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ReportProblemView from '../views/ReportProblemView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import AdminView from '../views/AdminView.vue'

import { requireAuth, redirectIfAuth, requireAdmin, preventAdminAccess, requireAuthForReport } from './guards.js'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/profile',
			name: 'profile',
			component: UserProfileView,
			beforeEnter: [requireAuth, preventAdminAccess],
		},
		{
			path: '/admin',
			name: 'admin',
			component: AdminView,
			beforeEnter: requireAdmin,
		},
		{
			path: '/report-problem',
			name: 'report-problem',
			component: ReportProblemView,
			beforeEnter: requireAuthForReport, // ✅ Проверка авторизации для подачи заявки
		},
		{
			path: '/themes',
			name: 'themes',
			component: ProblemThemesView,
		},
		{
			path: '/results',
			name: 'results',
			component: ResultsView,
		},
		{
			path: '/news',
			name: 'news',
			component: NewsView,
		},
		{
			path: '/about',
			name: 'about',
			component: AboutView,
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView,
			beforeEnter: redirectIfAuth,
		},
		{
			path: '/register',
			name: 'register',
			component: RegisterView,
			beforeEnter: redirectIfAuth,
		},
		{
			path: '/results',
			name: 'results',
			component: ResultsView,
		},
	],
})

export default router