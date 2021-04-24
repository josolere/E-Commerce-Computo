import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import styles from './loguin.module.scss';
import styles2 from './Edit.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeSquare, faUnlock, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { DELETE_USER } from "../../gql/login"
import { Cookies } from "react-cookie";
import { toast } from 'react-toastify';



const CreateAdmin = () => {

    const [deleteUser, data] = useMutation(DELETE_USER)

    
    const [logform, setLogform] = useState({
        email: '',
        password: '',
        username: ''
    });

    const cookies = new Cookies
    const user = cookies.get("User")
    

    console.log(typeof user.id)
    const handleinputchange = (event: React.FormEvent<HTMLInputElement>) => {
        setLogform({ ...logform, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handleclickevent = () => {
        window.location.href = 'http://localhost:3000/Login'
    }

    const handlesubmitchange = (event:any) => {
        event.preventDefault()
        deleteUser({
            variables: { id: user.id }
        })
            .then((resolve) => { window.location.href = 'http://localhost:3000'; cookies.remove("User")})
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
                            <button onClick ={handlesubmitchange} className={styles.boton} type='submit' >Eliminar Usuario</button>
                            <button className={styles.boton} onClick={handleclickevent}>Volver Atras</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAdmin;