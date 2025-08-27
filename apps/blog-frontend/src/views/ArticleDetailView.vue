<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useArticles } from '@/composables/useArticles'

const route = useRoute()
const { article, loading, error, fetchArticleById } = useArticles()

const id = computed(() => Number(route.params.id))

onMounted(() => {
  if (!Number.isNaN(id.value)) {
    fetchArticleById(id.value)
  }
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div v-if="loading" class="flex justify-center items-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="error" class="text-center py-16">
      <p class="text-red-400 text-lg">{{ error }}</p>
    </div>

    <article v-else-if="article" class="space-y-6">
      <header class="space-y-2">
        <h1 class="text-4xl font-bold text-white">{{ article.title }}</h1>
        <p class="text-sm text-gray-400">
          By {{ article.author?.name }} • {{ new Date(article.createdAt).toLocaleDateString() }}
        </p>
      </header>

      <section class="prose prose-invert max-w-none">
        <p class="leading-8 text-gray-200 whitespace-pre-line">{{ article.body }}</p>
      </section>
    </article>

    <div v-else class="text-gray-400">Article not found.</div>
  </div>
</template>

<style scoped>
.prose :where(p):not(:where([class~='not-prose'] *)) {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
