import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import { FaStar } from 'react-icons/fa'
import '../rating/rating.css'
import { ReviewMutation, EDIT_PRODUCT, GET, GET_CATEGORIES} from "../../gql/productDetails"
import styles from "./ProductDetail.module.scss"
import { useDispatch } from 'react-redux';

interface Icategories {
    id:number
    name:string

}

interface DetailsProduct {
    getProductById: {
        id: number
        brand: string
        image: string
        name: string
        price: number
        details: string
        categories: Icategories[]
    }
}

interface Review {
    rating: number
    review: string
}


interface Categorie {
    id: number,
    name: string,
}

interface Categories {
    getCategory: Categorie[]
}

interface PropsDetails {
    history: {
        location: {
            state: {
                id: number
            }
        }
    }
}

const DetailsComponent = (props: PropsDetails): JSX.Element => {

    const id = props.history.location.state.id

    const { loading, error, data } = useQuery<DetailsProduct>(GET, {
        variables: { id }
    });

    const [addreview, results] = useMutation(ReviewMutation)

    
    let resultsData: Array<string> = []
    
    if (results) {
        resultsData.push(results?.data?.addReview?.text)
    }

    let [rating, setRating] = useState<Array<any>>([])

    const [hover, setHover] = useState(0)
    
    const [reviewuser, setReviewuser] = useState({
        review: ''
    })

    const [hidereviews, setHidereviews] = useState(true)

    const [hideStar, setHideStar] = useState(true)
    
    const filtred = data?.getProductById
    
    
    let totalrating: number = 0;
    
    let summulti: Array<number> = [];
    
    let sumlength: Array<number> = [];
    
    let count = 1;
    
    if (rating.length > 0) {
        while (count <= 5) {
            summulti.push(count * rating.filter(item => item === count).length);
            sumlength.push(rating.filter(item => item === count).length);
            count++;
        }
        totalrating = summulti.reduce((a, b) => a + b) / sumlength.reduce((a, b) => a + b)
        totalrating = parseFloat(totalrating.toFixed(2))
    }
    
    const changereview = async () => {
        await addreview({ variables: { rating: totalrating, text: reviewuser.review, product: filtred?.id } })
        .then(review => { console.log('review up') })
        .catch((err) => { console.log('review mal') })
        setHidereviews(false)
    }
    
    
    const[details,setDetails] = useState({id:filtred?.id.toString(),name:filtred?.name,price:filtred?.price,brand:filtred?.brand,image:filtred?.image,details:filtred?.details,categories:filtred?.categories})
    const[editMode,setEditMode] = useState(false)
    
    console.log(details)
    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        setEditMode(!editMode)
    }
    
    function handleChange(e:React.FormEvent<HTMLInputElement>){
        details ? setDetails({
            ...details,
            [e.currentTarget.name]:e.currentTarget.value
        })
        : console.log('no se puede')
    }
    
    function handlePrice (e : React.FormEvent<HTMLInputElement>) {
        details ? setDetails({
            ...details,
            price: +e.currentTarget.value 
        })
        : console.log('no se puede')
    }
    
    function handleDetails (e : React.ChangeEvent<HTMLTextAreaElement>) {
        details ? setDetails({
            ...details,
            details: e.currentTarget.value 
        })
        : console.log('no se puede')
    }

    const [editProduct, resultsEdit] = useMutation(EDIT_PRODUCT)
    console.log(resultsEdit.data)

    function handleSubmit (e : React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        editProduct({variables:{                                        //WARNING CUIDADO CON ESTO
            ...details,
        categories: details?.categories?.map(cat => cat.id)//esto puede llegar a romper estoy haciendo el edit mutation de las categorias
        }})
    }
        

    const handleCategory = (e:React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setDetails({
            ...details,
            categories: details?.categories?.filter( cat => cat.id != +e.currentTarget.value)
        })
    }
    const handleAddCategories = (e:React.FormEvent<HTMLSelectElement>) => {
        details?.categories &&
        setDetails({
            ...details,
            categories: details?.categories?.find(cat => cat.name === e.currentTarget.selectedOptions[0].innerHTML) ? details.categories:
            [...details?.categories , {name:e.currentTarget.selectedOptions[0].innerHTML, id:parseInt(e.currentTarget.value)}]
        })
    }

    const categoriesQ = useQuery<Categories>(GET_CATEGORIES)
    const categoriesQuery = categoriesQ.data?.getCategory
    
 

    return (
        <div className={styles.contenedorAll}>
            <div className={styles.contenedorDetail}>
                <img src={filtred?.image} alt='' />
                <form onSubmit={handleSubmit} >
                    <button onClick={handleEdit}>Edit</button>
                    {editMode && <input type='submit' value='Aceptar Cambios' />}
                    {editMode?
                    <input name='name' type='text' onChange={handleChange} defaultValue={details?.name}/>
                    :
                    <h1  className={styles.nameDetail}>{filtred?.name}</h1>}
                    {editMode ?
                     <p > Marca: <input name='brand' defaultValue={details?.brand} onChange={handleChange}/> </p>
                    :
                    <p> Marca: {filtred?.brand} </p>}
                    {editMode ?
                    <p > Detalles: <textarea  onChange={handleDetails} defaultValue={details?.details} /></p> 
                    :
                    <p > Detalles: {filtred?.details}</p>}
                    <div  className={styles.botonPrecio}>
                        {editMode ?
                        <h2 className={styles.precioDetail}>$<input onChange={handlePrice} defaultValue={details?.price} /></h2>
                        :
                        <h2 className={styles.precioDetail}>${new Intl.NumberFormat().format(filtred?.price || 0)}</h2>
                        }
                        {editMode && <select onChange={handleAddCategories}>
                        {categoriesQuery?.map((cat) => <option key={cat.name} value={cat.id} >{cat.name}</option>)} {/*onClick={handleCategories}*/}
                        </select>}
                        {editMode ?
                        details?.categories?.map(category => <button onClick={handleCategory} value={category.id} >{category.name}</button>)
                        :
                        details?.categories?.map(category => <p className={styles.category}>{category.name}</p>)
                        }
                        
                        <div>
                            <div className={styles.estrellas}>
                                {hideStar ?
                                    <div >
                                        {[...Array(5)].map((star, index) => {
                                            const ratingvalue = index + 1;
                                            return <label>
                                                <input type='radio'
                                                    name='Rating'
                                                    value={ratingvalue}
                                                    onClick={function pushrating() {
                                                        setRating([...rating, ratingvalue])
                                                        setHideStar(false)
                                                    }}
                                                />
                                                <FaStar size={30}
                                                    className='star'
                                                    color={ratingvalue <= hover ? '#ffc107' : '#e4e5e9'}
                                                    onMouseEnter={() => setHover(ratingvalue)}
                                                    onMouseLeave={() => setHover(0)}
                                                />
                                            </label>
                                        })}
                                        <p className={styles.raiting}>Rating {totalrating}</p>
                                    </div>
                                    :
                                    <div>
                                        <h4 className={styles.gracias} >Gracias por dar una clasificación</h4>
                                        <p className={styles.raiting} >Rating {totalrating}</p>
                                    </div>
                                }
                            </div>
                            <Link to={{
                                pathname: '/Pago',
                                state: {
                                    id: id
                                }
                            }}>
                                <button className={styles.buttonCompra}>Comprar</button>
                            </Link>
                            <div>{hidereviews ?
                                <div>
                                    <div className={styles.review}>
                                        <textarea
                                            placeholder={'Escriba aquí una review del producto'}
                                            className={styles.textarea}
                                            name='review'
                                            value={reviewuser.review}
                                            onChange={(event) =>
                                                setReviewuser({
                                                    ...reviewuser,
                                                    review: event.target.value
                                                })} />
                                    </div>
                                    <button onClick={changereview} className={styles.buttonCompra} >Guardar Review</button>
                                </div>
                                :
                                <div className={styles.gracias} >
                                    <h4>Gracias por dejar su review</h4>
                                    <div>{resultsData && resultsData.map((item) => (
                                        <p>{item}</p>
                                    ))}</div>
                                </div>
                            }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DetailsComponent
