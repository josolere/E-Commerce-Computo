import React from 'react';
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
        <div>
            {products && products.map((item) => {
                <div>
                    {item.id}
                </div>
            })}
        </div>
    )
}

export default Test