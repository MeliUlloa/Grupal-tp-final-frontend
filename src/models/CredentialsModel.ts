/**
 * @description modelo para pasar en body de peticion POST (login-registro)
 */
export interface CredentialsModel {
    correo: string;
    contrasenia: string;
    nickname?: string;
}