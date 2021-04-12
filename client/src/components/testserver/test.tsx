import React, { Fragment } from 'react';
import { useQuery, gql } from '@apollo/client';


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

const Pepe = gql` 
    {
        getProducts {
            id
            name
        }
    }
`;

const Test = () => {

    const { loading, error, data } = useQuery<DetailsData>(Pepe);

    const products = data?.getProducts

    console.log(data)
    console.log(products)

    return (
        <Fragment>
        <h1>Pepe</h1>
        <div>
            {products && products.map((item) => (
                <div>
                    <p>id: {item.id}</p>
                </div>
            ))}
        </div>
        </Fragment>
    )
}

export default Test