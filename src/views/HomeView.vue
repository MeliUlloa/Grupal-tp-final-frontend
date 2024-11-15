<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue'
import TodoListComponent from '@/components/TodoListComponent.vue'
</script>

<template>
  <div>
    <div>
      <p
        class="text-3xl lg:text-4xl text-white font-bold tracking-widest pt-10 sm:pt-16 lg:pt-24 pb-6 lg:pb-10"
      >
        Tareas
      </p>
    </div>
    <InputComponent />
    <TodoListComponent/>
  </div>
  
</template>
