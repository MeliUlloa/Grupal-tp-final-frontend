import type { CredentialsModel } from "./CredentialsModel";

export interface SesionModel {
    user?: CredentialsModel,
    crsfToken?: string,
    jwtExpires?: number
}

export interface SesionStateModel {
    loading: boolean,
    data: SesionModel | null,
    error: string
}