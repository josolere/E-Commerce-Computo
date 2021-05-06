import { useQuery } from '@apollo/client'
import React from 'react'
import { FILTER } from '../../gql/cardGql'
import { ACTUAL_USER } from '../../gql/loginGql'
import { WISHLIST } from '../../gql/wishlist'
import Card from '../Cards/CardHome'
import Cards from '../Cards/CardsHome'
import styles from './Wishlist.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import SadHeart from '../images/SadHeart.png'

export default function Wishlist() {

    // const {data} = useQuery(GET_WISHES)
    const currentUser = useQuery(ACTUAL_USER)
    const user = currentUser?.data?.currentUser
    const { data } = useQuery(WISHLIST, { variables: { userId: user?.id } })

    console.log(data)

    const wishes = data?.getWishList

    return (
        <div className={styles.back}>
            <div className={styles.organizar}>
                <div className={styles.caja}>
                    <div className={styles.containeTitle}>
                        <h1 className={styles.titleCreate} >Sus favoritos</h1>
                        <h1 className={styles.titleCreate}><FontAwesomeIcon style={{color:'#f05454'}} icon={faHeart} /></h1>
                    </div>
                    {wishes && wishes.length === 0 ? 
                        <div className={styles.sortSad} >
                            <h1 className={styles.titleCreate}  >Aún no agregaste favoritos</h1>
                            <p className={styles.pSad} >¡Empieza a descubrir productos increibles!</p>
                            <img className={styles.ImageHeart} src={SadHeart} alt='' />
                        </div>
                        :
                    <div className={styles.sortCardsWish} >
                        {wishes?.map((product: any) => <Card id={product.id} name={product.name} image={product.image} price={product.price} count={1} stock={product.stock} />)}
                    </div>}
                </div>
            </div>
        </div>

    )
}