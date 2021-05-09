import React, { useEffect, useState, useRef } from 'react';
import styles2 from './Shipments.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { faMapMarker, faCity, faMapMarkedAlt, faList, faEnvelope, faPhoneSquare } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './Payment.module.scss';
import Truck from '../images/Truck.png';
import styles3 from './MercadoV2.module.scss';
import { Link } from 'react-router-dom';
import { EDIT_ORDER, CURRENT_ORDER } from '../../gql/mercadopago';
import styles4 from './Responsive.module.scss';
import { ACTUAL_USER } from '../../gql/loginGql';

const PostPayment = () => {

    const productos = useSelector((store: AppState) => store.shoppingCartReducer.productTotal)

    let priceTotal = useSelector((store: AppState) => store.shoppingCartReducer.priceSubTotal).toString()

    const user = useQuery(ACTUAL_USER)

    let currentuser = user?.data?.currentUser

    const currentOrder = useQuery(CURRENT_ORDER, {variables:{idUser:currentuser?.id, status:'pendiente'}})

    let idOrder = currentOrder?.data?.getOrderByStatus[0]?.id

    const [editOrder, dataOrder] = useMutation(EDIT_ORDER)

    const [goToPay, setGoToPay] = useState(true)

    const [shipments, setShipments] = useState({
        state: '',
        city: '',
        street: '',
        ZIPcode:'',
        phone:''
    })
    console.log(productos)
    console.log('USER',currentuser)
    console.log('ORDER', idOrder)

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setShipments({ ...shipments, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        editOrder({
            variables:{id:idOrder, street:shipments.street === '' ? currentuser?.street : shipments.street, 
            phone: shipments.phone === '' ? currentuser?.phone : shipments.phone, city: shipments.city === '' ? currentuser?.city : shipments.city,
            state: shipments.state === '' ? currentuser?.state : shipments.state, zip: shipments.ZIPcode === '' ? currentuser?.zip : shipments.ZIPcode
        }
        })
        .then((resolve) => console.log(resolve?.data))
        .catch((error) => console.log('EDIT MAL'))
        setGoToPay(false)
        event.preventDefault()
    }

    return (
        <div className={styles4.back} >
            <div className={styles4.organizar} >
                <div className={styles4.caja} >
                    <div className={styles.sortUp} >
                        <img className={styles.LogoMP} src={Truck} alt='' />
                        <form className={styles.form} onSubmit={handleSubmit} >
                            <div className={styles4.form__group}>
                                <label className={styles4.form__label} htmlFor="email">
                                    <FontAwesomeIcon icon={faMapMarkedAlt} /> Provincia</label>
                                <input
                                    defaultValue={currentuser?.state}
                                    className={styles4.form__field}
                                    onChange={handleChange}
                                    id="email"
                                    name="state"
                                    type="text"
                                    required={true}
                                />
                            </div>
                            <div className={styles4.form__group}>
                                <label className={styles4.form__label} htmlFor="email">
                                    <FontAwesomeIcon icon={faCity} /> Localidad</label>
                                <input
                                    defaultValue={currentuser?.city}
                                    className={styles4.form__field}
                                    onChange={handleChange}
                                    id="email"
                                    name="city"
                                    type="text"
                                    required={true}
                                />
                            </div>
                            <div className={styles4.form__group}>
                                <label className={styles4.form__label} htmlFor="email">
                                    <FontAwesomeIcon icon={faMapMarker} /> Dirección</label>
                                <input
                                    defaultValue={currentuser?.street}
                                    className={styles4.form__field}
                                    onChange={handleChange}
                                    id="email"
                                    name="street"
                                    type="text"
                                    required={true}
                                />
                            </div>
                            <div className={styles4.form__group}>
                                <label htmlFor='address' className={styles4.form__label} >
                                    <FontAwesomeIcon icon={faEnvelope} aria-hidden={true} /> Código Postal</label>
                                <input
                                    defaultValue={currentuser?.zip}
                                    className={styles4.form__field}
                                    type='text'
                                    minLength={4}
                                    maxLength={5}
                                    placeholder='Código Postal'
                                    name='ZIPcode'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles4.form__group}>
                                <label htmlFor='address' className={styles4.form__label} >
                                    <FontAwesomeIcon icon={faPhoneSquare} aria-hidden={true} /> Telefono</label>
                                <input
                                    defaultValue={currentuser?.phone}
                                    className={styles4.form__field}
                                    type='text'
                                    minLength={5}
                                    maxLength={30}
                                    placeholder='Telefono'
                                    name='phone'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles2.sortTotal} >
                                <h1 className={styles3.HTotal} >Detalles de la compra</h1>
                                <div>
                                    {productos && productos.map((item: any, index: number) => (
                                        <div className={styles2.SortMapShip} >
                                            <p key={index} className={styles2.PMaped} >
                                                <FontAwesomeIcon icon={faList} style={{ marginRight: '2%' }} /> {item.name} X {item.count}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {goToPay ?
                                <div className={styles4.organizarbotones} >
                                    <button
                                        type='submit'
                                        className={styles2.boton}
                                    >Confirmar Envío</button>
                                </div>
                                :
                                <div className={styles4.organizarbotones} >
                                    <Link to={{
                                        pathname: '/Mercado',
                                        state: {
                                            price: priceTotal,
                                        }
                                    }}>
                                        <button
                                            className={styles2.boton}
                                        >Continuar</button>
                                    </Link>
                                </div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPayment