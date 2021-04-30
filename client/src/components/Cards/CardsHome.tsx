import React, { useEffect, useState } from 'react'
import Card from './CardHome'
import { FILTER } from "../../gql/card"
import styles from './CardsHome.module.scss'
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import ReactPaginate from "react-paginate"
import { AppState } from '../../redux/reducers';
import PopUp from '../Alerts/PopUp';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    reset: number
}

export default function Cards({ reset }: IProps) {

    const name = useSelector((store: AppState) => store.productReducer.filter)
    const categoriesId = useSelector((store: AppState) => Number(store.productReducer.categories) || [])

    const { loading, error, data } = useQuery<DetailsData>(FILTER, { variables: { name: name, categoriesId: categoriesId } })
    
    const [count, setCount] = useState(1)

    const [isOpen, setIsOpen] = useState(true);

     /* const togglePopup = () => {
        setIsOpen(!isOpen);
    }  */

    const product = data?.getProducts
    const [pageNumber, setPageNumber] = useState(0)

    const productsPerPage = 8
    const pageVisited = pageNumber * productsPerPage

    useEffect(() => {
        setPageNumber(reset)
    }, [data, reset])

    const pageCount = Math.ceil(product ? product.length / productsPerPage : 0)


    const changePage = ({ selected }: any) => {
        setPageNumber(selected)
    }

    
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
{/*                { isOpen ?
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

