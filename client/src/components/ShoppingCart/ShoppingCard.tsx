import React, {useState} from 'react'
import cart from './ShoppingCard.module.css'
import img from '../images/PruebaShopping.jpg'

const ShoppingCard = (): JSX.Element => {
    let precio = 1000

    const [count, setCount] = useState(1)
    const [price, setPrice] = useState(precio)

    const accountantMore = () =>{
        setCount(count+1)
        setPrice(price + precio )
    }

    const accountantLess = () =>{
        if(count !== 1){
            setCount(count-1)
        setPrice(price - precio )
        }else{
            return count
        }
        
    }
    return (
        <>
            <div className={cart.containerCard}>
                <div className={cart.containerImg}>
                    <img className={cart.image} src={img} alt="producto" />
                </div>
                <div className={cart.containerTitle}>
                    <h1>CPU Gamer</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eos quam praesentium eius sapiente iusto odit at est,
                    quia doloremque accusantium minima tempora atque quidem aliquam nesciunt sequi,
                    animi in esse.
                </p>
                </div>

                <div className={cart.count}>
                    <button
                    id={count > 1 ?cart.buttonLess:undefined}
                    className={cart.buttonCountLess}
                    onClick={accountantLess}
                    >-</button>
                    <p>{count}</p>
                    <button 
                    className={cart.buttonCountMore}
                    onClick={accountantMore}                    
                    >+</button>
                </div>
                <div className={cart.containerPrice}>
                    <p className={cart.price}>${price}</p>
                </div>
                <div className={cart.containerClose}>
                    <button className={cart.buttonClose}>Eliminar</button>
                </div>
            </div>
        </>
    )
}

export default ShoppingCard
