// Este modelo tendra campos opcionales,
// depende de la respuesta del servidor si se asignaron o no los valores.
export interface AuthApiResponseModel {
    statusCode?: number // 404, 200:0k ..
    message?: string | [string] // dependiendo la respuesta nos puede llegar un string solitario o una lista
    error?: string
}