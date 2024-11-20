<script setup lang="ts">
import { reactive } from 'vue';
import { useThemeStore } from '@/stores/ThemeStore';
import { useTaskStore } from '@/stores/TaskStore';
// Iconos
import { TrashIcon } from '@heroicons/vue/24/outline';
import { CheckCircleIcon as CompletedIcon } from '@heroicons/vue/24/solid';
import SpinnerComponent from '@/components/SpinnerComponent.vue';

const themeStore = useThemeStore();
const theme = reactive(themeStore);

const taskStore = useTaskStore();
const tasks = reactive(taskStore);
tasks.getAllTasks();
</script>

<template>
  <div :class="theme.darkMode ? 'dark' : ''" class="task-list bg-gray-200 rounded-lg p-6 shadow-lg transition-colors duration-300">
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Tareas</h1>
      <SpinnerComponent v-show="tasks.loading" />
    </header>
    <div v-for="task in tasks.data" :key="task.id" class="task-item bg-white dark:bg-gray-700 rounded-lg shadow p-4 mb-4 flex justify-between items-center">
      <div class="flex items-center">
        <div class="relative mr-4">
          <input type="checkbox" @click="tasks.changeStatus(task)" class="w-6 h-6 border rounded focus:outline-none cursor-pointer" />
          <CompletedIcon v-if="task.completada" class="absolute inset-0 w-6 h-6 text-green-500 pointer-events-none"
          />
        </div>
        <input type="text" v-model="task.tarea" disabled class="bg-transparent text-lg dark:text-gray-200 border-none focus:outline-none cursor-default w-full"/>
      </div>
      <div class="flex items-center space-x-4">
        <span :class="task.completada ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'" class="badge px-3 py-1 rounded-full text-sm font-medium">
          {{ task.completada ? 'Completa' : 'Pendiente' }}
        </span>
        <button @click="tasks.removeTask(task)" class="text-red-500 hover:text-red-700">
          <TrashIcon class="w-6 h-6" />
        </button>
      </div>
    </div>
    <footer class="flex justify-center space-x-4 mt-6">
      <button @click="tasks.showAll" class="btn-filter">
        Todas
      </button>
      <button @click="tasks.showCompleted" class="btn-filter">
        Completas
      </button>
      <button @click="tasks.showPending" class="btn-filter">
        Pendientes
      </button>
    </footer>
  </div>
</template>

<style scoped>
.task-list {
  background-color: #f9fafb;
}

.task-list.dark {
  background-color: #1f2937;
}

.task-item {
  border-left: 4px solid transparent;
}

.task-item:hover {
  border-left-color: #3b82f6;
}

.task-item.dark {
  background-color: #374151;
}

.badge {
  transition: background-color 0.3s, color 0.3s;
}

.btn-filter {
  background-color: #e5e7eb;
  color: #374151;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.btn-filter:hover {
  background-color: #3b82f6;
  color: #ffffff;
}
</style>
