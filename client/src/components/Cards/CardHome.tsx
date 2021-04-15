import React, { useState } from 'react'
import styles from './Card.module.scss'
import {Link} from 'react-router-dom'
import reactPaginate from "react-paginate"


interface props {
    id?:number
    name:string
    image:string
    price:number
}

export default function Card({name, image, price, id}:props){
   console.log("hola")
    
  console.log("esto me esta llegando" + name, id)
    return(
        <div className={styles.card}>
            
            <span style={{margin:'0rem 0rem 1rem 1rem'}}>{name}</span>            
            <Link to={{
                pathname: '/Detalles',
                state: {
                    id:id
                }
            }}>
            <img style={{width:'10rem',height:'auto'}} src={image}/>
            </Link>
            <div className={styles.buttons}>
            <button className={styles.learn}>Detalles del Producto</button>
            <button className={styles.buy}>${new Intl.NumberFormat().format(price)}</button>
            </div>
        </div>
    )
}