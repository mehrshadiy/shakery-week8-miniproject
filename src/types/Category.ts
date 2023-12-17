import {Product} from "@/types/Product";

export interface Category {
    title: string
    slug: string
    createdAt: string
    updatedAt: string
    products: Product
}