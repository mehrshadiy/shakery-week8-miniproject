// @flow
import * as React from 'react';
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {login} from "@/api/auth";
import {toast} from "react-toastify";

interface FormData {
    identifier: string
    password: string
}

export function Login() {
    const {register, handleSubmit} = useForm<FormData>()
    const mutation = useMutation({mutationFn: login})

    const onSubmitHandler = (data: FormData) => {
        mutation.mutate(data,{
            onSuccess: (response)=>{
                toast.success("you loggedIn successfully")

                localStorage.setItem('token',response.jwt)
            }
        })
    }
    const logoutHandler = ()=>{
        localStorage.removeItem('token')
        toast.success("you logged out successfully")
    }
    
    return (
        <form className={'flex flex-col mb-4'} onSubmit={handleSubmit(onSubmitHandler)}>
            <input className={'border p-2'} type={"text"} {...register("identifier", {required: 'username is required'})} placeholder={"username"}/>
            <input className={'border p-2'} type={"password"} {...register("password", {required: 'password is required'})} placeholder={"password"}/>
            <div className={'grid grid-cols-2 gap-4'}>
                <input className={'border p-2 rounded'} type="submit" value={"login"}/>
                <input className={'border p-2 rounded'} type="button" value={"logout"} onClick={logoutHandler}/>
            </div>
            <input type="button" value={'showPassword'}/>
        </form>
    );
}