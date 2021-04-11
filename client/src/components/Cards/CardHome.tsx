import React from 'react'
import styles from './Card.module.scss'

interface props {
    name:string
    img:string
}

export default function Card({name,img}:props){
    return(
        <div className={styles.card}>
            <img style={{width:'10rem',height:'auto'}} src={img}/>
            <span style={{margin:'0rem 0rem 1rem 1rem'}}>{name}</span>            
            <div className={styles.buttons}>
            <button className={styles.learn}>Learn More</button>
            <button className={styles.buy}>$199</button>
            </div>
        </div>
    )
}