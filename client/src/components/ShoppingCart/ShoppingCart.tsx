import { useSelector } from 'react-redux'
import ShoppingCard from './ShoppingCard'
import ShoppingTotal from './ShoppingTotal'
import carts from './ShoppingCarts.module.scss'
import { AppState } from '../../redux/reducers';

const ShoppingCart = (): JSX.Element => {

    let idsProducts: any[] = useSelector((store: AppState) => store.shoppingCartReducer.productTotal)

     /* const busqueda = idsProducts.reduce((acc, el) => {
    acc[el.id] = ++acc[el.id] || 0;
    return acc;
  }, {});  

  
    var duplicados = idsProducts.filter( (el) =>
         busqueda[el.id ] && el.count !== 1
    );
    
    console.log(duplicados)

    idsProducts = idsProducts.filter(el => {
        return !busqueda[el.id]
    }).concat(duplicados) */

    console.log(idsProducts)
    if (idsProducts?.length === 0) {
        if (localStorage.getItem('productsLocal')) {
            let productLocal: any = []
            productLocal = (localStorage.getItem('productsLocal'))
            productLocal = (JSON.parse(productLocal))
        }
    }       
    
        return (
            <>
                <div className={carts.containerCarts}>
                    {
                        idsProducts?.map((mapeo, index): any => {
                            if (mapeo.id !== 0) {
                                return <ShoppingCard key={index} priceProps={mapeo.price} id={mapeo.id} count={mapeo.count} />
                            }
                        })}
                    <ShoppingTotal />
                </div>
            </>
        )
    }

    export default ShoppingCart
