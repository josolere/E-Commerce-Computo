import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import { FaStar } from 'react-icons/fa'
import '../rating/rating.css'
import styles from "./ProductDetail.module.scss"
import { text } from '@fortawesome/fontawesome-svg-core';


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

const Review_Mutation = gql`
    mutation MutationReview ( $rating: Int! $review: String!) {
        Product (rating: $rating review: $review )
        {
            id
            name
            price
            details
            brand
            image
            rating
            review
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
}

`;

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

    const [MutationReview] = useMutation<Review>(Review_Mutation)

    let [rating, setRating] = useState<Array<any>>([])

    const [hover, setHover] = useState(0)

    const [reviewuser, setReviewuser] = useState({
        review: ''
    })

    const [hidestar, setHidestar] = useState(true)

    const filtred = data?.getProductById

    let totalrating: number = 0

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
        MutationReview({ variables: { rating: totalrating, review: reviewuser.review }})
        .then(review =>{
            console.log('review up')
        })
        .catch((err) => {console.log('review mal')})
        alert('Gracias por dejar su review del producto')
    }

    return (
        <div className={styles.contenedorAll}>
            <NavBar />
            <div className={styles.contenedorDetail}>
                <img src={filtred?.image} alt='' />
                <div >
                    <h1 className={styles.nameDetail}>{filtred?.name}</h1>
                    <p> Marca: {filtred?.brand} </p>
                    <p> Detalles: {filtred?.details}</p>
                    <div className={styles.botonPrecio}>
                        <h2 className={styles.precioDetail}>${new Intl.NumberFormat().format(filtred?.price || 0)}</h2>
                        <div className={styles.estrellas}>
                            {hidestar ?
                                <div >
                                    {[...Array(5)].map((star, index) => {
                                        const ratingvalue = index + 1;
                                        return <label>
                                            <input type='radio'
                                                name='Rating'
                                                value={ratingvalue}
                                                onClick={function pushrating() {
                                                    setRating([...rating, ratingvalue])
                                                    setHidestar(false)
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
                                    <h1 className={styles.gracias} >Gracias por dejar su review</h1>
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
                    </div>
                    <button onClick={changereview} className={styles.buttonCompra} >Guardar Review</button>
                </div>
            </div>
        </div>
    )
}

export default DetailsComponent
