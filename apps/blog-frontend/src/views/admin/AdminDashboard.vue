<script setup lang="ts">
import { useArticles } from '@/composables/useArticles'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { articles, loading, error, fetchArticles, deleteArticle } = useArticles()

const defaultRows = 10
const rows = ref(defaultRows)
const first = ref(0)
const pagedArticles = computed(() => articles.value.slice(first.value, first.value + rows.value))

const onCreate = () => router.push({ name: 'admin-article-new' })
const onEdit = (id: number) => router.push({ name: 'admin-article-edit', params: { id } })
const onDelete = async (id: number) => {
  await deleteArticle(id)
}

onMounted(fetchArticles)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-white">My Articles</h1>
      <Button
        label="Create New"
        icon="pi pi-plus"
        class="bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
        @click="onCreate"
      />
    </div>

    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-400 text-lg">{{ error }}</p>
    </div>

    <DataTable
      :value="pagedArticles"
      dataKey="id"
      tableStyle="min-width: 50rem"
      :pt="{
        root: 'bg-transparent text-white',
        header: 'bg-gray-900 text-gray-200',
        tbody: 'bg-transparent',
      }"
    >
      <Column field="id" header="ID" style="width: 6rem" />
      <Column field="title" header="Title" />
      <Column header="Created">
        <template #body="slotProps">
          {{ new Date(slotProps.data.createdAt).toLocaleDateString() }}
        </template>
      </Column>
      <Column header="Actions" style="width: 16rem">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button
              size="small"
              icon="pi pi-pencil"
              label="Edit"
              class="bg-gray-700 border-gray-700 hover:bg-gray-600"
              @click="onEdit(slotProps.data.id)"
            />
            <Button
              size="small"
              icon="pi pi-trash"
              label="Delete"
              class="bg-red-600 border-red-600 hover:bg-red-700"
              @click="onDelete(slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <div class="text-gray-400 mt-4" v-if="!loading && !error && articles.length === 0">
      No articles yet.
    </div>
  </div>
</template>
