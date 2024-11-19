import { defineStore } from 'pinia'
import router from '@/router'; //router porque al iniciar redirige a tasks
// Modelos
import type { SesionStateModel } from '@/models/SesionStateModel';
import type { CredentialsModel } from "@/models/CredentialsModel";
// Índice de metodos CRUD
import { API } from '@/services/index'
import { apiInstance } from "@/services/api";

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): SesionStateModel => ({
        // Valores comienzan vacíos
        loading: false,
        data: {
            user: undefined,
            csrfToken: undefined,
            jwtExpires: undefined
        },
        error: ''
    }),
    actions: {
        /**
         * @description changeCsrfToken cambia en nuestro estado el token crsf
         * headers obtiene headers de la instancia axios
         * this.data!.crsfToken parsea el token a string y actualiza estado
         */
        changeCsrfToken() {
            const headers = apiInstance.defaults.headers;
            this.data!.csrfToken = headers["csrf-token"]?.toString();
            console.info('[Sesion Store 🔑] CSRF Token Actualizado'); // Noficamos por consola
        },

        /**
         * @description registerUser fn async(debe esperar resp de API) para registrar nuevo user
         * this.login(userData) corremos metodo login para loggearlo directamente
         * En caso de error muestra mensaje y actualiza estado
         */
        async registerUser(userData: CredentialsModel) {
            this.loading = true;
            try {
                const response = await API.CreateUser(userData)

                if (response.status === 201) {
                    this.data!.user = userData // si la respuesta es exitosa, actualizamos el estado con el usuario
                    console.info('[AUTH-API 🔑] Usuario Creado, codigo de respuesta: ' + response.status)
                    this.login(userData)
                    this.loading = false
                }
            } catch (e) {
                console.error('[AUTH-API 🔑] Error al registrar usuario', e)
                this.error = e!.toString()
            }
        },

        /**
         * @description accion async para loggear user
         * currentEpochTime obtiene la fecha actual
         * Establecemos exp en tres minutos y actualizamos el estado
         */
        async login(userData: CredentialsModel) {
            this.loading = true;
            try {
                const response = await API.Login(userData)
                if (response.status === 200) {
                    this.data!.user = userData // Si la respuesta es exitosa, actualizamos el estado con el usuario
                    const currentEpochTime = Math.floor(Date.now() / 1000)
                    this.data!.jwtExpires = currentEpochTime + 3 * 60
                    console.info('[AUTH-API 🔑] Usuario Logeado, codigo de respuesta: ' + response.status)
                    console.info('[Sesion Store 🔑] Ruteando a Tareas')
                    this.renewToken() // Renovamos token c/ tres minutos
                    this.loading = false
                    router.push('/tasks') // Redirige
                }
            } catch (e) {
                this.loading = false
                console.error('[AUTH-API 🔑] Error al loggear al usuario', e)
                this.error = e!.toString()
            }
        },

        /**
         * @description renewToken ayuda a renovar token c/ 3 min
         */
        renewToken() {
            console.info('[Sesion Store 🔑] Renovando el token en 3 min')
            setTimeout(async () => {
                try {
                    const response = await API.Login({ correo: this.data!.user!.correo, contrasenia: this.data!.user!.contrasenia }) // Si el user es correcto
                    if (response.status === 200) {
                        const currentEpochTime = Math.floor(Date.now() / 1000) // obtenemos la fecha actual
                        this.data!.jwtExpires = currentEpochTime + 3 * 60
                        console.info('[AUTH-API 🔑] Token Renovado')
                    }
                } catch (e) {
                    console.error('[AUTH-API 🔑] Error al obtener el token', e)
                    this.error = e!.toString()
                }
            }, 3 * 60 * 1000)

            setTimeout(() => this.renewToken(), 3 * 60 * 1000)
        },

        /**
         * @description logout fn para cerrar sesión
         */
        async logout() {
            this.loading = true
            this.data!.user = undefined
            this.data!.jwtExpires = undefined
            try {
                const response = await API.Logout()
                if (response.status === 200) {
                    console.info('[AUTH-API 🔑] Usuario Desconectado, codigo de respuesta: ' + response.status)
                    this.loading = false
                    router.push('/')
                }
            } catch (e) {
                // si tenemos errores los manejamos por consola y actualizamos nuestro estado con el error
                console.error('[AUTH-API 🔑] Error al desconectar el usuario', e)
                this.loading = false
                this.error = e!.toString()
            }
        }
    }
})
