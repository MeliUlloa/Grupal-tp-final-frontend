// Axios permite realizar llamadas HTTP (medio de comunicacion cliente-servidor)
import axios from 'axios'

const csrfToken = await axios.get(import.meta.env.VITE_API_ENDPOINT='auth/csrf', {withCredentials: true})

export const apiInstanse = axios.create({
    withCredentials: true, // Guarda JWT en una cookie
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    headers: {
        'csrf-token': csrfToken.data.crsfToken
    },
})