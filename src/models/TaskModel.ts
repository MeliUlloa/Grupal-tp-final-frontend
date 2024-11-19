export interface Task {
    id: number,
    tarea: string,
    completada: boolean
}

export interface TaskState {
    loading: boolean,
    data: Task[]
}