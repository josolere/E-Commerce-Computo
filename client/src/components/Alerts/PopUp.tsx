import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PopUp.module.scss';
import { GET } from '../../gql/details';
import { useQuery } from '@apollo/client';
import South from '../images/South2.gif';

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

    let id = 19

    const { data } = useQuery<DetailsProduct>(GET, {
        variables: { id }
    });

    let productPopUp = data?.getProductById

    return (
        <div className={styles.OrderPop} >
            <div className={styles.box} >
                <div className={styles.content} >
                    <h4 className={styles.PopTitle} >Producto Destacado </h4>
                    <p className={styles.PPop} >{productPopUp?.name}</p>
                </div>
            </div>
            <div className={styles.box2} >
                <div className={styles.content2}>
                    <img className={styles.South1} src={South} alt='' />
                    <Link className={styles.ImagePopL} to={{
                        pathname: '/Detalles',
                        state: {
                            id: id,
                        }
                    }}>
                        <img className={styles.ImagePop} src={productPopUp?.image} alt='' />
                    </Link>
                    <img className={styles.South2} src={South} alt='' />

                </div>
            </div>
        </div>
    )
}

export default PopUp
