import { safeParse } from "valibot"
import axios from "axios"
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types"
import { toBoolean } from "../helpers"

type ProductData = {
    [k: string]: FormDataEntryValue
}

export async function addProduct( data :ProductData ) {
    
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        });

        if(result.success){
            const url = import.meta.env.VITE_URL + '/api/products';

            await axios.post(url, {
                name: result.output.name,
                price:result.output.price
            });


        }else{
            throw new Error();
        }
    } catch (error) {
        alert('ha ocurrido un error');
        // return new Error('Data erronea');
        
    }
}

export async function getProducts(){

    try {
        const url = import.meta.env.VITE_URL + '/api/products';
        const {data} = await axios.get(url);

        const result = safeParse(ProductsSchema, data.data)
        
        if(result.success){
            return result.output;
        }else{
            throw new Error;
        }
    } catch (error) {
        return {
            error: true,
            message: 'Ha ocurrido un error, vuelve a intentarlo'
        }
    }
}

export async function getProductsById(id: Product['id']){

    try {
        const url = import.meta.env.VITE_URL + `/api/products/${id}`;
        const {data} = await axios.get(url);

        const result = safeParse(ProductSchema, data.data)
        
        if(result.success){
            return result.output;
        }else{
            throw new Error('ha ocurrido un error');
        }
    } catch (error) {
        console.log(error)
    }
}
export async function updateProduct(data : ProductData, id: Product['id']) {
    try {
        const url = import.meta.env.VITE_URL + `/api/products/${id}`;
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: +data.price, 
            availability: toBoolean(data.availability.toString())
        });
        if(result.success){
            await axios.put(url, result.output);
            
        }else{ 
            throw new Error('ha ocurrido un error')
        }

    } catch (error) {
        console.log(error);
        alert('ha ocurrido un error');
    }
};

export async function deleteProduct(id:Product['id']) {
    try {
        const url = import.meta.env.VITE_URL + `/api/products/${id}`;

        const {data} = await axios.delete(url);
       
    } catch (error) {
        console.log(error)
    }
}

export async function AvailabilityChanges(id:Product['id']) {
    try {
        const url = import.meta.env.VITE_URL + `/api/products/${id}`;

        await axios.patch(url);

    } catch (error) {
        console.log(error);

    }
}