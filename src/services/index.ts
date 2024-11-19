// Métodos de controladores
import { Login, CreateUser, Logout } from "./auth/AuthController";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "./task/TaskController";

// exportamos variable con todos los metodos, para después al llamarla acceder a todos ellos 
export const API = {
    // metodos auth
    Login,
    CreateUser,
    Logout,

    // metodos task
    createTask,
    deleteTask,
    getTask,
    getTasks,
    updateTask
}
