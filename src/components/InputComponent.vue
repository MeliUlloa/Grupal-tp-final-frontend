<script setup lang="ts">
import { reactive } from 'vue';
import { useThemeStore } from '@/stores/ThemeStore';
import { useTaskStore } from '@/stores/TaskStore';
import type { Task } from '@/models/TaskModel';
// Iconos
import { XMarkIcon, PlusCircleIcon } from '@heroicons/vue/24/outline';
import { CheckCircleIcon as SolidCircleIcon } from '@heroicons/vue/24/solid';

const themeStore = useThemeStore();
const theme = reactive(themeStore);

const taskStore = useTaskStore();
const tasks = reactive(taskStore);

// Nueva tarea reactiva
const newTask: Task = {
  id: 0,
  tarea: '',
  completada: false,
};
const reactiveTask = reactive(newTask);

// Funciones
function toggleAction() {
  reactiveTask.completada = !reactiveTask.completada;
}

function saveTask() {
  tasks.addTask(reactiveTask);
}
</script>

<template>
  <div :class="theme.darkMode ? 'dark' : ''" class="task-card bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-between mb-4">
    
    <div class="flex items-center space-x-3">
      <div class="relative">
        <input type="checkbox" @click="toggleAction" class="checkbox h-6 w-6 border-2 rounded focus:outline-none cursor-pointer"/>
        <SolidCircleIcon v-if="reactiveTask.completada" @click="toggleAction" class="absolute inset-0 w-6 h-6 text-green-500 pointer-events-none"/>
      </div>

      <input v-model="newTask.tarea" type="text" placeholder="Nueva tarea" :class="theme.darkMode ? 'dark-input' : 'light-input'"
        class="text-lg w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200"/>
    </div>

    <div class="flex items-center space-x-4">
      <button @click="saveTask" class="text-green-500 hover:text-green-700 transition duration-200">
        <PlusCircleIcon class="w-6 h-6" />
      </button>
      <button class="text-red-500 hover:text-red-700 transition duration-200">
        <XMarkIcon class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background-color: #f9fafb;
  transition: background-color 0.3s ease-in-out;
}

.task-card.dark {
  background-color: #1f2937;
}

input[type="text"] {
  font-size: 1rem;
  color: #374151;
}

.dark-input {
  color: #d1d5db;
}

input::placeholder {
  color: #9ca3af;
}

input.dark::placeholder {
  color: #6b7280;
}

.checkbox {
  border-color: #d1d5db;
}

.checkbox:checked {
  background-color: #10b981;
  border-color: #10b981;
}

</style>
