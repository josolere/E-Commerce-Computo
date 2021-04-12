import {gql, useMutation } from '@apollo/client';
import React, { useState } from 'react'
import styles from './CreateProduct.module.scss' 

interface productInventary {
    id:number
    name:string
    price:number
    brand:string
    image:string
    details:string
}

interface newProductDetails{
    name:string
    price:number
    brand:string
    image:string
    details:string
}
// mutation createNewProduct( $name: String!, $price: Number!, $brand: String!, $image: String!, $details: String!){
//     createNewProduct(product:{ name:$name, price:$price, brand:$brand, image:$image, details:$details}){
//         id
//         name
//         price
//         brand
//         image
//         details
//     }
// }

const NEW_PRODUCT = gql`
    mutation createProduct( $name: String!, $price: Number!, $brand: String!, $image: String!, $details: String!) {
         createProduct(input:{ name:$name, price:$price, brand:$brand, image:$image, details:$details}){
            id
            name 
            price
            brand
            image
            details
    }
  }
`;

type FormEvent = React.FormEvent<HTMLFormElement> ;
type InputEvent = React.FormEvent<HTMLInputElement>;


export default function CreateProduct(){
    const [state , setState] = useState({name:"",price:0,brand:"",image:"",details:""})
    
    const [createProduct, { error, data }] = useMutation<
    {createProduct: productInventary},
    {input:newProductDetails}
    >(NEW_PRODUCT,{variables:{input:state}})


   function handleChange(e:InputEvent){
    return setState({
        ...state,
        [e.currentTarget.name]:e.currentTarget.value
    })
   }

    async function handleSubmit(e:FormEvent){
    e.preventDefault()
    // console.log(NEW_PRODUCT.definitions)
    createProduct()
    // console.log(result)
   }

    return(
        <div className={styles.container}>
        {error ? alert(`Oh no! ${error.message}`) : null}
        {data && data.createProduct ? alert(`Saved!`) : null}
         <form onSubmit={handleSubmit} className={styles.form} >
             <h1>Create Product</h1>
             <hr/>
             <label>Product Name</label>
             <input type='text' name='name' value={state.name} onChange={handleChange}/>
             <label>Price</label>
             <input type='text' name='price' value={state.price} onChange={handleChange}/>
             <label>Brand</label>
             <input type='text' name='brand' value={state.brand} onChange={handleChange}/>
             <label>Image</label>
             <input type='text' name='image' value={state.image} onChange={handleChange}/>
             <label>Details</label>
             <input type='text' name='details' value={state.details} onChange={handleChange}/>
             <input type='submit' value='CREATE' className={styles.button} />
         </form>
        </div>
    )
}