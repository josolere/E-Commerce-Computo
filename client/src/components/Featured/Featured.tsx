import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ACTUAL_USER } from '../../gql/loginGql'
import { WISHLIST } from '../../gql/wishlist'
import styles from './Featured.module.scss'
import  {AiFillStar, AiFillAccountBook } from 'react-icons/ai'

export default function Featured (){

    const currentUser = useQuery(ACTUAL_USER)
    const user = currentUser?.data?.currentUser

    const wishes = useQuery(WISHLIST, {variables:{userId:user?.id}})
    const featured = wishes?.data?.getWishList


    if(featured?.length > 5){

        return(
            <div className={styles.container}>
            
           <h6><AiFillStar/> DESTACADOS <AiFillStar/></h6>
           
        <div className={styles.containerImgs}>

            {featured?.length > 5 && featured?.slice(0,5).map((product:any) =>
                <Link to={{
                    pathname: '/Detalles',
                    state: {
                        id: product.id,
                        newprice: 0
                    }
                }}>
                <img style={{width:'auto', height:'8rem'}} src={product.image}/>
                </Link>
            )}
            </div>
        </div>
    )
}else return (<></>)
}