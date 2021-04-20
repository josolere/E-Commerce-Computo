import { useEffect, useState } from 'react'
import Card from './CardHome'
import { FILTER } from "../../gql/card"
import styles from './CardsHome.module.scss'
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
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

interface IProps {
    reset:number
}


export default function Cards({reset}:IProps) {

    const name = useSelector((store: AppState) => store.productReducer.filter)
    const categoriesId = useSelector((store: AppState) => Number(store.productReducer.categories) || [])

    const { loading, error, data } = useQuery<DetailsData>(FILTER,{variables:{name:name, categoriesId:categoriesId}})   
    const [count, setCount] = useState(1)

    

    var product = data?.getProducts
    const [pageNumber, setPageNumber] = useState(0)

    const productsPerPage = 8
    const pageVisited = pageNumber * productsPerPage

    useEffect(() => {
       setPageNumber(reset)
    }, [data, reset])

    const pageCount = Math.ceil(product ? product.length / productsPerPage : 0)


    const changePage = ({selected}:any) => {
        setPageNumber(selected)
    } 
      
    /* return (
        <div className={styles.container}>
        {loading ? <h2 style={{color:'whitesmoke'}}>Cargando Productos...</h2> : false}
        {product?.length === 0?<h2 style={{color:'whitesmoke'}}>El producto que busca no existe o no se encuentra disponible</h2>:false} */
        const displayProducts = product?.slice(pageVisited, pageVisited + productsPerPage)
        .map(el => {
            return ( 
             <Card id={el.id} name={el.name} image={el.image} price={el.price} count={count} />
         );
    })
    return <div className={styles.container}>{displayProducts}
        <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        marginPagesDisplayed ={2}
        pageRangeDisplayed={5}
        />
 </div>
    
}
 
