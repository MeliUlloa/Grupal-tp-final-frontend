import { defineStore } from "pinia";
// Modelos de tareas
import type { Task, TaskState } from "@/models/TaskModel";
// Modelo de tareas para la API
import type { CreateTask } from "@/models/TaskRequestModel";
import { API } from "@/services";

interface TaskFilterState extends TaskState {
    completed: Task[],
    pending: Task[],
    all: Task[]
}

export const useTaskStore = defineStore({
    id: 'id',
    state: (): TaskFilterState  => ({
        loading: false,
        data: [],
        all: [],
        completed: [],
        pending: [],
    }),
    actions: {
        // Acción para agregar tareas
        async addTask(task: Task) {
            this.loading = true;
            console.info('[Task Store 💾] Intentando crear una nueva tarea')
            try {
                // Creamos una tarea que siga el modelo para agregar tareas al servidor
                let apiTask: CreateTask = { title: task.tarea, description: task.completada? 'Completada' : 'Incompleta'};
                const response = await API.createTask(apiTask);
                if( response.status === 201 ) {
                    // Asignamos id que nos devuelve el server
                    let tId: number = response.data.id!
                    // Creamos una tarea que siga el modelo para agregar tareas al State
                    let newTask: Task =  { ...task, id: tId };
                    this.data.push(newTask); // Agregamos tarea al estado
                    console.info('[API 🌐] Nueva tarea agregada');
                    this.all.push(newTask); // Agregamos tarea a lista
                    await this.getAllTasks(); // Refrescamos todas las tareas
                }
            }catch (e){
                console.error('[API 🌐] Error creando la tarea', e);
                this.loading = false;
            }
        },

         // Acción para obtener todas las tareas
         async getAllTasks() {
            // Loading se muestra sólo al cargar
            if(this.loading === false) {
                this.loading = true;
            }
            console.info('[Task Store 💾] Intentando obtener todas las tareas')
            try { 
                // Llamada API
                const response = await API.getTasks();
                if( response.status === 200 ) {
                    // Para cada elemento de la data de la respuesta crea tarea sigueindo modelo de estado
                    response.data.forEach( task => {
                        const retrievedTask: Task = {
                            id: task.id!,
                            tarea: task.title!,
                            completada: task.description === 'Completada'? true : false
                        } 
                        this.data.push(retrievedTask) // Agrega tarea al estado
                        this.all.push(retrievedTask); // Agrega la tarea a lista
                    });
                    // Filtra las tareas repetidas para que sólo se muestren 1 vez
                    const uniqueTasks = this.all.filter((task, index, self) => self.findIndex(t => t.id === task.id) === index);
                    this.data = uniqueTasks
                    this.all = uniqueTasks
                    // Filtra completadas y pendientes para mostrarlas en cada sección
                    this.completed = uniqueTasks.filter(task => task.completada);
                    this.pending = uniqueTasks.filter(task => !task.completada);
                    console.info('[API 🌐] Se obtuviveron y organizaron todas las tareas');
                    this.loading = false;
                }
            } catch (e) {
                console.error('[API 🌐] Error Obteniendo las tarea', e);
                this.loading = false;
            }
        },

        // Acción para eliminar tarea
        async removeTask(task: Task) {
            this.loading = true;
            console.info('[Tasks Store 💾] Intentando eliminar la tarea', task)
            try {
                // Llama a la API pasando id de la tarea
                const response = await API.deleteTask(task.id!);
                if(response.status === 200) {
                    console.info('[API 🌐] Tarea eliminada con exito')
                }
            } catch (e) {
                console.error('[API 🌐] Error eliminando la tarea', e);
                this.loading = false;
            }
            this.data = this.data.filter(t => t.id !== task.id) // Eliminamos la tarea
            this.all = this.all.filter(t => t.id !== task.id) // Eliminamos la tarea de la lista
            await this.getAllTasks() // Y refrescamos
        },

        // Acción para cambiar estado (completada--pendiente)
        async changeStatus(task: Task) {
            this.loading = true;
            // Busca id de la tarea y cambia el estado
            const index = this.data.findIndex((item) => item.id === task.id);
            this.data[index].completada = !this.data[index].completada;
            // Creamos objeto de tarea según modelo
            const apiToBeUpdateTask: CreateTask = {
                title: this.data[index].tarea,
                description: this.data[index].completada? 'Completada' : 'Incompleta'
            }
            console.info('[Tasks Store 💾] Intentando actualizar la tarea');
            try {
                // Actualiza en el servidor
                const response = await API.updateTask(task.id!, apiToBeUpdateTask);
                console.info('[API 🌐] Tarea con id: ',response.data.id,' actualizada', );
                this.loading = false
            } catch (e) {
                console.error('[API 🌐] Error actualizando la tarea', e);
                this.loading = false
            }
            // Refrescar tareas pendientes / completas
            if(this.data[index].completada) {
                this.completed.push(this.data[index])
            }
            else {
                this.completed = this.completed.filter((item) => item.id !== this.data[index].id)
            }
        },

        showCompleted() {
            this.data = this.completed
        },
        showPending() {
            this.data = this.pending
        },
        showAll() {
            this.data = this.all
        }
    }
})