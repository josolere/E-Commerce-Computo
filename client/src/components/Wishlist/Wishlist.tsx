import { useQuery } from '@apollo/client'
import React from 'react'
import { FILTER } from '../../gql/cardGql'
import Card from '../Cards/CardHome'
import Cards from '../Cards/CardsHome'
import styles from './Wishlist.module.scss'



export default function Wishlist() {

    // const {data} = useQuery(GET_WISHES)
    const {data} = useQuery(FILTER,{ variables: { name: "", categoriesId: 8 }})

    const wishes = data?.getProducts

    return (
        <div className={styles.container}>
            {wishes?.map((product:any) => <Card wish={true} id={product.id} name={product.name} image={product.image} price={product.price} count={1} stock={product.stock}  />)}
        </div>
    )
}