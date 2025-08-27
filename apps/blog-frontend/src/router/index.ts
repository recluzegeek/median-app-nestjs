import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('@/views/ArticlesView.vue'),
    },
    {
      path: '/articles/:id',
      name: 'article-detail',
      component: () => import('@/views/ArticleDetailView.vue'),
      props: true,
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('@/views/CoursesView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminDashboard.vue'),
    },
    {
      path: '/admin/articles/new',
      name: 'admin-article-new',
      component: () => import('@/views/admin/AdminArticleForm.vue'),
    },
    {
      path: '/admin/articles/:id/edit',
      name: 'admin-article-edit',
      component: () => import('@/views/admin/AdminArticleForm.vue'),
      props: true,
    },
  ],
})

export default router
