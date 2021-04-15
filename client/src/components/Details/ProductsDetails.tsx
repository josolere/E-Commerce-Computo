import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import { FaStar } from 'react-icons/fa'
import '../rating/rating.css'
import styles from "./ProductDetail.module.scss"

interface DetailsProduct {
    getProductById: {
        id: number
        brand: string
        image: string
        name: string
        price: number
        details: string
    }
}

interface Review {
    rating: number
    review: string
}

const ReviewMutation = gql`
    mutation ReviewMutation ( $rating:Int! $text: String! $product:Int!) {
        addReview ( input: {rating: $rating text:$text product:$product} )
        {
            rating
            text
            id
        }
    }
`;

const EDIT_PRODUCT = gql `
    mutation editProduct ($name: String!, $price: Float!, $brand: String!, $image: String!, $details: String!, $categoryId: Int!){
        editProduct ( input: {
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
        price
        brand
        image
        details
        categoryId
    }
    }
`

const GET = gql`
    query ($id:ID!) {
        getProductById(id:$id)
        {
            id
            name
            price
            brand
            details
            image
        }
}`;

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

    const [editProduct, resultsEdit] = useMutation(EDIT_PRODUCT)

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

    const handleEdit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        editProduct({variables:{}})
    }

    const [state,setState] = useState({name:"",brand:filtred?.brand,details:filtred?.details,price:filtred?.price,image:filtred?.image})

    return (
        <div className={styles.contenedorAll}>
            <NavBar />
            <div className={styles.contenedorDetail}>
                <img src={filtred?.image} alt='' />
                <div >
                    {true ? <input type='text' defaultValue={filtred?.name} value={state.name} /> : <h1  className={styles.nameDetail}>{filtred?.name}</h1>}
                    {true ? <p > Marca: <span contentEditable>{filtred?.brand}</span> </p> : <p> Marca: {filtred?.brand} </p>}
                    {true ? <p contentEditable> Detalles: {filtred?.details}</p> : <p > Detalles: {filtred?.details}</p>}
                    <div  className={styles.botonPrecio}>
                        <h2 className={styles.precioDetail}>${new Intl.NumberFormat().format(filtred?.price || 0)}</h2>
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
                </div>
            </div>
        </div>
    )
}

export default DetailsComponent
