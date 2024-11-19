<script >
export default {
    data() {
        return {
            email: "",
            password: "",
            isLogin: true, // Controla si estamos en el formulario de login (true) o registro (false)
            name: "", // Usado solo en el formulario de registro
            confirmPassword: "", // Usado solo en el formulario de registro
        };
    },
    methods: {
       // Maneja el submit del formulario
       handleSubmit() {
            console.log("Correo:", this.email);
            console.log("Contraseña:", this.password);

            // Si estamos en login, simplemente muestra un alert
            if (this.isLogin) {
                alert("Inicio de sesión enviado");
            } else {
                // Si estamos en registro, muestra un alert para registro
                alert("Registro enviado");
            }
        },
    
    // Método para alternar entre login y registro
        toggleForm() {
            this.isLogin = !this.isLogin; // Cambia el estado entre login y registro
        }
    },
    
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center ">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-700 mb-6">
        {{ isLogin ? "Iniciar Sesión" : "Registro" }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <!-- Campo de Nombre (solo en Registro) -->
        <div v-if="!isLogin" class="mb-4">
          <label for="name" class="block text-gray-600 font-medium mb-1">Nombre</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingresa tu nombre"
            required
          />
        </div>

        <!-- Campo de Correo Electrónico -->
        <div class="mb-4">
          <label for="email" class="block text-gray-600 font-medium mb-1">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingresa tu correo"
            required
          />
        </div>

        <!-- Campo de Contraseña -->
        <div class="mb-4">
          <label for="password" class="block text-gray-600 font-medium mb-1">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        <!-- Campo de Confirmar Contraseña (solo en Registro) -->
        <div v-if="!isLogin" class="mb-6">
          <label for="confirmPassword" class="block text-gray-600 font-medium mb-1">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Confirma tu contraseña"
            required
          />
        </div>

        <!-- Botón de Enviar -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {{ isLogin ? "Iniciar Sesión" : "Registrarse" }}
        </button>
      </form>

      <!-- Alternar entre Login y Registro -->
      <p class="text-center text-sm text-gray-500 mt-4">
        {{ isLogin ? "¿No tienes cuenta?" : "¿Ya tienes una cuenta?" }}
        <button
          @click="toggleForm"
          class="text-blue-500 hover:underline ml-1"
        >
          {{ isLogin ? "Regístrate aquí" : "Inicia sesión aquí" }}
        </button>
      </p>
    </div>
  </div>
</template>


<style scoped></style>