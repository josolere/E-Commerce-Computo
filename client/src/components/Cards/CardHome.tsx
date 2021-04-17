import React from 'react'
import styles from './Card.module.scss'
import {Link} from 'react-router-dom'

interface props {
    id?:number
    name:string
    image:string
    price:number
}

export default function Card({name, image, price, id}:props){
    return(
        <div className={styles.card}>
        <Link className={styles.link} style={{textDecoration:'none'}} to={{
            pathname: '/Detalles',
            state: {
                id:id
            }
        }}>
            <p >{name}</p>            
            <img style={{width:'100%',height:'auto'}} src={image}/>
            </Link>
            {/* <div className={styles.buy}>${new Intl.NumberFormat().format(price)}</div> */}
            <div className={styles.buttons}>
            <button className={styles.buy}>${new Intl.NumberFormat().format(price)}</button>
            <button className={styles.learn}>Agregar</button>
            </div>
        </div>
    )
}