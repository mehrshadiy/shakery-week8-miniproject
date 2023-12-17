import axios from "axios";
import {toast} from "react-toastify";

 const apiClient = axios.create({
     baseURL: "http://localhost:1337/api",
    timeout: 120000
})

apiClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    if (token){
        config.headers.Authorization = 'Bearer '+token
    }

    return config
})

apiClient.interceptors.response.use(function (response) {
    return response
}, function (error) {

    if (error.response) {
        if (error.response.status === 404){
            toast.error('page not found or its not exist')
        }else if (error.response.status === 400){
            toast.error('sending parameters are wrong')
        }else if (error.response.status === 401){
            toast.error('please log in first')
        }else if (error.response.status === 403){
            toast.error('you dont have required authorization')
        }else {
            toast.error('something went wrong!!! please try later')
        }

    } else if (error.request) {
        toast.error('server is disconnected');

    } else {
        toast.error('unknown error');
    }

    return Promise.reject(error)
})
export default apiClient