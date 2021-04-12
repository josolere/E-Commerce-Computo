import React, { Fragment, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import NavBar from "../NavBar/NavBar";
import { FaStar } from 'react-icons/fa'
import '../rating/rating.css'
import styles from "./ProductDetail.module.scss"


interface DetailsProduct {
    id: number,
    brand: string,
    image: string,
    name: string,
    price: number,
    details: string,
}

interface DetailsData {
    getProducts: DetailsProduct[]
}

const GET = gql` 
    {
        getProducts {
            id
            name
            price
            details
            brand
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

    const { loading, error, data } = useQuery<DetailsData>(GET);

    let [rating, setRating] = useState<Array<any>>([])

    const [hover, setHover] = useState(0)

    const [reviewuser, setReviewuser] = useState({
        id: '',
        review: ''
    })

    const [total, setTotal] = useState<Array<any>>([{
        id: null,
        totalrating: null
    }])

    const id = props.history.location.state.id

    const filtred = data?.getProducts.filter(item => item.id == id)



    const product = filtred?.find(el => el)



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

    return (
        <div className={styles.contenedorAll}>
            <NavBar />
            <div className={styles.contenedorDetail}>
                <img src={product?.image} alt='' />
                <div >
                    <h1 className={styles.nameDetail}>{product?.name}</h1>
                    <p> Marca: {product?.brand} </p>
                    <p> Detalles: {product?.details}</p>
                    <div className={styles.botonPrecio}>
                        <h2 className={styles.precioDetail}>${new Intl.NumberFormat().format(product?.price || 0 )}</h2>
                        <div className={styles.estrellas}>
                            <div >
                                {[...Array(5)].map((star, index) => {
                                    const ratingvalue = index + 1;
                                    return <label>
                                        <input type='radio'
                                            name='Rating'
                                            value={ratingvalue}
                                            onClick={function pushrating() {
                                                setRating([...rating, ratingvalue])
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
                                <p>Rating {totalrating}</p>
                            </div>
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
                    <button className={styles.buttonCompra} >Guardar Review</button>
                </div>
            </div>
        </div>
    )
}

export default DetailsComponent
