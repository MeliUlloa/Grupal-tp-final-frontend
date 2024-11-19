/**
 * @description Modelo para asignar respuesta del servidor
 * T es un tipo génerico para asignar la data
 */
export interface APIResponse <T> {
    status: number,
    statusText: string,
    data: T, // tipo generico
}