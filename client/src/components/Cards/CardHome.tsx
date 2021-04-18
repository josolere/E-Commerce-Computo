import React from "react";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

interface props {
  id?: number;
  name: string;
  image: string;
  price: number;
}

export default function Card({name, image, price, id}:props){

    
    return(
        <div className={styles.card}>
        
        <p >{name}</p> 
        
        <Link className={styles.link} style={{textDecoration:'none'}} to={{
            pathname: '/Detalles',
            state: {
                id:id
            }
        }}>
           
            <div className={styles.containerimg}>          
            <img  src={image}/>
            </div> 
            
            </Link>
           
           
            {/* <div className={styles.buy}>${new Intl.NumberFormat().format(price)}</div> */}
            <div className={styles.buttons}>
            <button className={styles.buy}>${new Intl.NumberFormat().format(price)}</button>
            <button className={styles.addCart}> 
            <FontAwesomeIcon icon={faCartPlus} /></button>
            </div>
        </div>
    
  );
}
