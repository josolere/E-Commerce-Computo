import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
/* import { NEW_PRODUCT } from "../../gql/products";*/
import { GET_CATEGORIES } from "../../gql/categories";
import styles from './CreateProduct.module.scss';
import { Link } from 'react-router-dom'

interface Categorie {
    id: number | undefined,
    name: string | undefined,
}

interface Categories {
    getCategory: Categorie[]
}

type FormEvent = React.FormEvent<HTMLFormElement>;
type InputEvent = React.FormEvent<HTMLInputElement>;
type SelectEvent = React.FormEvent<HTMLSelectElement>;
type ButtonEvent = React.FormEvent<HTMLButtonElement>

interface IState {
    name: string
    price: number
    brand: string
    image: string
    details: string
    categories: number[]
}

interface DetailsProduct {
    id: number | undefined,
    brand: string | undefined,
    image: string | undefined,
    name: string | undefined,
    price: number | undefined,
    details: string | undefined,
}

interface DetailsData {
    getProducts: DetailsProduct[]
}

const NEW_PRODUCT = gql`
mutation NewProduct ($name: String!, $price: Float!, $brand: String!, $image: String!, $details: String!, $categories:[Int!]) {
    createProduct ( input: {
        name:$name,
        price:$price, 
        brand:$brand, 
        image:$image, 
        details:$details
        categories:$categories
      })
        {
            id
            name
          	categories{
                id
                name
              }
          
        }
    }`;

const GET = gql`
query ($name: String!, $categoriesId:[ID!]){
    getProducts (filter:{limit:40 name:$name categoriesId:$categoriesId}) {
        id
        name
        price
        image
    }
}`;



export default function CreateProduct() {

    const [createProduct, results] = useMutation(NEW_PRODUCT) // para utiilizar usar results.data

    const { loading, error, data } = useQuery<Categories>(GET_CATEGORIES)
    const categories = data?.getCategory

    const [state, setState] = useState<IState>({ name: "", price: 0, brand: "", image: "", details: "", categories: [] })

    const products = useQuery<DetailsData>(GET, { variables: { name: '', categoriesId: [] } })

    const [prod, setProd] = useState<any>()

    const [newpro, setnewpr] = useState<any>([])

    let LunesMañana = []

    useEffect(() => { 
        setProd(products?.data?.getProducts)
     }, [products])


    function handleChange(e: InputEvent) {
        return setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    function handlePrice(e: InputEvent) {
        return setState({
            ...state,
            price: +e.currentTarget.value
        })
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        createProduct({ variables: state })
            .then((resolve) => { console.log(data) })
            .catch((err) => { console.log('Salio Mal') })
            setnewpr([...newpro, results?.data?.createProduct])

   }


    const [categors, setCategors] = useState<Array<any>>([])

    const handleCategories = (e: SelectEvent) => {
        e.preventDefault()
        setCategors([...categors, {
            id: parseInt(e.currentTarget.value),
            name: e.currentTarget.selectedOptions[0].innerHTML
        }])
        setState({
            ...state,
            categories: [...state.categories, parseInt(e.currentTarget.value)]
        })
    }

    const handleDeleteCategory = (e: ButtonEvent) => {
        e.preventDefault()
        setCategors(categors.filter(cat => cat.id !== parseInt(e.currentTarget.value)))
        setState({
            ...state,
            categories: state.categories.filter(id => id !== parseInt(e.currentTarget.value))
        })
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form} >
                <h1>Crear Producto</h1>
                <hr />
                <label>Nombre del producto</label>
                <input type='text' name='name' value={state.name} onChange={handleChange} />
                <label>Precio</label>
                <input type='text' name='price' value={state.price} onChange={handlePrice} />
                <label>Marca</label>
                <input type='text' name='brand' value={state.brand} onChange={handleChange} />
                <label>Imagen</label>
                <input type='text' name='image' value={state.image} onChange={handleChange} />
                <label>Detalles</label>
                <input type='text' name='details' value={state.details} onChange={handleChange} />
                <select onChange={handleCategories}>
                    {categories?.map((cat) => <option key={cat.name} value={cat.id} >{cat.name}</option>)} {/*onClick={handleCategories}*/}
                </select>
                <div>
                    {categors.map(cate => <button onClick={handleDeleteCategory} value={cate.id} key={cate.name}>{cate.name}</button>)}
                </div>
                <input type='submit' value='Crear' className={styles.button} />
            </form>
            <div className={styles.separateList}>
                <div className={styles.listProducts} >
                    <label className={styles.TitleList} >Productos creados</label>
                    <hr className={styles.hrList} />
                    {prod && prod.map((item: any, index: number) => (
                        <Link style={{ textDecoration: 'none' }} to={{
                            pathname: '/Detalles',
                            state: {
                                id: item.id
                            }
                        }}>
                            <p className={styles.pList}>{item?.id}: {item.name}</p>
                        </Link>
                    ))}
                    {newpro && newpro.map((item: any) => (  
                        <Link style={{ textDecoration: 'none' }} to={{
                            pathname: '/Detalles',
                            state: {
                                id: item?.id
                            }
                        }}>
                            <p className={styles.pList}>{item?.id} {item?.name}</p>
                        </Link>
                        ))}


                </div>
            </div>
        </div>
    )
}