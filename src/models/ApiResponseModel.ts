export interface APIResponse <T> {
    status: number,
    statusText: string,
    data: T, // tipo generico
}