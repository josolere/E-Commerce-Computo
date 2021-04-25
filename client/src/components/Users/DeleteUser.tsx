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
import Swal from 'sweetalert2'

interface user {
    currentUser: {
        name: string,
        password: string,
        email: string
        id: string,
        surname:string,
        privilege:string,
        username:string,
        address:string
    }
}

const DeleteUser = () => {

    let user: any = {}

    const { data } = useQuery<user>(ACTUAL_USER)

    user = data?.currentUser

    const [deleteUser, results] = useMutation(DELETE_USER)

    const [logform, setLogform] = useState({
        email: '',
        password: '',
    });

    const handleinputchange = (event: React.FormEvent<HTMLInputElement>) => {
        setLogform({ ...logform, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handleclickevent = () => {
        window.location.href = 'http://localhost:3000/Login'
    }

    const handlesubmitchange = (event: any) => {
        event.preventDefault()

        Swal.fire({
            title: '<h3><font face="Montserrat, sans-serif">Eliminaras tu cuenta</font></h3>',
            icon: 'warning',
            html: '<p><font face="Montserrat, sans-serif">Estas seguro de eliminar tu cuenta?</font><p>',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Si',
            confirmButtonColor: "#ab3857",
            cancelButtonText: 'Cancelar',
            cancelButtonColor: "#2194c2",
        }).then(resp => {
            if (user?.email === logform.email && user?.password === logform.password) {
                if (resp.isConfirmed === true) {
                    deleteUser({
                        variables: { id: user?.id }
                    })
                        .then((resolve) => { window.location.href = 'http://localhost:3000/home'; })
                        .catch((err) => toast.error("Las credenciales no coinciden, intenta nuevamente"))
                }

            } else {
                toast.error('Los datos proporcionados no son correctos 🤔')
            }
        })
    }

    return (
        <div className={styles.back}>
            <div className={styles2.organizar2}>
                <div className={styles.caja}>
                    <div className={styles.container}>
                        Deseas 
                            <div className={styles.flip}>
                            <div><div>eliminar</div></div>
                            <div><div>tú</div></div>
                            <div><div>eliminar</div></div>
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
                            <button onClick={handlesubmitchange} className={styles.boton} type='submit' >Eliminar Usuario</button>
                            <button className={styles.boton} onClick={handleclickevent}>Volver Atras</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DeleteUser;