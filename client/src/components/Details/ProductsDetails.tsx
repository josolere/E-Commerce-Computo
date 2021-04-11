import React, { Fragment, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'
import '../rating/rating.css'

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

interface PropsDetails {
    history: {
        location: {
            state: {
                id: number
            }
        }
    }
}

const GET = gql` 
    {
        getProducts {
            id
            name
        }
    }
`;

const DetailsComponent = (props: PropsDetails): JSX.Element => {

    const { loading, error, data } = useQuery<DetailsData>(GET);

    let [rating, setRating] = useState<Array<any>>([{
        id: null,
        rating: null
    }])

    const [hover, setHover] = useState(0)

    const [reviewuser, setReviewuser] = useState<Array<any>>([{
        id: null,
        review: null
    }])

    const [total, setTotal] = useState<Array<any>>([{
        id: null,
        totalrating: null
    }])

    const id = props.history.location.state.id

    const filtred = data?.getProducts.filter(item => item.id === id)

    const title = filtred?.map(item => item.name)

    let totalrating: number = 0;

    let summulti: Array<number> = [];

    let sumlength: Array<number> = [];

    let count = 1;

    if (rating.length > 0) {
        while (count <= 5) {
            summulti.push(count * rating.filter(item => item.rating === count && item.id === id).length);
            sumlength.push(rating.filter(item => item.rating === count && item.id === id).length);
            count++;
        }
        totalrating = summulti.reduce((a, b) => a + b) / sumlength.reduce((a, b) => a + b)
        totalrating = parseFloat(totalrating.toFixed(2))
        setTotal([{ ...total, id: id, totalrating: totalrating }])
    }

    let showtotal: number;

    total.map(function (item) { if (item.id === id) showtotal = item.totalrating })

    return (
        <Fragment>
            <h1>Detalles del Producto</h1>
            <h3>{title}</h3>
            <div>{filtred && filtred.map((item, index: number) => (
                <div>
                    <img src={item.image} alt='' />
                    <p> Marca: {item.brand} </p>
                    <p> Nombre: {item.name} </p>
                    <p> Precio: {item.price}</p>
                    <p> Detalles: {item.details}</p>
                    <div>
                        {[...Array(5)].map((star, index: number) => {
                            const ratingvalue = index + 1;
                            return <label>
                                <input type='radio'
                                    name='Rating'
                                    value={ratingvalue}
                                    onClick={function pushrating() {
                                        setRating([{
                                            ...rating,
                                            id: item.id,
                                            rating: ratingvalue
                                        }])
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
                        <p>El rating de este producto es {showtotal}</p>
                    </div>
                    <h4>Escribe una review</h4>
                    <textarea
                        name='review'
                        value={reviewuser}
                        onChange={(event) =>
                            setReviewuser([{
                                ...reviewuser,
                                id: item.id,
                                review: event.target.value
                            }])}
                    />
                    {reviewuser && reviewuser.map(function (itemreview, index: number) {
                        if (itemreview.id === item.id) {
                            <div key={index}>
                                {itemreview.review}
                            </div>
                        }
                    })}
                    <Link to={{
                        pathname: '/payment',
                        state: {
                            image: item.image,
                            price: item.price
                        }
                    }}>
                        <button>Comprar</button>
                    </Link>

                </div>
            ))}
            </div>
        </Fragment>
    )
}

export default DetailsComponent