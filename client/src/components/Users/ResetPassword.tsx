import React from 'react';
import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import styles from './loguin.module.scss';
import { faCrown, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeSquare, faFileSignature, faSearch, faMapMarker, faShareAlt, faUnlock, faAt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CHANGE_PASSWORD, ACTUAL_USER } from "../../gql/loginGql";
import styles2 from './SmallForm.module.scss';
import { toast } from 'react-toastify';

interface user {
    currentUser: {
        name: string,
        password: string,
        email: string
        id: string,
        surname: string,
        privilege: string,
        username: string,
        address: string
    }
}


const ResetPassword = () => {

    const [editUser, user] = useMutation(CHANGE_PASSWORD)

    let currentuser: any = {}

    const { data } = useQuery<user>(ACTUAL_USER)

    currentuser = data?.currentUser

    const [control, setControl] = useState({ email: '', password: '', newpassword: '' })

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setControl({ ...control, [event?.currentTarget.name]: event?.currentTarget.value })
    }


    console.log(control)

    const handleclickevent = () => {
        window.location.href = 'http://localhost:3000/Login'
    }

    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (currentuser?.email === control.email) {
            editUser({
                variables: {
                    password: control.newpassword, id: currentuser?.id
                }
            })
                .then((resolve) => { toast.success('Tienes una nueva contraseña 🥳') 
                setTimeout(function(){window.location.href = 'http://localhost:3000/Home';}, 2000) })
                .catch((error) => (console.log('Reset Mal')))
        }
        else {
            toast.error('Los datos proporcionados no son correctos 🤔')
        }
    }

    return (
        <div className={styles2.back}>
            <div className={styles2.organizar}>
                <div className={styles2.caja}>
                    <div className={styles.container}>
                        ASIGNA
                            <div className={styles.flip}>
                            <div><div>NUEVA</div></div>
                            <div><div>UNA</div></div>
                            <div><div>NUEVA</div></div>
                        </div>
                            CONTRASEÑA
                            </div>
                    <form className={styles.form} onSubmit={handlesubmitchange}>
                        <div className={styles.form__group}>
                            <label className={styles.form__label} >
                                <FontAwesomeIcon icon={faAt} /> E-mail</label>
                            <input
                                className={styles.form__field}
                                type='text'
                                placeholder='E-Mail'
                                name='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.form__group}>
                            <label htmlFor='password' className={styles.form__label} >
                                <FontAwesomeIcon icon={faUnlock} /> Contraseña Anterior</label>
                            <input
                                className={styles.form__field}
                                placeholder='Contraseña'
                                minLength={4}
                                maxLength={15}
                                type="password"
                                name='password'
                                required={true}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.form__group}>
                            <label htmlFor='password' className={styles.form__label} >
                                <FontAwesomeIcon icon={faUnlock} /> Nueva Contraseña</label>
                            <input
                                className={styles.form__field}
                                placeholder='Nueva Contraseña'
                                minLength={4}
                                maxLength={15}
                                type="password"
                                name='newpassword'
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                        <div className={styles.organizarbotones}>
                            <button className={styles.boton} type='submit' >Resetear Contraseña</button>
                            <button className={styles.boton} onClick={handleclickevent}>Volver Atrás</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
