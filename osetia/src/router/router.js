import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProblemThemesView from '../views/ProblemThemesView.vue'
import ResultsView from '../views/ResultsView.vue'
import NewsView from '../views/NewsView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
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
		},
		{
			path: '/register',
			name: 'register',
			component: RegisterView,
		},
	],
})

export default router
