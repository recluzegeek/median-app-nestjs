<script setup lang="ts">
import { ApiService } from '@/services/api'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const error = ref<string | null>(null)

const onSignup = async () => {
  error.value = null
  try {
    await ApiService.register({
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value,
    })
    router.push({ name: 'login' })
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Signup failed'
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 space-y-4">
    <h1 class="text-2xl text-white font-bold">Sign up</h1>
    <div>
      <label class="block mb-2 text-gray-300">Name</label>
      <InputText v-model="name" class="w-full" />
    </div>
    <div>
      <label class="block mb-2 text-gray-300">Username</label>
      <InputText v-model="username" class="w-full" />
    </div>
    <div>
      <label class="block mb-2 text-gray-300">Email</label>
      <InputText v-model="email" class="w-full" />
    </div>
    <div>
      <label class="block mb-2 text-gray-300">Password</label>
      <Password v-model="password" toggleMask :feedback="false" class="w-full" />
    </div>
    <p v-if="error" class="text-red-400">{{ error }}</p>
    <Button label="Create account" class="bg-blue-600 border-blue-600" @click="onSignup" />
  </div>
</template>
