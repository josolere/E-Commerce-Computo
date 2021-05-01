import React, { useEffect, useState, useRef } from 'react';
import styles from './Payment.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import Logo from '../images/MercadoPago.png';
import styles2 from './PayCompleted.module.scss'

const PayCompleted = () => {

    return (
        <div className={styles2.back} >
            <div className={styles2.organizar} >
                <div className={styles2.caja} >
                <img className={styles2.LogoMP} src={Logo} alt='' />
                    <div className={styles2.ThanksSort}>
                        <h1 className={styles2.Thanks} >Gracias por su compra</h1>
                    </div>
                    <div>
                        <h4>Codigo de Compra</h4>
                    </div>
                    <div className={styles.organizarbotones} >
                        <button
                        className={styles2.boton}
                        >Volver a Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PayCompleted