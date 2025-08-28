<script setup lang="ts">
import { ApiService } from '@/services/api'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref<string | null>(null)

const onLogin = async () => {
  error.value = null
  try {
    await ApiService.login({ email: email.value, password: password.value })
    router.push({ name: 'admin' })
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Login failed'
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 space-y-4">
    <h1 class="text-2xl text-white font-bold">Login</h1>
    <div>
      <label class="block mb-2 text-gray-300">Email</label>
      <InputText v-model="email" class="w-full" />
    </div>
    <div>
      <label class="block mb-2 text-gray-300">Password</label>
      <Password v-model="password" toggleMask :feedback="false" class="w-full" />
    </div>
    <p v-if="error" class="text-red-400">{{ error }}</p>
    <Button label="Login" class="bg-blue-600 border-blue-600" @click="onLogin" />
  </div>
</template>
