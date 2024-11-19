export interface TaskApiResponse{
    statusCode?: number
    message?: string | [string];
    error?: string;
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    title?: string;
    description?: string;
    userId?: string;
}