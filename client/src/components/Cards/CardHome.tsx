import React from 'react'
import styles from './Card.module.scss'

interface props {
    id?:number
    name:string
    image:string
    price:number
}

export default function Card({name, image, price, id}:props){
    return(
        <div className={styles.card}>
            <img style={{width:'10rem',height:'auto'}} src={image}/>
            <span style={{margin:'0rem 0rem 1rem 1rem'}}>{name}</span>            
            <div className={styles.buttons}>
            <button className={styles.learn}>Learn More</button>
            <button className={styles.buy}>${new Intl.NumberFormat().format(price)}</button>
            </div>
        </div>
    )
}