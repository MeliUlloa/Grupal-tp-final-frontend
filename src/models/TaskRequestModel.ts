/**
 * @description Type es una interfaz a la cual se le declara el literal de su valor, ningún otro.
 * @description modelo CreateTask se usará para crear/modificar tareas
 */
type TaskComp = 'Completada' | 'Incompleta';

export interface CreateTask{
    title: string;
    description: TaskComp;
}
