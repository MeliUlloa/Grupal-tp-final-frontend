<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore';
import { useAuthStore } from '@/stores/AuthStore';
import type { CredentialsModel } from '@/models/CredentialsModel'

const useTheme = useThemeStore() 
const theme = reactive(useTheme)

const useAuth = useAuthStore()
const sesion = reactive(useAuth)

const newCredentials: CredentialsModel = {
    correo: '',
    contrasenia: ''
}

const repeatPwd: string = ''
const repeatPass = ref(repeatPwd)

const credentials = reactive(newCredentials)

async function logCredentials() {
    if(repeatPass.value === credentials.contrasenia) {
        await sesion.registerUser(credentials)
    }
    else {
        console.error('Las contraseñas no coinciden')
    }
}

</script>
<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 :class="theme.darkMode ? 'text-blue-100' : 'text-gray-900'" class="text-xl font-bold text-center text-gray-700 mb-6">Registrarse</h2>
      <form @submit.prevent="logCredentials">
        <div class="mb-4">
          <label :class="theme.darkMode ? 'text-blue-100' : 'text-gray-900'" for="email" class="block text-gray-600 font-medium mb-1">Correo Electrónico</label>
          <input type="email" id="email"
          v-model="newCredentials.correo" :class="theme.darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900'" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="name@company.com" required />
        </div>
        <div class="mb-4">
          <label for="password" :class="theme.darkMode ? 'text-blue-100' : 'text-gray-900'" class="block text-gray-600 font-medium mb-1">Contraseña</label>
          <input type="password" id="password" v-model="newCredentials.contrasenia" 
          :class="theme.darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900'" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="••••••••" required />
        </div>
        <div class="mb-6">
          <label :class="theme.darkMode ? 'text-blue-100' : 'text-gray-900'" for="confirmPassword" class="block text-gray-600 font-medium mb-1">Confirmar Contraseña</label>
          <input :class="theme.darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900'" type="password" name="confirm-password" id="confirm-password"
            v-model="repeatPass"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="••••••••" required />
        </div>
        <button
          type="submit" :class="theme.darkMode ? 'hover:bg-blue-700 focus:ring-blue-800 bg-blue-600' : 'hover:bg-blue-700'"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Registrarse
        </button>
      </form>
    </div>
  </div>
</template>


<style scoped>

</style>