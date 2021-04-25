import React from 'react';
import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import styles from './loguin.module.scss';
import styles2 from './Edit.module.scss';
import { faCrown, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeSquare, faFileSignature, faSearch, faMapMarker, faShareAlt, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EDIT_USER_MUTATION, GET_USERS } from "../../gql/login";
import styles3 from './CreateAdmin.module.scss';

interface user {
    firstname: string,
    email: string,
    id: string,
    surname: string,
    username: string,
    address: string
}

interface datauser {
    actualUser: user[]
}


const ResetPassword = () => {

    const [editUser, user] = useMutation(EDIT_USER_MUTATION)

    const resultsUsers = useQuery(GET_USERS)

    let ListUsers: Array<any> = [];

    let ListUsername: Array<any> = [];

    if (resultsUsers) {
        ListUsers = resultsUsers?.data?.getUsers
        ListUsername = ListUsers?.map((item: any) => item.email)
    }

    console.log(ListUsers)

    const [auto, setAuto] = useState<Array<string>>([""])

    const [searchInput, setSearchInput] = useState('')

    const [newPassword, setNewPassword] = useState('')

    const [userToshow, setUserToShow] = useState<Array<any>>([])

    const [logform, setLogform] = useState<user>({ firstname: "", email: "", id: "", surname: "", username:"", address:""});

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchInput(e.currentTarget.value)
        setAuto(ListUsername?.filter((email: any) =>
            email.toLowerCase().includes(searchInput.toLowerCase())
        ))
        setUserToShow(ListUsers?.filter((users) => users.email.toLowerCase() === auto.toString().toLocaleLowerCase()))
        userToshow?.map(function (user: any) {
            setLogform({ firstname: user.name, email: user.email, surname: user.surname, id: user.id, 
                username: user.username, address:user.address})
        })
    }

    const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
        setNewPassword(e.currentTarget.value)
    }

    console.log(logform)

    const handleclickevent = () => {
        window.location.href = 'http://localhost:3000/Login'
    }

    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        editUser({
            variables: {
                id: logform.id, email: logform.email, name: logform.firstname, surname: logform.surname,
                password:newPassword ,username:logform.username, address:logform.address, active: true, privilege: 'user'
            }
        })
            .then((resolve) => { console.log('Reset bien') })
            .catch((error) => (console.log('Reset Mal')))
        event.preventDefault()
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
                            <label htmlFor='password' className={styles.form__label} >
                                <FontAwesomeIcon icon={faUnlock} /> Contraseña Anterior</label>
                            <input
                                className={styles.form__field}
                                placeholder='Contraseña'
                                minLength={4}
                                maxLength={15}
                                type="password"
                                name='No'
                                required={true}
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
                                name='password'
                                onChange={handlePassword}
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
