// importamos axios
import axios from 'axios'

const csrfToken = await axios.get(import.meta.env.VITE_API_ENDPOINT='auth/csrf', {withCredentials: true})

export const apiInstanse = axios.create({
    withCredentials: true, // configuracion de instacia de datos, aqui trabajsamos con coockies, devuelve jsonwebtoken en una coockie
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    headers: {
        'csrf-token': csrfToken.data.crsfToken
    },
})