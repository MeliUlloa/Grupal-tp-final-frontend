// Instancia de axios
import { apiInstance } from "../api";
// Modelo de solicitud
import type { CreateTask } from "@/models/TaskRequestModel";
// Modelo de respuesta 
import type { TaskApiResponse } from "@/models/TaskApiResponseModel";

// Función crear
export async function createTask(task: CreateTask) {
    return await apiInstance.post<TaskApiResponse>('/todo', task)
}

// Función obtener
export async function getTasks() {
    return await apiInstance.get<TaskApiResponse[]>('/todo')
}

// Función obtener uno
export async function getTask(id: number) {
    return await apiInstance.get<TaskApiResponse>(`/todo/${id}`)
}

// Función editar
export async function updateTask(id: number, task: CreateTask) {
    return await apiInstance.patch<TaskApiResponse>(`/todo/${id}`, task)
}

// Función eliminar
export function deleteTask(id: number) {
    return apiInstance.delete(`/todo/${id}`)
}

