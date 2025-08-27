<script setup lang="ts">
interface Props {
  options: string[]
  activeFilter: string
}

interface Emits {
  (e: 'filterChange', filter: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleFilterClick = (filter: string) => {
  emit('filterChange', filter)
}
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="option in options"
      :key="option"
      @click="handleFilterClick(option)"
      :class="[
        'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
        activeFilter === option
          ? 'bg-blue-600 text-white shadow-lg'
          : 'border border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-500',
      ]"
    >
      {{ option }}
    </button>
  </div>
</template>
