<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useThemeStore } from '@/stores/ThemeStore';

import RegisterComponent from '@/components/auth/RegisterComponent.vue';
import LoginComponent from '@/components/auth/LoginComponent.vue';

const router = useRouter();
const themeStore = useThemeStore();
const theme = reactive(themeStore);

const formState = reactive({
  isLogin: true, // Controla si estamos en Login o Registro
});

// Maneja el submit del formulario
function handleSubmit() {
  if (formState.isLogin) {
    // Simula inicio de sesión exitoso
    alert('Inicio de sesión exitoso');
    router.push('/tasks'); // Redirige a la vista Tasks
  } else {
    alert('Registro enviado');
  }
}

// Método para alternar entre Login y Registro
function toggleForm(isLogin: boolean) {
  formState.isLogin = isLogin;
}
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center">
    <div :class="theme.darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'"
         class="w-full h-full rounded-lg p-6">
      <!-- Tabs -->
      <div class="flex justify-between">
        <button
          @click="toggleForm(true)"
          :class="formState.isLogin
            ? 'text-blue-500 border-b-2 border-blue-500'
            : 'text-gray-500 hover:text-blue-500'"
          class="w-1/2 text-center py-2 font-semibold transition">
          Ingreso
        </button>
        <button
          @click="toggleForm(false)"
          :class="!formState.isLogin
            ? 'text-blue-500 border-b-2 border-blue-500'
            : 'text-gray-500 hover:text-blue-500'"
          class="w-1/2 text-center py-2 font-semibold transition">
          Registro
        </button>
      </div>

      <!-- Content -->
      <div class="w-full h-full">
        <component
          :is="formState.isLogin ? LoginComponent : RegisterComponent"
          @submit="handleSubmit"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
