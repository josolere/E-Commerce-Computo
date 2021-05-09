import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import styles from './loguin.module.scss';
import { faCrown, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeSquare, faFileSignature, faSearch, faMapMarker, faShareAlt, faUnlock, faAt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CHANGE_PASSWORD, ACTUAL_USER, GET_USERS_BY_EMAIL } from "../../gql/loginGql";
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


const NuevaContraseña = () => {
    const firsstRender = useRef(true)
    
    const [editUser, user] = useMutation(CHANGE_PASSWORD)

    const [control, setControl] = useState({ email: '', password: '', newpassword: '' })
    const [idEmail, setIdEmail] = useState('')

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setControl({ ...control, [event?.currentTarget.name]: event?.currentTarget.value })
    }

    const { data } = useQuery(GET_USERS_BY_EMAIL, {
        variables: { email: control.email }
    });

    useEffect(() => {
        if (firsstRender.current) {
            firsstRender.current = false;
        } else {
            if (data) {
                let id = data?.getUserByEmail?.id
                setIdEmail(id)
            }
        }

    }, [data])

    const handleclickevent = () => {
        window.location.href = 'http://localhost:3000/Login'
    }

    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (control.password === control.newpassword) {
            editUser({
                variables: {
                    password: control.newpassword, id:idEmail
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
                                <FontAwesomeIcon icon={faUnlock} /> Nueva Contraseña</label>
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
                                <FontAwesomeIcon icon={faUnlock} /> Repetir Contraseña</label>
                            <input
                                className={styles.form__field}
                                placeholder='Repetir Contraseña'
                                minLength={4}
                                maxLength={15}
                                type="password"
                                name='newpassword'
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                        <div className={styles.organizarbotones}>
                            <button className={styles.boton} type='submit' >Enviar</button>
                            <button className={styles.boton} onClick={handleclickevent}>Volver Atrás</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NuevaContraseña
