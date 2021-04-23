import React, { useState } from 'react'
import Orders from './Orders'
import { useQuery, gql, useMutation } from '@apollo/client';
import { LIST_ORDER } from "../../gql/order"



const Order = () => {

    const [idUser, setIdUser] = useState("d0913ceb-616b-4dc0-837e-3f8eb22bc379")

    const { loading, error, data } = useQuery(LIST_ORDER, {
        variables: { idUser: idUser }
    });
    const arrayOrders = data?.getOrdersByIdUser
    console.log(arrayOrders)
    return (
        <>
            {arrayOrders?
                arrayOrders.map((mapeo: any) => {
                    return <Orders id={mapeo.id} status={mapeo.status} fecha={mapeo.createdAt} />
                }):console.log('loading')
            }

        </>
    )
}

export default Order
