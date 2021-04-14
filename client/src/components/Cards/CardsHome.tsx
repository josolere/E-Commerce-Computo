import React, { useEffect, useState } from 'react'
import Card from './CardHome'
import styles from './CardsHome.module.scss'
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router';
import {useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';


interface DetailsProduct {
    id: number,
    brand: string,
    image: string,
    name: string,
    price: number,
    details: string,
}

interface DetailsData {
    getProducts: DetailsProduct[]
}

interface IParams {
    name:string
}

const products = gql`
    {
        getProducts (filter:{limit:12}) {
            id
            name
            price
            image
        }
    }
`;

const filter = gql`
    query ($name: String!, $categoriesId:[ID!]){
        getProducts (filter:{limit:12 name:$name categoriesId:$categoriesId}) {
            id
            name
            price
            image
        }
    }
`;

export default function Cards(){

    const name = useSelector((store: AppState) => store.productReducer.filter)
    const categoriesId = useSelector((store: AppState) => Number(store.productReducer.categories) || [])
   

    const { loading, error, data } = useQuery<DetailsData>(filter,{variables:{name:name, categoriesId:categoriesId}})
    

    useEffect(()=>{
    },[data])
    
   var product = data?.getProducts
      
    
    console.log(filter)
    return (
        <div className={styles.container}>
        {loading ? <h2 style={{color:'whitesmoke'}}>Cargando Productos...</h2> : false}
        {product?.length === 0?<h2 style={{color:'whitesmoke'}}>El producto que busca no existe o no se encuentra disponible</h2>:false}
        {product?.map(el => <Card id={el.id} name={el.name} image={el.image} price={el.price} />)  }         
        </div>
    )
}