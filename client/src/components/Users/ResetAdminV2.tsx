import React from 'react';
import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import styles from './loguin.module.scss';
import { faCrown, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeSquare, faFileSignature, faSearch, faMapMarker, faShareAlt, faAt, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CREATE_ADMIN, GET_USERS } from "../../gql/loginGql";
import styles3 from './CreateAdmin.module.scss';
import { toast } from 'react-toastify';
import styles2 from './AdminAuto.module.scss'
import { CHANGE_PASSWORD, ACTUAL_USER } from "../../gql/loginGql";

interface user {
    firstname: string,
    password: string,
    email: string,
    id: string,
    surname: string,
    username: string,
    address: string,
}

interface datauser {
    actualUser: user[]
}


const CreateAdmin = () => {

    const [editUser, user] = useMutation(CHANGE_PASSWORD, { refetchQueries: [{ query: GET_USERS }] })

    const resultsUsers = useQuery(GET_USERS)

    let ListUsers: Array<any> = [];

    let ListUsername: Array<any> = [];

    if (resultsUsers) {
        ListUsers = resultsUsers?.data?.getUsers
        ListUsername = ListUsers?.map((item: any) => item.email)
    }

    const [control, setControl] = useState({
        newpassword1: '',
        newpassword2: ''

    })

    console.log(ListUsers)

    const [auto, setAuto] = useState<Array<string>>([""])

    const [searchInput, setSearchInput] = useState('')

    const [Admin, SetAdmin] = useState(false)

    const [userToshow, setUserToShow] = useState<Array<any>>([])

    const [logform, setLogform] = useState<user>({ firstname: "", password: "", email: "", id: "", surname: "", username: "", address: "" });

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchInput(e.currentTarget.value)
        setAuto(ListUsername?.filter((email: any) =>
            email.toLowerCase().includes(searchInput.toLowerCase())
        ))
        setUserToShow(ListUsers?.filter((users) => users.email.toLowerCase() === auto.toString().toLocaleLowerCase()))
        userToshow?.map(function (user: any) {
            setLogform({
                firstname: user.name, password: user.password, email: user.email, surname: user.surname, id: user.id,
                username: user.username, address: user.address
            })
        })
    }

    const handleChangePass = (event: React.FormEvent<HTMLInputElement>) => {
        setControl({ ...control, [event?.currentTarget.name]: event?.currentTarget.value })
    }

    const handleclickevent = () => {
        window.location.href = 'http://localhost:3000/Login'
    }

    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (control.newpassword1 === control.newpassword2) {
            editUser({
                variables: {
                    password: control.newpassword1, id: logform.id
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
                        <div className={styles.form__group}>
                            <label className={styles.form__label} >
                                <FontAwesomeIcon icon={faSearch} /> Buscar Usuario</label>
                            <input
                                className={styles.form__field}
                                type='text'
                                placeholder='Buscar usuario'
                                onChange={handleChange}
                                value={searchInput}
                            />
                        </div>
                        <div >
                            {/*     {searchInput.length > 1 ? <div className={styles3.OnlyOne} >
                                {auto.slice(0, 5).map(search => <button className={styles3.buttonSearch} onClick={() => {
                                    setAuto([])
                                    setUserToShow([])
                                }}>{search}   <FontAwesomeIcon style={{ marginLeft: '0.2rem' }} icon={faWindowClose} /></button>)}
                            </div> :
                                <span></span>} */}
                        </div>
                        {Admin ?
                            <div className={styles3.sort}>
                                <h1 className={styles3.Hrating}><span className={styles3.hspan} >Nueva contraseña para {logform.firstname}</span></h1>
                            </div>
                            :
                            <div>
                                {userToshow && userToshow.map((item: any) => (
                                    <div className={styles3.sortUser} >
                                        <p className={styles3.UserP} ><FontAwesomeIcon icon={faFileSignature} /> Nombre: {item.name}</p>
                                        <p className={styles3.UserP} ><FontAwesomeIcon icon={faFileSignature} /> Apellido: {item.surname}</p>
                                        <p className={styles3.UserP} ><FontAwesomeIcon icon={faAt} /> E-Mail: {item.email}</p>
                                        <p className={styles3.UserP} ><FontAwesomeIcon icon={faCrown} /> Nivel: {item.privilege}</p>
                                    </div>
                                ))}
                            </div>}
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
                                onChange={handleChangePass}
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
                                onChange={handleChangePass}
                                required={true}
                            />
                        </div>
                        <div className={styles.organizarbotones}>
                            <button className={styles3.buttonCreate} type='submit' >Reset Contraseña</button>
                            <button className={styles.boton} onClick={handleclickevent}>Volver Atras</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAdmin;
