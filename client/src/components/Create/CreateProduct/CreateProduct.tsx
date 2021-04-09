import {gql, useMutation } from '@apollo/client';
import React, { useState } from 'react'
import styles from './CreateProduct.module.scss'



const NEW_PRODUCT = gql`
    mutation createNewProduct($id: ID!, $name: String!, $price: Number!, $brand: String!, $image: String!, $details: String!){
        createNewProduct(id:$id, name:$name, price:$price, brand:$brand, image:$image, details:$details){
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
    const [state , setState] = useState({name:"",price:"",brand:"",image:"",details:""})
    
    const [createNewProduct] = useMutation(NEW_PRODUCT)


   function handleChange(e:InputEvent){
    return setState({
        ...state,
        [e.currentTarget.name]:e.currentTarget.value
    })
   }

   function handleSubmit(e:FormEvent){
    e.preventDefault()
    //AVERIGUAR COMO HACER POST Y COMO SON LOS MODELOS
    createNewProduct({variables:state})
   }

    return(
        <div className={styles.container}>
         <form onSubmit={handleSubmit} className={styles.form} style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
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
             <input type='submit' value='CREATE' />
         </form>
        </div>
    )
}