import React from 'react'
import { Link } from 'react-router-dom'
import styles from './PopUp.module.scss'
import { GET } from '../../gql/details'
import { useQuery } from '@apollo/client';


interface DetailsProduct {
    getProductById: {
        id: number
        brand: string
        image: string
        name: string
        price: number
        details: string
        categories: any[]
        reviews: any[]
    }
}

const PopUp = () => {

    let id = 14

    const { loading, error, data } = useQuery<DetailsProduct>(GET, {
        variables: { id }
    });

    let productPopUp = data?.getProductById

    return (
        <div className={styles.PopBox} >
            <div className={styles.Pop} >
                <div className={styles.OrderPop} >
                    <h4 className={styles.PopTitle} >Producto Destacado 🤩</h4>
                    <p className={styles.PPop} >{productPopUp?.name}</p>
                    <Link className={styles.ImagePop} to={{
                        pathname: '/Detalles',
                        state: {
                            id: id,
                        }
                    }}>
                        <img className={styles.ImagePop} src={productPopUp?.image} alt='' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PopUp
