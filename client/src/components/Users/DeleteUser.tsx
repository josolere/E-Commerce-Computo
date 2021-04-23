import React from 'react';
import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import styles from './loguin.module.scss';
import { useCookies } from "react-cookie";
import styles2 from './Edit.module.scss';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeSquare, faUnlock, faFileSignature, faMapMarker, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { DELETE_USER } from "../../gql/login"


const CreateAdmin = () => {

    const [deleteUser, data] = useMutation(DELETE_USER)

    const [logform, setLogform] = useState({
        email: '',
        password: '',
        username: ''
    });

    const handleinputchange = (event: React.FormEvent<HTMLInputElement>) => {
        setLogform({ ...logform, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handleclickevent = () => {
        window.location.href = 'http://localhost:3000/Login'
    }

    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        deleteUser({
            variables: { id: 1 }
        })
            .then((resolve) => { console.log('Usuario Eliminado') })
            .catch((err) => (console.log('No se elimino')))
    }

    return (
        <div className={styles.back}>
            <div className={styles2.organizar2}>
                <div className={styles.caja}>
                    <div className={styles.container}>
                        Elimina
                            <div className={styles.flip}>
                            <div><div>tus</div></div>
                            <div><div>tus</div></div>
                            <div><div>tus</div></div>
                        </div>
                            datos
                            </div>
                    <form className={styles.form} >
                        <div className={styles.form__group}>
                            <label htmlFor='email' className={styles.form__label} >
                                <FontAwesomeIcon icon={faEnvelopeSquare} /> E-Mail</label>
                            <input
                                className={styles.form__field}
                                placeholder='E-mail'
                                minLength={10}
                                maxLength={30}
                                type='email'
                                name='email'
                                onChange={handleinputchange}
                                required={true}
                            />
                        </div>
                        <div className={styles.form__group}>
                            <label htmlFor='password' className={styles.form__label} >
                                <FontAwesomeIcon icon={faUnlock} /> Contraseña</label>
                            <input
                                className={styles.form__field}
                                placeholder='Nueva Contraseña'
                                minLength={4}
                                maxLength={15}
                                type="password"
                                name='password'
                                onChange={handleinputchange}
                                required={true}
                            />
                        </div>
                        <div className={styles.form__group}>
                            <label htmlFor='username' className={styles.form__label} >
                                <FontAwesomeIcon icon={faShareAlt} /> Nombre de Usuario</label>
                            <input
                                className={styles.form__field}
                                type='text'
                                minLength={5}
                                maxLength={15}
                                placeholder='Nombre de Usuario'
                                name='username'
                                onChange={handleinputchange}
                            />
                        </div>
                        <div className={styles.organizarbotones}>
                            <button className={styles.boton} type='submit' >Eliminar Usuario</button>
                            <button className={styles.boton} onClick={handleclickevent}>Volver Atras</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAdmin;