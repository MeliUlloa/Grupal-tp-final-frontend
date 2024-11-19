import type { CredentialsModel } from './CredentialsModel';

export interface SesionModel {
    user?: CredentialsModel; // tipo -> { correo, contrasenia, user}
    csrfToken?: string;
    jwtExpires?: number; // exp del token
}

export interface SesionStateModel {
    loading: boolean;
    data: SesionModel | null;
    error: string;
}
