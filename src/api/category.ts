import {Response} from "@/types/Response";
import {Category} from "@/types/Category";
export async function getCategories() : Promise<Response<Category>> {
    let response = await fetch('http://localhost:1337/api/categories?populate=*')
    return await response.json()
}