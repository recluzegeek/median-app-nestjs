<script setup lang="ts">
import { useArticles, type Article } from '@/composables/useArticles'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isEdit = ref(Boolean(route.params.id))
const { article, fetchArticleById, createArticle, updateArticle } = useArticles()

const form = ref<Partial<Article>>({
  title: '',
  description: '',
  body: '',
})

onMounted(async () => {
  if (isEdit.value) {
    await fetchArticleById(Number(route.params.id))
    if (article.value) {
      form.value = {
        title: article.value.title,
        description: article.value.description,
        body: article.value.body,
      }
    }
  }
})

const onSubmit = async () => {
  if (isEdit.value && route.params.id) {
    await updateArticle(Number(route.params.id), form.value)
  } else {
    await createArticle(form.value as Omit<Article, 'id' | 'createdAt'>)
  }
  router.push({ name: 'admin' })
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-white mb-6">
      {{ isEdit ? 'Edit Article' : 'New Article' }}
    </h1>

    <div class="space-y-6">
      <div>
        <label class="block mb-2 text-gray-300">Title</label>
        <InputText
          v-model="form.title"
          class="w-full"
          :pt="{
            root: 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500',
          }"
        />
      </div>
      <div>
        <label class="block mb-2 text-gray-300">Description</label>
        <Textarea
          v-model="form.description"
          rows="3"
          class="w-full"
          :pt="{
            root: 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500',
          }"
        />
      </div>
      <div>
        <label class="block mb-2 text-gray-300">Body</label>
        <Textarea
          v-model="form.body"
          rows="10"
          class="w-full"
          :pt="{
            root: 'bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500',
          }"
        />
      </div>

      <div class="flex gap-3">
        <Button
          :label="isEdit ? 'Update' : 'Create'"
          class="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
          @click="onSubmit"
        />
        <Button
          label="Cancel"
          class="bg-gray-700 border-gray-700 hover:bg-gray-600"
          @click="$router.back()"
        />
      </div>
    </div>
  </div>
</template>
