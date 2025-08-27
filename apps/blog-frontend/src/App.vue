<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Decorative shapes -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <!-- Top left teal crescent -->
      <div
        class="absolute -top-20 -left-20 w-40 h-40 bg-teal-400 rounded-full opacity-20 blur-xl"
      ></div>
      <!-- Top left yellow diamond -->
      <div
        class="absolute top-10 left-10 w-8 h-8 bg-yellow-300 transform rotate-45 opacity-30"
      ></div>
      <!-- Top right blue shape -->
      <div
        class="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full opacity-15 blur-lg"
      ></div>
    </div>

    <!-- Main content -->
    <div class="relative z-10">
      <AppNavbar />
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
