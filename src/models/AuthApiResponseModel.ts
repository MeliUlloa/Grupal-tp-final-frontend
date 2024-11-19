/**
 * @descriptio dependiendo la respuesta del servidor se asignan valores,
 * por eso son todos opcionales.
 */
export interface AuthApiResponse{
    statusCode?: number; // Para manejo de errores (400, 401, 200, etc)
    message?: string | [string]; // Dependiendo la resp puede ser una lista
    error?: string;
}
