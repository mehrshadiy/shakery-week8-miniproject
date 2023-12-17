// @flow
import * as React from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteProduct, getProducts} from "@/api/products";
import {toast} from "react-toastify";
import {Login} from "@/components/auth/Login";

type Props = {};

export default function Home(props: Props) {
    const queryClient = useQueryClient()
    const {data: productData} = useQuery({queryKey: ['products'], queryFn: getProducts})
    const mutation = useMutation({mutationFn: deleteProduct})


    const deleteHandler = (id: number) => {
        mutation.mutate({productId: id}, {
                onSuccess: () => {
                    toast.success("product removed successfully")
                    // @ts-ignore
                    queryClient.invalidateQueries(['products'])
                }
            }
        )
    }

    return (
        <main className={'flex min-h-screen flex-col items-center p-24'}>
            <Login/>
            <ul>
                {
                    productData &&
                    productData.data.map((item) => {
                        return (
                            <li key={item.id}>{item.attributes.title}
                                <button onClick={() => {
                                    deleteHandler(item.id)
                                }} className={'rounded border p-2'}>delete
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    );
};