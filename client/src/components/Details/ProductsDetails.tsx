import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'
import '../rating/rating.css'
import { REVIEW_MUTATION, EDIT_PRODUCT, GET, GET_CATEGORIES } from "../../gql/productDetails"
import styles from "./ProductDetail.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import stylesEdit from "./ProductEdit.module.scss"
import { addProductDetails } from '../../redux/actions'
import { toast } from 'react-toastify';
import { ACTUAL_USER, GET_USERS } from "../../gql/login";
import { HiBadgeCheck } from "react-icons/hi";
import { IoCloseCircleSharp } from "react-icons/io5";

interface user {
    currentUser: {
        name: string,
        password: string,
        email: string
    }
}

interface Icategories {
    id?: number
    name?: string
}

interface DetailsProduct {
    getProductById: {
        id: number
        brand: string
        image: string
        name: string
        price: number
        details: string
        stock:number
        categories: any[]
        reviews: any[]
    }
}

interface Categories {
    getCategory: Icategories[]
}

interface PropsDetails {
    history: {
        location: {
            state: {
                id: number
                newprice: number
            }
        }
    }
}

const DetailsComponent = (props: PropsDetails): JSX.Element => {

    let user: any = {}

    const currentU = useQuery<user>(ACTUAL_USER)

    user = currentU?.data?.currentUser

    console.log(user)

    const dispatch = useDispatch()

    const id = props.history.location.state.id

    const { data } = useQuery<DetailsProduct>(GET, {
        variables: { id }
    });

    const [controReview, setControlReview] = useState('');

    const [addreview, results] = useMutation(REVIEW_MUTATION);

    let [rating, setRating] = useState<Array<any>>([]);

    const [hover, setHover] = useState(0);

    const [reviewuser, setReviewuser] = useState({
        review: ''
    });

    const [hideRating, setHideRating] = useState(true);

    const [hideReview, setHideReview] = useState(true);

    const filtred = data?.getProductById

    console.log(filtred)

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

    const changereview = () => {
        setControlReview(user?.id)
        addreview({ variables: { id: filtred?.id, rating: totalrating, text: reviewuser.review, userId: user?.id, product: 1 } })
            .then(review => { console.log('review up') })
            .catch((err) => { console.log('review mal') })
        setHideReview(false)
    }

    const [details, setDetails] = useState({ id: "", name: "", price: 0, brand: "", image: "", details: "",stock:0, categories: [{ id: "1", name: "default" }] })

    useEffect(() => {
        console.log(results?.data)
    }, [results])

    useEffect(() => {
        console.log(results.data)
        setDetails({ id: filtred?.id.toString() || "", name: filtred?.name || "", price: filtred?.price || 0, brand: filtred?.brand || "", image: filtred?.image || "", details: filtred?.details || "",stock: filtred?.stock || 0, categories: filtred?.categories || [{}] })
    }, [filtred])

    useEffect(() => {
        filtred?.reviews?.map(item => setControlReview(item?.name))
    }, [filtred])

    console.log(user?.id)
    console.log(filtred?.reviews)
    console.log(controReview !== user?.id)
    const [editMode, setEditMode] = useState(false)

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setEditMode(!editMode)
    }

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        details ? setDetails({
            ...details,
            [e.currentTarget.name]: e.currentTarget.value
        })
            : console.log('no se puede')
    }

    function handlePrice(e: React.FormEvent<HTMLInputElement>) {
        details ? setDetails({
            ...details,
            [e.currentTarget.name]: +e.currentTarget.value
        })
            : console.log('no se puede')
    }

    function handleDetails(e: React.ChangeEvent<HTMLTextAreaElement>) {
        details ? setDetails({
            ...details,
            details: e.currentTarget.value
        })
            : console.log('no se puede')
    }

    const [editProduct, resultsEdit] = useMutation(EDIT_PRODUCT,{
        refetchQueries:[{query:GET, variables: { id }}]
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(details)
        editProduct({
            variables: {                                        //WARNING CUIDADO CON ESTO
                ...details,
                categories: details?.categories?.map(cat => cat.id)//esto puede llegar a romper estoy haciendo el edit mutation de las categorias
            }
        })
    }

    const handleCategory = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setDetails({
            ...details,
            categories: details?.categories?.filter(cat => cat.id != e.currentTarget.value)
        })
    }
    const handleAddCategories = (e: React.FormEvent<HTMLSelectElement>) => {
        details?.categories &&
            setDetails({
                ...details,
                categories: details?.categories?.find(cat => cat.name === e.currentTarget.selectedOptions[0].innerHTML) ? details.categories :
                    [...details?.categories, { name: e.currentTarget.selectedOptions[0].innerHTML, id: e.currentTarget.value }]
            })
    }

    const categoriesQ = useQuery<Categories>(GET_CATEGORIES)
    const categoriesQuery = categoriesQ.data?.getCategory


    const handleAddProduct = () => {
        const state = true
        dispatch(addProductDetails(state));
    }

    return (
        <React.Fragment>
            <div className={styles.contenedorAll}>
                <div className={styles.contenedorDetail}>
                    <img src={filtred?.image} alt='' />
                    <form onSubmit={handleSubmit} className={editMode ? stylesEdit.containerEdit : styles.formm} >
                        {user?.privilege === 'admin' ? <button className={styles.Edit} onClick={handleEdit}>Edit</button> : false}

                        {editMode ?
                            <input className={stylesEdit.input} name='name' type='text' onChange={handleChange} defaultValue={details?.name} />
                            :
                            <h1 className={styles.nameDetail}>{filtred?.name}</h1>}
                            {filtred?.stock ? <div color='red'><HiBadgeCheck size={30}/> Hay Stock </div> : <div style={{color:'red'}}><IoCloseCircleSharp color='red'/> No hay Stock </div>}
                            {editMode && <input min={0} style={{width:'2rem'}} type='number' name='stock' defaultValue={filtred?.stock} onChange={handlePrice}></input>}
                          <div className={stylesEdit.cats}>
                            {editMode ?
                                details?.categories?.map(category => <button className={stylesEdit.input} onClick={handleCategory} value={category.id} >Categoría: {category.name}</button>)
                                :
                                details?.categories?.map(category => <p className={styles.PDetails}>Categoría: {category.name}</p>)
                            }
                        </div>
                        {editMode ?
                            <p > Marca: <input className={stylesEdit.input} name='brand' defaultValue={details?.brand} onChange={handleChange} /> </p>
                            :
                            <p> Marca: {filtred?.brand} </p>}
                        {editMode ?
                            <p ><textarea onChange={handleDetails} defaultValue={details?.details} /></p>
                            :
                            <p className={styles.PDetails} >{filtred?.details}</p>}

                        <div className={styles.botonPrecio}>

                            {editMode ?
                                <p className={styles.precioDetail}>$<input className={stylesEdit.input} onChange={handlePrice} name='price' defaultValue={details?.price} /></p>
                                :
                                <p className={styles.precioDetail}>${new Intl.NumberFormat().format(filtred?.price || 0)}</p>
                            }
                            <hr style={{ height: '1rem', backgroundColor: 'white' }} />
                            {filtred?.stock ? <Link to='/Home' >
                                <button onClick={() => {
                                    handleAddProduct();
                                }} className={styles.buttonCompra}><FontAwesomeIcon icon={faCartPlus} /></button>
                            </Link>
                        :
                        <div>
                            <IoCloseCircleSharp color='whitesmoke' style={{margin:"0rem 1rem"}} />
                        </div>    
                        }
                        </div>
                        <div className={stylesEdit.bot}>

                            {editMode && <select onChange={handleAddCategories}>
                                {categoriesQuery?.map((cat) => <option key={cat.name} value={cat.id} >{cat.name}</option>)} {/*onClick={handleCategories}*/}
                            </select>}

                            {editMode && <input className={stylesEdit.acept} type='submit' value='Aceptar Cambios' />}
                        </div>
                    </form>
                </div>
                {user?.privilege === 'user' ?
                    <div className={styles.containerBot}>
                        <div>
                            {hideReview ?
                                <div>
                                    <button onClick={changereview} className={styles.buttonCompra} >Enviar comentario</button>
                                    <div className={styles.review}>
                                        <textarea
                                            style={{ height: '5rem', width: '20rem' }}
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
                                </div>
                                :
                                <div className={styles.gracias} >
                                    <h1 className={styles.Hrating}><span className={styles.hspan} >Gracias por dejar su comentario</span></h1>
                                </div>
                            }
                        </div>
                        <div >
                            {hideRating ?
                                <div className={styles.estrellas}>
                                    {[...Array(5)].map((star, index) => {
                                        const ratingvalue = index + 1;
                                        return <label>
                                            <input type='radio'
                                                name='Rating'
                                                value={ratingvalue}
                                                onClick={function pushrating() {
                                                    setRating([...rating, ratingvalue])
                                                    setHideRating(false)
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
                                    {/* <p className={styles.raiting}>Rating {totalrating}</p> */}
                                </div>
                                :
                                <div className={styles.sortthanks}>
                                    <h1 className={styles.Hrating}><span className={styles.hspan} >Gracias por dejar su votación</span></h1>
                                    <h1 className={styles.Hrating}><span className={styles.hspan} >Rating {totalrating}</span></h1>
                                </div>
                            }
                        </div>
                    </div>
                    : false}
                {/*                   {results.called ? <div><div>{results?.data?.addReview?.text}</div><div>{results?.data?.addReview?.rating}</div></div>
                        : false} */}
                <div className={styles.box}>
                    {filtred?.reviews.map(review =>
                        <div className={styles.content}>
                            <p className={styles.pReview} >{review.text}</p>
                            <p className={styles.pRanking}>{review.rating}<FaStar size={20} className='star' color={rating ? '#ffc107' : '#e4e5e9'} /></p>
                        </div>)}
                </div>
            </div>
        </React.Fragment>
    )
}

export default DetailsComponent



