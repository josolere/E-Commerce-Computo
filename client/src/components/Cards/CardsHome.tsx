import React, { useEffect, useState } from 'react'
import Card from './CardHome'
import styles from './CardsHome.module.scss'
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
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
    name: string
}

const products = gql`
    query ($name: String!){
        getProducts (filter:{limit:12 name:$name}) {
            id
            name
            price
            image
            details
        }
    }
`;

export default function Cards() {

    const name = useSelector((store: AppState) => store.productReducer.filter)
    const categoriesId = useSelector((store: AppState) => Number(store.productReducer.categories) || [])

    const { loading, error, data } = useQuery<DetailsData>(products, { variables: { name: name } })
    const [count, setCount] = useState(1)

    useEffect(() => {
        console.log(data)
    }, [data])

    var product = data?.getProducts
    const [pageNumber, setPageNumber] = useState(0)

    const productsPerPage = 9
    const pageVisited = pageNumber * productsPerPage

    const pageCount = Math.ceil(product ? product.length / productsPerPage : 0)


    const changePage = ({ selected }: any) => {
        setPageNumber(selected)
    }

    const displayProducts = product?.slice(pageVisited, pageVisited + productsPerPage)
        .map(el => {
            return (
                <Card
                    key={el.id}
                    details={el.details}
                    count={count} id={el.id}
                    name={el.name}
                    image={el.image}
                    price={el.price}
                />
        
        );
})

return(
<div className={styles.container}>
{loading ? <h2 style={{ color: 'whitesmoke' }}>Cargando Productos...</h2> : false}
{product?.length === 0 ? <h2 style={{ color: 'whitesmoke' }}>El producto que busca no existe o no se encuentra disponible</h2> : false}
{product?.map(el =>
    <Card
        key={el.id}
        details={el.details}
        count={count} id={el.id}
        name={el.name}
        image={el.image}
        price={el.price}                    
    />)}
</div>
)}

{/* <div className={styles.container}>
    <ReactPaginate
        previousLabel={"«"}
        nextLabel={"»"}
        pageCount={pageCount}
        onPageChange={changePage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
    />
</div> */}
    

// }