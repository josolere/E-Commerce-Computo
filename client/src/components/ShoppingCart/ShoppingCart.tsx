import { useSelector, useDispatch } from 'react-redux'
import ShoppingCard from './ShoppingCard'
import ShoppingTotal from './ShoppingTotal'
import carts from './ShoppingCarts.module.scss'
import { AppState } from '../../redux/reducers';
import { useEffect } from 'react';


const ShoppingCart = (): JSX.Element => {

    let idsProducts: any[] = useSelector((store: AppState) => store.shoppingCartReducer.productTotal)

    
    if (idsProducts.length === 0) {
        if (localStorage.getItem('productsLocal')) {
            let productLocal: any = []
            productLocal = (localStorage.getItem('productsLocal'))
            productLocal = (JSON.parse(productLocal))
        }
    }
    return (
        <div className={carts.containerCarts}>
            {
                idsProducts.map((mapeo, index): any => {
                    if (mapeo.id !== 0) {
                        return <ShoppingCard key={index} priceProps={mapeo.price} id={mapeo.ProductId || mapeo.id} count={mapeo.count || mapeo.quantity} />
                    }
                })}
            <ShoppingTotal products={idsProducts} />
        </div>

    )
}

export default ShoppingCart
