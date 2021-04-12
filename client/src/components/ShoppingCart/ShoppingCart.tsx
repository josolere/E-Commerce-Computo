import React from 'react'
import NavBar from '../NavBar/NavBar'
import ShoppingCard from './ShoppingCard'
import ShoppingTotal from './ShoppingTotal'
import carts from './ShoppingCarts.module.css'

const ShoppingCart = (): JSX.Element => {
    return (
        <>
            <NavBar />
            <div className={carts.containerCarts}>
                <ShoppingCard />
                <ShoppingCard />
                <ShoppingCard />
                <ShoppingCard />
                <ShoppingTotal />
            </div>

        </>
    )
}

export default ShoppingCart
