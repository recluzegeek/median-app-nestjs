<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Articles', path: '/articles' },
  { name: 'Courses', path: '/courses' },
]

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <nav class="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Author name -->
        <div class="flex-shrink-0">
          <router-link to="/" class="text-xl font-semibold text-white">
            Muhammad Salman
          </router-link>
        </div>
        <!-- Navigation links -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <router-link
              v-for="item in navItems"
              :key="item.name"
              :to="item.path"
              :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                isActive(item.path)
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800',
              ]"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            type="button"
            class="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium"
          >
            <span class="sr-only">Open main menu</span>
            <i class="pi pi-bars"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
