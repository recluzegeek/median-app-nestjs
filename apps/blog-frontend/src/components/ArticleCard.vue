<script setup lang="ts">
import type { Article } from '@/composables/useArticles'

interface Props {
  article: Article
}

defineProps<Props>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
  }
  return date.toLocaleDateString('en-US', options)
}
</script>

<template>
  <article
    class="group cursor-pointer"
    @click="$router.push({ name: 'article-detail', params: { id: article.id } })"
  >
    <div class="space-y-3">
      <!-- Article Title -->
      <h3
        class="text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2"
      >
        {{ article.title }}
      </h3>

      <!-- Publication Date -->
      <p class="text-sm text-gray-400">
        {{ formatDate(article.createdAt) }}
      </p>

      <!-- Article Descrption -->
      <p class="text-gray-300 leading-relaxed line-clamp-3">
        {{ article.description }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
