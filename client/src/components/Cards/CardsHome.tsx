<<<<<<< HEAD
import { useEffect, useState } from 'react'
=======
import React, { useEffect, useState } from 'react'
>>>>>>> front_roto
import Card from './CardHome'
import { FILTER } from "../../gql/card"
import styles from './CardsHome.module.scss'
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import ReactPaginate from "react-paginate"
import { AppState } from '../../redux/reducers';
<<<<<<< HEAD


=======
import PopUp from '../Alerts/PopUp';
import { faCross, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
>>>>>>> front_roto

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
<<<<<<< HEAD
    reset:number
}


export default function Cards({reset}:IProps) {
=======
    reset: number
}

export default function Cards({ reset }: IProps) {
>>>>>>> front_roto

    const name = useSelector((store: AppState) => store.productReducer.filter)
    const categoriesId = useSelector((store: AppState) => Number(store.productReducer.categories) || [])

<<<<<<< HEAD
    const { loading, error, data } = useQuery<DetailsData>(FILTER,{variables:{name:name, categoriesId:categoriesId}})   
    const [count, setCount] = useState(1)

    

    var product = data?.getProducts
=======
    const { loading, error, data } = useQuery<DetailsData>(FILTER, { variables: { name: name, categoriesId: categoriesId } })
    
    const [count, setCount] = useState(1)

    const [isOpen, setIsOpen] = useState(true);

   /*  const togglePopup = () => {
        setIsOpen(!isOpen);
    } */

    const product = data?.getProducts
>>>>>>> front_roto
    const [pageNumber, setPageNumber] = useState(0)

    const productsPerPage = 8
    const pageVisited = pageNumber * productsPerPage

    useEffect(() => {
<<<<<<< HEAD
       setPageNumber(reset)
=======
        setPageNumber(reset)
>>>>>>> front_roto
    }, [data, reset])

    const pageCount = Math.ceil(product ? product.length / productsPerPage : 0)


<<<<<<< HEAD
    const changePage = ({selected}:any) => {
        setPageNumber(selected)
    } 
      
=======
    const changePage = ({ selected }: any) => {
        setPageNumber(selected)
    }

>>>>>>> front_roto
    /* return (
        <div className={styles.container}>
        {loading ? <h2 style={{color:'whitesmoke'}}>Cargando Productos...</h2> : false}
        {product?.length === 0?<h2 style={{color:'whitesmoke'}}>El producto que busca no existe o no se encuentra disponible</h2>:false} */
<<<<<<< HEAD
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
 
=======
    const displayProducts = product?.slice(pageVisited, pageVisited + productsPerPage)
        .map(el => {
            return (
                <Card id={el.id} name={el.name} image={el.image} price={el.price} count={count} />
            );
        })

    const closePopup = () => {
        setIsOpen(false)
    }

    return (
        <React.Fragment>
            <div className={styles.container}>{displayProducts}
               {/*  {isOpen ?
                    <div className={styles.PopBox}>
                        <button onClick={closePopup} className={styles.PopButton} >
                        <FontAwesomeIcon icon={faTimes} aria-hidden={true} /></button>
                        <div className={styles.Pop} >
                            <PopUp />
                        </div>
                    </div> : false} */}
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                />
            </div>
        </React.Fragment>
    )
}

>>>>>>> front_roto
