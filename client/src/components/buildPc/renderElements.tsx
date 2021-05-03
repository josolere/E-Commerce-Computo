import React from 'react';
import Card from '../Cards/CardHome'

export const RenderElements = (props:any): JSX.Element =>{
    const products = props.products;
        const showProducts = products?.map((el:any) => {
            return (
                <Card id={el.id} name={el.name} image={el.image} price={el.price} count={1} />
            );
        })

        return(
            showProducts
        )

}