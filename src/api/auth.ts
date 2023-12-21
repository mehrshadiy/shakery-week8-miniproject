import apiClient from "@/api/config/ApiClient";

interface LoginData {
    identifier: string
    password: string
}
interface SignUpData {
    username : string
    email : string
    password : string
}

export async function login({identifier, password} : LoginData) {
    const response = await apiClient.post('/auth/local',{identifier, password})
    return response.data
}
export async function signUp({username, email, password} : SignUpData) {
    const response = await apiClient.post('/auth/local/register',{username, email, password})
    return response.data
}