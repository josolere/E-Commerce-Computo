import React from 'react';
import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import styles from './loguin.module.scss';
import { faCrown, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeSquare, faFileSignature, faSearch, faMapMarker, faShareAlt, faUnlock, faAt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CHANGE_PASSWORD, ACTUAL_USER, GET_USERS } from "../../gql/loginGql";
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

type SelectEvent = React.FormEvent<HTMLSelectElement>;

const ResetAdmin = () => {

    const [editUser, user] = useMutation(CHANGE_PASSWORD)

    let currentuser: any = {}

    const { data } = useQuery<user>(ACTUAL_USER)

    let users = useQuery(GET_USERS)

    let usermap = users?.data?.getUsers

    currentuser = data?.currentUser

    const [control, setControl] = useState({
        password: '',
        newpassword1: '',
        newpassword2: ''

    })

    const [idUser, setIdUser] = useState('')

    const [controlEmail, setControlEmail] = useState('')

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setControl({ ...control, [event?.currentTarget.name]: event?.currentTarget.value })
    }

    const handleSelect = (event: SelectEvent) => {
        setControlEmail(event.currentTarget.value)
        let filterid = usermap?.filter((item: any) => item.email === controlEmail)
        setIdUser(filterid[0]?.id)
    }

    const handleclickevent = () => {
        window.location.href = 'http://localhost:3000/Login'
    }

    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (control.newpassword1 === control.newpassword2 && idUser) {
            editUser({
                variables: {
                    password: control.newpassword1, id: idUser
                }
            })
                .then((resolve) => {
                    toast.success('Asiganste una nueva contraseña 🥳')
                })
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
                        <div className={styles.selectAdmin} >
                            <select 
                            onChange={handleSelect}
                            className={styles.Select} >
                                {usermap && usermap?.map((item: any, index: number) => (
                                    <option className={styles.Option} key={index}>{item.email}</option>))}
                            </select>
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
                                name='newpassword1'
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                        <div className={styles.form__group}>
                            <label htmlFor='password' className={styles.form__label} >
                                <FontAwesomeIcon icon={faUnlock} /> Control de Contraseña</label>
                            <input
                                className={styles.form__field}
                                placeholder='Nueva Contraseña'
                                minLength={4}
                                maxLength={15}
                                type="password"
                                name='newpassword2'
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

export default ResetAdmin;
