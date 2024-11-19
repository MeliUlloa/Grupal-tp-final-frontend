export interface TaskApiResponse{
    statusCode?: number
    message?: string | [string];
    error?: string;
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    title?: string;
    description?: string;
    userId?: string;
}