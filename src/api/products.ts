import {Response} from "@/types/Response";
import {Product} from "@/types/Product";
import apiClient from "@/api/config/ApiClient";

export async function getProducts(): Promise<Response<Product>> {
    const  response = await apiClient({
        method: "get",
        url: `/products`,
        params: {
            "populate": "*"
        }
    })

    return response.data
}

export async function deleteProduct({productId}: {productId: number}) {
    const response = await apiClient.delete(`/products/${productId}`)

    return response.data
}

export async function getProductsOfCategory({categoryId, page}: { categoryId: number, page: number }) {
        let response = await apiClient<Response<Product>>({
            method: "get",
            url: `/products`,
            params: {
                "pagination[page]": page,
                "pagination[pageSize]": 2,
                "filters[category]": categoryId,
                "populate": "*"
            }
        })
        return response.data
}

export async function creatProduct({title, price, category}: { title: string, price: number, category: number }) {
    const response = await apiClient<Response<Product>>({
        method: 'post',
        url: `/products`,
        data: {
            "data": {
                "title": title,
                "price": price,
                "category": category
            }
        },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    return response.data
}

const sleep = (ms : number) => {
  new Promise((resolve)=>{
      setTimeout(resolve, ms)
  })
}