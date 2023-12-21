// @flow
import * as React from 'react';
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {signUp} from "@/api/auth";
import {toast} from "react-toastify";

type Props = {

};
interface FormData {
    username : string
    email : string
    password : string
}


export function SignUp() {
    const {register, handleSubmit} = useForm<FormData>()
    const mutation = useMutation({mutationFn: signUp})



    const onSubmitHandler = (data: FormData) => {
        mutation.mutate(data,{
            onSuccess: (response)=>{
                toast.success("you signed successfully")

                localStorage.setItem('token',response.jwt)
            }
        })
    }

    return (

        <form className={'flex flex-col mb-4'} onSubmit={handleSubmit(onSubmitHandler)}>
            <input className={'border p-2'}
                   type={"text"} {...register("username", {required: 'username is required'})}
                   placeholder={"username"}/>
            <input className={'border p-2'}
                   type={"email"} {...register("email", {required: 'email is required'})}
                   placeholder={"email"}/>
            <input className={'border p-2'}
                   type={"password"} {...register("password", {required: 'password is required'})}
                   placeholder={"password"}/>
            <input className={'border p-2 rounded'} type="submit" value={"signup"}/>
        </form>
    );
}