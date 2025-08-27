import { ApiService } from '@/services/api'
import { ref } from 'vue'

export interface Article {
  id: number
  title: string
  body: string
  description: string
  createdAt: string
  authorId: number
  author?: {
    id: number
    name: string
    email: string
  }
}

export function useArticles() {
  const articles = ref<Article[]>([])
  const article = ref<Article | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchArticles = async () => {
    loading.value = true
    error.value = null

    try {
      // Try to fetch from API first, fallback to mock data
      const response = await ApiService.getArticles()
      articles.value = response.data
    } catch (apiError) {
      console.warn('API not available, using mock data:', apiError)

      // Fallback to mock data
      const mockArticles: Article[] = [
        {
          id: 1,
          title: 'The Difference Between a Post Flush Watcher and nextTick in Vue',
          body: 'Understanding the nuances between post flush watchers and nextTick in Vue.js...',
          description:
            'Learn the key differences between post flush watchers and nextTick, and when to use each in your Vue applications.',
          createdAt: '2025-08-01T00:00:00Z',
          authorId: 1,
          author: {
            id: 1,
            name: 'Michael Thiessen',
            email: 'michael@example.com',
          },
        },
        {
          id: 2,
          title: 'Bulletproof Watchers in Vue',
          body: 'Creating robust and reliable watchers in Vue.js applications...',
          description:
            "Discover best practices for creating watchers that won't break your Vue application.",
          createdAt: '2025-08-01T00:00:00Z',
          authorId: 1,
          author: {
            id: 1,
            name: 'Michael Thiessen',
            email: 'michael@example.com',
          },
        },
        {
          id: 3,
          title: 'How to access DOM elements with useTemplateRef',
          body: 'Using template refs to access DOM elements in Vue 3 Composition API...',
          description: 'Master the useTemplateRef composable for direct DOM manipulation in Vue 3.',
          createdAt: '2025-05-01T00:00:00Z',
          authorId: 1,
          author: {
            id: 1,
            name: 'Michael Thiessen',
            email: 'michael@example.com',
          },
        },
        {
          id: 4,
          title: 'Scaling Your Vue App: 4 Proven Patterns to Keep It Clean',
          body: 'Architectural patterns for maintaining clean and scalable Vue.js applications...',
          description:
            'Explore four proven patterns that will help you scale your Vue application while keeping it maintainable.',
          createdAt: '2024-12-01T00:00:00Z',
          authorId: 1,
          author: {
            id: 1,
            name: 'Michael Thiessen',
            email: 'michael@example.com',
          },
        },
        {
          id: 5,
          title: 'What are Effect Scopes in Vue?',
          body: "Understanding effect scopes and their role in Vue 3's reactivity system...",
          description:
            'Deep dive into effect scopes and how they help manage reactive effects in Vue 3.',
          createdAt: '2025-08-01T00:00:00Z',
          authorId: 1,
          author: {
            id: 1,
            name: 'Michael Thiessen',
            email: 'michael@example.com',
          },
        },
        {
          id: 6,
          title: 'Junior vs Senior: Building Modals in Vue',
          body: 'Comparing different approaches to building modal components in Vue...',
          description:
            'See how junior and senior developers approach building modal components differently.',
          createdAt: '2025-06-01T00:00:00Z',
          authorId: 1,
          author: {
            id: 1,
            name: 'Michael Thiessen',
            email: 'michael@example.com',
          },
        },
        {
          id: 7,
          title: '13 Vue Composables Tips That Make Your Code Better',
          body: 'Essential tips for writing better composables in Vue 3...',
          description:
            'Learn 13 practical tips that will improve your Vue composables and make your code more maintainable.',
          createdAt: '2025-01-01T00:00:00Z',
          authorId: 1,
          author: {
            id: 1,
            name: 'Michael Thiessen',
            email: 'michael@example.com',
          },
        },
        {
          id: 8,
          title: 'Composable Design Patterns in Vue',
          body: 'Design patterns for creating reusable and maintainable composables...',
          description:
            'Explore design patterns that will help you create better composables in Vue applications.',
          createdAt: '2024-12-01T00:00:00Z',
          authorId: 1,
          author: {
            id: 1,
            name: 'Michael Thiessen',
            email: 'michael@example.com',
          },
        },
      ]

      articles.value = mockArticles
    } finally {
      loading.value = false
    }
  }

  const fetchArticleById = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await ApiService.getArticle(id)
      article.value = response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch article'
    } finally {
      loading.value = false
    }
  }

  const createArticle = async (articleData: Omit<Article, 'id' | 'createdAt'>) => {
    try {
      const response = await ApiService.createArticle(articleData)
      articles.value.unshift(response.data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create article'
    }
  }

  const updateArticle = async (id: number, articleData: Partial<Article>) => {
    try {
      const response = await ApiService.updateArticle(id, articleData)
      const index = articles.value.findIndex((article) => article.id === id)
      if (index !== -1) {
        articles.value[index] = response.data
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update article'
    }
  }

  const deleteArticle = async (id: number) => {
    try {
      await ApiService.deleteArticle(id)
      articles.value = articles.value.filter((article) => article.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete article'
    }
  }

  return {
    articles,
    article,
    loading,
    error,
    fetchArticles,
    fetchArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
  }
}
