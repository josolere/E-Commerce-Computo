import React, { useEffect, useState } from 'react'
import Card from './CardHome'
import styles from './CardsHome.module.scss'
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router';
import { RootStateOrAny, useSelector } from 'react-redux';
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
    query ($name: String!){
        getProducts (filter:{limit:12 name:$name}) {
            id
            name
            price
            image
        }
    }
`;

/* const products : IProduct[] = [
    {name:'GAMER REDRAGON',img:'https://d3ugyf2ht6aenh.cloudfront.net/stores/896/208/products/h220-1_headset_1024x10242x2-954badd9ed46957ce915971658927709-1024-1024.png'},
    {name:'JBL ROSA',img:'https://www.jbl.com.pe/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw0fb18ea9/JBL_JR300BT_Pink_Fold-1605x1605px.png?sw=537&sfrm=png'},
    {name:'kOITON NOSECUANTO',img:'http://pngimg.com/uploads/headphones/headphones_PNG101982.png'},
    {name:'KOITON AZULES',img:'https://www.gamer24hs.com/IMGS/1606485816.png'},
    {name:'CORSAIR WORS',img:'https://clonesyperifericos.com/wp-content/uploads/2020/01/12-5.png'},
    {name:'LOGITECH GAMING',img:'https://www.spdigital.cl/img/products/G633-Review-Shot-01.jpg'},
    {name:'lOGITECH ROJOS',img:'https://www.pcfactory.cl/public/foto/32345/1_500.jpg?t=1551900957'},
    {name:'LOGITECH NARANJA',img:'https://www.winpy.cl/files/w12134_log981-000626%C3%A2%C2%B73.jpg'},
    {name:'AURIS VERDES',img:'https://www.klipxtreme.com/media/KHS-659-banner-top.png'},
    {name:'GETECH AZULES',img:'https://cdn.shopify.com/s/files/1/2584/5536/products/800_800_12fa48d2-16afa234f4f--7f893193053602387023096.upload_1024x1024.png?v=1582228883'},
    {name:'GETECH ROJOS',img:'https://cdn.shopify.com/s/files/1/2584/5536/products/800_800_12fa48d2-16afa234f4f--7f8d6506523086609125338.upload_1024x1024.png?v=1582228885'},
    {name:'GETECH MULTI',img:'https://m.media-amazon.com/images/I/61iQLvs2gUL._AC_SS450_.jpg'},
] */

export default function Cards(){
    // const[state,setState]: [any,Function] = useState({})
    const name = useSelector((store: AppState) => store.productReducer.filter)

    const { loading, error, data } = useQuery<DetailsData>(products,{variables:{name:name}})
    useEffect(()=>{
        console.log(data)
    },[data])

    const product = data?.getProducts


    console.log(product)

    return (
        <div className={styles.container}>
        {loading ? <h2 style={{color:'whitesmoke'}}>Cargando Productos...</h2> : false}
        {product?.length === 0?<h2 style={{color:'whitesmoke'}}>El producto que busca no existe o no se encuentra disponible</h2>:false}
        {product?.map(el => <Card id={el.id} name={el.name} image={el.image} price={el.price} />)  }         
        </div>
    )
}