import React from 'react';
import { useState } from 'react';
import styles from './loguin.module.scss';
import styles2 from './Edit.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeSquare, faUnlock, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { DELETE_USER } from "../../gql/login"
import { toast } from 'react-toastify';
import { useMutation, useQuery, gql } from '@apollo/client';
import { ACTUAL_USER, LOGOUT } from "../../gql/login";
 
interface user {
    currentUser: {
        name: string,
        password: string,
        email: string
    }
}

const DeleteUser = () => {

    let user:any = {}

    const {data} = useQuery<user>(ACTUAL_USER)

    user = data?.currentUser

    const [deleteUser, results] = useMutation(DELETE_USER)
    
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

    const handlesubmitchange = (event:any) => {

        event.preventDefault()
        deleteUser({
            variables: { id: user?.id }
        })
            .then((resolve) => { window.location.href = 'http://localhost:3000/home';})
            .catch((err) => toast.error("Las credenciales no coinciden, intenta nuevamente"))
    }

    return (
        <div className={styles.back}>
            <div className={styles2.organizar2}>
                <div className={styles.caja}>
                    <div className={styles.container}>
                        Deseas Eliminar
                            <div className={styles.flip}>
                            <div><div>tu</div></div>
                            <div><div>tu</div></div>
                            <div><div>tu</div></div>
                        </div>
                            cuenta ?
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
                        <div className={styles.organizarbotones}>
                            <button onClick ={handlesubmitchange} className={styles.boton} type='submit' >Eliminar Usuario</button>
                            <button className={styles.boton} onClick={handleclickevent}>Volver Atras</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DeleteUser;