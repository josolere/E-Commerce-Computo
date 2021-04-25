import React from 'react';
import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import styles from './loguin.module.scss';
import styles2 from './Edit.module.scss';
import { faCrown, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeSquare, faFileSignature, faSearch, faMapMarker, faShareAlt, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EDIT_USER_MUTATION, ACTUAL_USER } from "../../gql/login";
import styles3 from './CreateAdmin.module.scss';
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

    const [editUser, user] = useMutation(EDIT_USER_MUTATION)

    let currentuser: any = {}

    const { data } = useQuery<user>(ACTUAL_USER)

    currentuser = data?.currentUser

    const [control, setControl] = useState({ email: '', password: '', newpassword: '' })

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setControl({ ...control, [event?.currentTarget.name]: event?.currentTarget.value })
    }



    const handleclickevent = () => {
        window.location.href = 'http://localhost:3000/Login'
    }

    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (currentuser?.password === control.password && currentuser?.email === control.email) {
            editUser({
                variables: {
                    id: currentuser?.id, email: currentuser?.email, name: currentuser?.name, surname: currentuser?.surname,
                    password: control.newpassword, username: currentuser?.username, address: currentuser?.address, active: true, privilege: currentuser?.privilege
                }
            })
                .then((resolve) => { console.log('Reset bien') })
                .catch((error) => (console.log('Reset Mal')))
        }
        else {
            toast.error('Los datos proporcionados no son correctos 🤔')
        }
    }

    return (
        <div className={styles.back}>
            <div className={styles2.organizar2}>
                <div className={styles.caja}>
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
                            <label className={styles3.form__label} >
                                <FontAwesomeIcon icon={faEnvelopeSquare} /> E-mail</label>
                            <input
                                className={styles.form__field}
                                type='text'
                                placeholder='E-Mail'
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.form__group}>
                            <label htmlFor='password' className={styles3.form__label} >
                                <FontAwesomeIcon icon={faUnlock} /> Contraseña Anterior</label>
                            <input
                                className={styles.form__field}
                                placeholder='Contraseña'
                                minLength={4}
                                maxLength={15}
                                type="password"
                                name='No'
                                required={true}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.form__group}>
                            <label htmlFor='password' className={styles3.form__label} >
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
                            <button className={styles.boton} onClick={handleclickevent}>Volver Atras</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
