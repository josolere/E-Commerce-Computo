import React from 'react'
import styles from './Card.module.scss'
import { Link } from 'react-router-dom'

interface props {
    id?: number
    name: string
    image: string
    price: number
}

export default function Card({ name, image, price, id }: props) {

    const nameoftheday = (fecha: any) => [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sabado',
    ][new Date(fecha).getDay()];

    const current = new Date();

    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    let dayoftheweek = (nameoftheday(current))

    let discountoftheweek: Array<any> = ['10%', '20%', '25%', '20%', '35%', '20%', '15%'];

    let discount: string = '0%';

    if (dayoftheweek === 'Lunes') {
        discount = discountoftheweek[0]
    }
    else if (dayoftheweek === 'Martes') {
        discount = discountoftheweek[1]
    }
    else if (dayoftheweek === 'Miercoles') {
        discount = discountoftheweek[2]
    }
    else if (dayoftheweek === 'Jueves') {
        discount = discountoftheweek[3]
    }
    else if (dayoftheweek === 'Viernes') {
        discount = discountoftheweek[4]
    }
    else if (dayoftheweek === 'Sabado') {
        discount = discountoftheweek[5]
    }
    else if (dayoftheweek === 'Domingo') {
        discount = discountoftheweek[6]
    }
    let discountoapply = parseInt(discount)

    let newprice: any
    newprice = price - (price * discountoapply / 100)
    newprice = parseInt(newprice)

    return (
        <div className={styles.card}>

            <Link className={styles.link} style={{ textDecoration: 'none' }} to={{
                pathname: '/Detalles',
                state: {
                    id: id,
                    newprice: newprice
                }
            }}>
                <p >{name}</p>
                <img style={{ width: '100%', height: 'auto' }} src={image} />
            </Link>

            {/* <div className={styles.buy}>${new Intl.NumberFormat().format(price)}</div> */}
            <div className={styles.buttons}>
                <button className={styles.buy}>${new Intl.NumberFormat().format(price)}</button>
                <button className={styles.buy}>${new Intl.NumberFormat().format(newprice)}</button>

                <button className={styles.learn}>Agregar</button>
            </div>
        </div>
    )
}