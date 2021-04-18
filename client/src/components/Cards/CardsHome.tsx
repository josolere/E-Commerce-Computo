import React, { useEffect, useState } from 'react'
import Card from './CardHome'
import styles from './CardsHome.module.scss'
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router';
import {useSelector } from 'react-redux';
import { FILTER } from "../../gql/card"
import ReactPaginate from "react-paginate"
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


export default function Cards(){

    const name = useSelector((store: AppState) => store.productReducer.filter)
    const categoriesId = useSelector((store: AppState) => Number(store.productReducer.categories) || [])
    
    const { loading, error, data } = useQuery<DetailsData>(FILTER,{variables:{name:name, categoriesId:categoriesId}})
    
    useEffect(()=>{
    },[data])
    
   var product = data?.getProducts

    const [pageNumber, setPageNumber] = useState(0)
 
    const productsPerPage = 9
    const pageVisited = pageNumber * productsPerPage

    const pageCount = Math.ceil(product ? product.length / productsPerPage : 0)


    const changePage = ({selected}:any) => {
        setPageNumber(selected)
    } 
      
        const displayProducts = product?.slice(pageVisited, pageVisited + productsPerPage)
        .map(el => {
            return ( 
             <Card id={el.id} name={el.name} image={el.image} price={el.price} />
         );
    })
    return <div className={styles.container}>{displayProducts}
        <ReactPaginate
        previousLabel={"«"}
        nextLabel={"»"}
        pageCount={pageCount}
        onPageChange={changePage}
        marginPagesDisplayed ={2}
        pageRangeDisplayed={5}
        />
       {/*  <div className={styles.footerCat}>Proximamente Redes</div> */}
 </div>
    
}