<script setup lang="ts">
import ArticleCard from '@/components/ArticleCard.vue'
import FilterButtons from '@/components/FilterButtons.vue'
import { useArticles } from '@/composables/useArticles'
import { computed, onMounted, ref } from 'vue'

const { articles, loading, error, fetchArticles } = useArticles()
const activeFilter = ref('Most Recent')

const filterOptions = [
  'Most Recent',
  'Testing',
  'Clean Components Toolkit',
  'Reusable Components',
  'Quick Tips',
  'Beginner',
  'Advanced',
  'Common Errors',
]

const handleFilterChange = (filter: string) => {
  activeFilter.value = filter
  // TODO: Implement filter logic
}

onMounted(() => {
  fetchArticles()
})

// Lazy loading with Load More (client-side)
const defaultVisibleCount = 2
const visibleCount = ref(defaultVisibleCount)
const totalRecords = computed(() => articles.value.length)
const visibleArticles = computed(() => articles.value.slice(0, visibleCount.value))
const canLoadMore = computed(() => visibleCount.value < totalRecords.value)
const loadMore = () => {
  visibleCount.value = Math.min(visibleCount.value + defaultVisibleCount, totalRecords.value)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Articles Section -->
    <section class="mb-16">
      <!-- Section Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-white mb-6">Articles</h1>
        <FilterButtons
          :options="filterOptions"
          :active-filter="activeFilter"
          @filter-change="handleFilterChange"
        />
      </div>

      <!-- Articles Grid -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-400 text-lg">{{ error }}</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ArticleCard v-for="article in visibleArticles" :key="article.id" :article="article" />
      </div>

      <!-- Load More Button -->
      <div class="text-center" v-if="canLoadMore">
        <button
          class="px-6 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
          @click="loadMore"
        >
          Load more
        </button>
      </div>
    </section>
  </div>
</template>
