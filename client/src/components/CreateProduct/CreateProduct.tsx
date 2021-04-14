import {gql, useMutation, useQuery } from '@apollo/client';
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

/* const NEW_PRODUCT = gql`
    mutation createNewProduct( $name: String!, $price: Number!, $brand: String!, $image: String!, $details: String!){
        createNewProduct(product:{ name:$name, price:$price, brand:$brand, image:$image, details:$details}){
            id
            name 
            price
            brand
            image
            details
    }
`; */

interface Categorie {
    id: number,
    name: string,
}

interface Categories {
    getCategory: Categorie[]
}

const NEW_PRODUCT = gql`
mutation NewProduct ($name: String!, $price: Float!, $brand: String!, $image: String!, $details: String!,$categoryId:Int![] ) {
    createProduct ( input: {
        name:$name,
        price:$price, 
        brand:$brand, 
        image:$image, 
        details:$details
        categoryId:$categoryId
      })
        {
            id
            name  
        }
    }
`;

const GET_CATEGORIES = gql`
query {
    getCategory {
        id
        name
    }
}
`

type FormEvent = React.FormEvent<HTMLFormElement> ;
type InputEvent = React.FormEvent<HTMLInputElement>;


export default function CreateProduct(){
    const [state , setState] = useState({name:"",price:0,brand:"",image:"",details:"",categoryId:[]})
    
/*     const [createNewProduct, { error, data }] = useMutation<
    {createNewProduct: productInventary},
    {product:newProductDetails}
    >(NEW_PRODUCT,{variables:{product:state}}) */
    const { loading, error, data } = useQuery<Categories>(GET_CATEGORIES)
    const categories = data?.getCategory

    const [createProduct , results] = useMutation(NEW_PRODUCT) // para utiilizar usar results.data

   function handleChange(e:InputEvent){
    return setState({
        ...state,
        [e.currentTarget.name]:e.currentTarget.value
    })
   }

   function handlePrice (e : InputEvent) {
    return setState({
        ...state,
        price: +e.currentTarget.value 
    })
   }

    async function handleSubmit(e:FormEvent){
    e.preventDefault()
    console.log(state)
    createProduct({ variables: state } )
    .then((resolve) => { console.log('Salio Bien') })
    .catch((err) => { console.log('Salio Mal') })
}

    return(
/*         <div className={styles.container}>
        {error ? alert(`Oh no! ${error.message}`) : null}
        {data && data.createNewProduct ? alert(`Saved!`) : null} */
         <form onSubmit={handleSubmit} className={styles.form} >
             <h1>Create Product</h1>
             <hr/>
             <label>Product Name</label>
             <input type='text' name='name' value={state.name} onChange={handleChange}/>
             <label>Price</label>
             <input type='text' name='price' value={state.price} onChange={handlePrice}/>
             <label>Brand</label>
             <input type='text' name='brand' value={state.brand} onChange={handleChange}/>
             <label>Image</label>
             <input type='text' name='image' value={state.image} onChange={handleChange}/>
             <label>Details</label>
             <input type='text' name='details' value={state.details} onChange={handleChange}/>
             <select>
                 {categories?.map((cat) => <option value={cat.id}>{cat.name}</option>)}
             </select>
             <input type='submit' value='CREATE' className={styles.button} />
         </form>
/*         </div>
 */    )
}