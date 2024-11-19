<script setup lang="ts">
import { reactive } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore'
import { useAuthStore } from '@/stores/AuthStore'
import type { CredentialsModel } from '@/models/CredentialsModel.ts'

const useAuth = useAuthStore()
const sesion = reactive(useAuth)

const useTheme = useThemeStore() 
const theme = reactive(useTheme)

const credentials: CredentialsModel = {
    correo: '',
    contrasenia: ''
}

const reactiveCredentials = reactive(credentials)

sesion.changeCsrfToken()
async function loginWithCredentials() {
    const response = await sesion.login(credentials)
    console.log(response)
}

</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 :class="theme.darkMode ? 'text-blue-100' : 'text-gray-900'" class="text-xl font-bold text-center text-gray-700 mb-6">Iniciar Sesión</h2>
      <form @submit.prevent="loginWithCredentials()">
        <div class="mb-4">
          <label :class="theme.darkMode ? 'text-blue-100' : 'text-gray-900'" for="email" class="block text-gray-600 font-medium mb-1">Correo Electrónico</label>
          <input
            v-model="reactiveCredentials.correo" :class="theme.darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900'" type="email" name="email" id="email" class=" border  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required>/>
        </div>
        <div class="mb-6">
          <label :class="theme.darkMode ? 'text-blue-100' : 'text-gray-900'" for="password" class="block text-gray-600 font-medium mb-1">Contraseña</label>
          <input
            v-model="reactiveCredentials.contrasenia" :class="theme.darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-gray-900'" type="password" name="password" id="password" class=" border  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="••••••••" required>/>
        </div>
        <button type="submit" :class="theme.darkMode ? 'hover:bg-blue-700 focus:ring-blue-800 bg-blue-600' : 'hover:bg-blue-700'" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Iniciar Sesión
        </button>
        <small v-if="sesion.error===''? false:true" class="text-center text-red-500 text-sm">{{ sesion.error }}</small>
      </form>
      <p class="text-center text-sm text-gray-500 mt-4">
        ¿No tienes cuenta? 
        <a href="#" class="text-blue-500 hover:underline">Regístrate aquí</a>
      </p>
    </div>
  </div>
</template>


<style scoped>

</style>