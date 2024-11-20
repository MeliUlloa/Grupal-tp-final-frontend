<script setup lang="ts">
import { reactive } from 'vue'
import { MoonIcon, SunIcon, LinkIcon } from '@heroicons/vue/24/solid'
import { useThemeStore } from '@/stores/ThemeStore'
import { useAuthStore } from '@/stores/AuthStore'

const useStore = useThemeStore() 
const theme =  reactive(useStore)

const AuthStore = useAuthStore()
const sesion = reactive(AuthStore)

</script>

<template>
  <div v-bind:class="theme.darkMode ? 'dark' : ''" class="wrapper transition ease-linear">

    <div class="btn-wrapper">

      <div class="toggle-btn flex items-center justify-center w-full my-4">
        
        <label for="toggle" class="flex items-center justify-center cursor-pointer">
          <div class="relative">
            <input type="checkbox" id="toggle" class="sr-only" @click="theme.changeTheme"/>
            <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div
              class="dot absolute left-1 top-1 bg-black w-6 h-6 flex items-center justify-center rounded-full transition">
              <!-- usar directiva v-if  para mostrar el icono de luna o sol -->
              <MoonIcon v-if="!theme.darkMode" class="w-4 h-4 text-white" />
              <SunIcon v-if="theme.darkMode" class="w-full h-full text-yellow-500 p-1" />
            </div>
          </div>

          <!-- cambiar el texto segun sea Light o Dark mode -->
          <div v-bind:class="theme.darkMode ? 'dark' : ''" class="label-text ml-2 font-medium">
            {{ theme.text }}
          </div>
        </label>
      </div>
    </div>
    <div v-bind:class="theme.darkMode ? 'dark' : ''" class="img min-h-screen flex flex-col items-center transition"></div>
    <div class="todo flex-1 lg:w-2/3 xl:w-2/5 w-full px-7">
      <RouterView />
    </div>
  </div>
  <div class="w-full py-10 bg-gray-600 text-white">
  <div class="max-w-screen-xl mx-auto text-center">
    <p class="text-lg font-semibold mb-2">Hecho con lagrimas, sudor, sangre y muchas preguntas B ☠️</p>
    <div class="flex justify-center items-center mb-4">
      <span class="text-2xl font-bold">Aedo Maia, Ulloa Melina</span>
    </div>
    <p class="text-sm mb-4">Bringing you quality code with peace of mind.</p>
    <a href="https://github.com/MeliUlloa/Grupal-tp-final-frontend" class="text-sm text-gray-300 hover:text-white transition-colors">
      <LinkIcon class="h-5 w-5 inline-block mr-2"/> GitHub
    </a>
    <p class="text-xs mt-4 text-gray-300">© 2024 chicas super poderosas. All rights reserved.</p>
  </div>
</div>
</template>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
  background: #fff;
}

.wrapper.dark {
  background: #434343;
}

.img {
  background-image: url('https://github.com/cloworm/todo/blob/master/public/images/bg-desktop-light.jpg?raw=true');
  background-position: top;
  background-repeat: no-repeat;
  background-size: contain;
}

.img.dark {
  background: url('https://github.com/cloworm/todo/blob/master/public/images/bg-desktop-dark.jpg?raw=true');
  background-position: top;
  background-repeat: no-repeat;
  background-size: contain;
}

.btn-wrapper {
  position: absolute;
  right: 16px;
}

input:checked~.dot {
  transform: translateX(100%);
  background-color: rgb(77, 148, 255);
}

.label-text {
  color: white;
}

.label-text.dark {
  color: black;
}

.todo {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}
</style>
