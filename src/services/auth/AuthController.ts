// Instancia de axios
import { apiInstance } from "../api";
// Respuesta generica del servidor (usamos tipo T para modelos de respuesta)
import type { APIResponse } from "@/models/ApiResponseModel";
import type { CredentialsModel } from "@/models/CredentialsModel";
import type { AuthApiResponse } from "@/models/AuthApiResponseModel";

// Función para registro
export async function CreateUser(userData: CredentialsModel) {
    // <APIResponse<T>> = <APIResponse<AuthApiResponse>>
    return await apiInstance.post<APIResponse<AuthApiResponse>>("auth/signup", userData)
}

// Función para login
export async function Login(credentials: CredentialsModel) {
    const response = await apiInstance.post<APIResponse<AuthApiResponse>>(
        "/auth/login", 
        credentials,
        {
            withCredentials: true // Obtenemos cookies
        }
        ); 
        // Seteamos la cookie en los headers para futuras consultas
        const setCookieHeader = response.headers['set-cookie'];
    return response 
}


// Función para cerrar sesión
export async function Logout() {
    return await apiInstance.post<APIResponse<null>>("/auth/logout");
}


