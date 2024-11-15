<script setup lang="ts">
// importar reactive
// importar themeStore
// importar taskStore
// importar modelo de tarea
import { reactive } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore';
import { useTaskStore} from '@/stores/TaskStore'
import type { Task } from '@/models/TaskModel'

// iconos
import { XMarkIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'  
import { CheckCircleIcon as SolidCircleIcon } from '@heroicons/vue/24/solid'

// definir variable para almacenar useThemeStore
// definir variable reactiva pasando objeto themeStore
const themeStore = useThemeStore()
const theme = reactive(themeStore)

// definir variable para almacenar useTaskStore
// definir variable reactiva pasando objeto tasksStore
const taskStore = useTaskStore()
const tasks = reactive(taskStore)


const newTask: Task = {
  id:  0,
  tarea:  '',
  completada: false
}

const reactiveTask = reactive(newTask)

function makeItComplete(){
  reactiveTask.completada = !reactiveTask.completada
}

function saveTask() {
  tasks.addTask(reactiveTask)
}

</script>

<template>
  <div class="wrapper relative group border-black">
    <div class="absolute top-3 sm:top-4 left-5">
      <div class="relative">
        <input
          type="ckeckbox"
          @click="makeItComplete"
          class="form-checkbox border rounded-full focus:ouline-none h-6 w-6 cursor-pointer transition ease-linear"
        />
        <!-- SI ES TAREA COMPLETA CON V-IF -->
        <SolidCircleIcon @click="makeItComplete" v-if="reactiveTask.completada"class="h-100 w-100 absolute left-0 top-0 text-green-500"/>
      </div>
    </div>

    <!-- input -->
    <form @submit.prevent>

      <!-- input: usar v-bind para definir si es modo oscuro -->
      <input
        v-bind:class="theme.isDark ? 'dark' : ''"
        v-model="newTask.tarea"
        type="text"
        placeholder="Escribe una nueva tarea"
        class="sm:text-base overflow-ellipsis w-full focus:outline-none py-4 sm:py-4.5 pr-8 pl-14 sm:pl-16 cursor-pointer transition ease-linear"
      />

      <!-- div: usar v-bind para definir si es modo oscuro -->
      <div v-bind:class="theme.isDark ? 'dark' : ''" class="btns absolute right-0 top-0 py-2 sm:py-2.5 px-2 w-20 h-14 flex justify-around cursor-default transition ease-linear" >
        <button  class="p-1 cursor-pointer">
          <PlusCircleIcon @click="saveTask" class="w-6 h-6 hover:text-green-600"/>
        </button class="p-1 cursor-pointer">
        <button >
          <XMarkIcon class="w-6 h-6 hover:text-red-500 "/>
        </button> 
      </div>
    </form>
  </div>
</template>

<style scoped>
  input[type="text"] {
    border-radius: 5px;
  }
  .btns {
    background: rgb(190, 190, 190);
    border-radius: 0 5px 5px 0;
  }

  .btns  button:nth-child(1) {
    border-right: 1px solid #434343;
  }

  input.dark {
    background: #434343;
  }

  .btns.dark {
    background: rgb(101, 101, 101);
  }
</style>