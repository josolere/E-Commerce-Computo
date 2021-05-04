import { useQuery } from '@apollo/client'
import React from 'react'
import { FILTER } from '../../gql/cardGql'
import { ACTUAL_USER } from '../../gql/loginGql'
import { WISHLIST } from '../../gql/wishlist'
import Card from '../Cards/CardHome'
import Cards from '../Cards/CardsHome'
import styles from './Wishlist.module.scss'



export default function Wishlist() {

    // const {data} = useQuery(GET_WISHES)
    const currentUser = useQuery(ACTUAL_USER)
    const user = currentUser?.data?.currentUser
    const {data} = useQuery(WISHLIST,{ variables: { userId: user?.id }})

    console.log(data)

    const wishes = data?.getWishList

    return (
        <div className={styles.container}>
            {wishes?.map((product:any) => <Card id={product.id} name={product.name} image={product.image} price={product.price} count={1} stock={product.stock}  />)}
        </div>
    )
}