import React, { useEffect, useState } from 'react'
import Card from './CardHome'
import styles from './CardsHome.module.scss'
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router';
import { RootStateOrAny, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';

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

interface IParams {
    name: string
}

const products = gql`
    query ($name: String!){
        getProducts (filter:{limit:12 name:$name}) {
            id
            name
            price
            image
            details
        }
    }
`;

export default function Cards() {

    const name = useSelector((store: AppState) => store.productReducer.filter)
   
    const { loading, error, data } = useQuery<DetailsData>(products, { variables: { name: name } })
    const [count, setCount] = useState(1)

    useEffect(() => {
        console.log(data)
    }, [data])

    const product = data?.getProducts

    return (
        <div className={styles.container}>
            {loading ? <h2 style={{ color: 'whitesmoke' }}>Cargando Productos...</h2> : false}
            {product?.length === 0 ? <h2 style={{ color: 'whitesmoke' }}>El producto que busca no existe o no se encuentra disponible</h2> : false}
            {product?.map(el =>
                <Card
                    key={el.id}
                    details={el.details}
                    count={count} id={el.id}
                    name={el.name}
                    image={el.image}
                    price={el.price}                    
                />)}
        </div>
    )
}