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

    const productest = [{
        id: 10,
        name: 'Nvidia 3080',
        image: 'https://static2.srcdn.com/wordpress/wp-content/uploads/2020/09/RTX-3080-close-up.jpg',
        details: 'High expensive',
        price: 1000,
        brand: 'Nvidia'
    }]

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

    /*     const id = props.history.location.state.id */

    const id = 10

    const filtred = productest.filter(item => item.id === id)

    const title = filtred.map(item => item.name)

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
                </div>
            ))}
                <div>
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
                </div>
            </div>
            <p>El rating de este producto es {totalrating}</p>
            <h4>Escribe una review</h4>
            <textarea
                name='review'
                value={reviewuser.review}
                onChange={(event) =>
                    setReviewuser({
                        ...reviewuser,
                        review: event.target.value
                    })}
            />
                                <Link to={{
                        pathname: '/payment',
                        state: {
                            id: id
                        }
                    }}>
                        <button>Comprar</button>
                    </Link>
        </Fragment>
    )
}

export default DetailsComponent