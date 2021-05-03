import React from 'react';
import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import styles from './loguin.module.scss';
import { faCrown, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeSquare, faFileSignature, faSearch, faMapMarker, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GET_USERS, DELETE_USER } from "../../gql/login";
import styles3 from './CreateAdmin.module.scss';
import { toast } from 'react-toastify';
import styles2 from './AdminAuto.module.scss'

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


const AdminDelete = () => {

    const [deleteUser, user] = useMutation(DELETE_USER)

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

    const handleclickevent = () => {
        window.location.href = 'http://localhost:3000/Login'
    }

    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        deleteUser({
            variables: {
                id: logform.id
            }
        })
            .then((resolve) => { toast.success('Se ha eliminado el usuario 🥳'); SetAdmin(true) })
            .catch((error) => (console.log('Delete Mal')))
        event.preventDefault()
    }

    return (
        <div className={styles2.back}>
            <div className={styles2.organizar}>
                <div className={styles2.caja}>
                    <div className={styles.container}>
                        Borrar
                            <div className={styles.flip}>
                            <div><div>un</div></div>
                            <div><div>a</div></div>
                            <div><div>un</div></div>
                        </div>
                            Usuario
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
                        <div>
                            {searchInput.length > 1 ? <div className={styles3.OnlyOne} >
                                {auto.slice(0, 5).map(search => <button className={styles3.buttonSearch} onClick={() => {
                                    setAuto([])
                                    setUserToShow([])
                                }}>{search}   <FontAwesomeIcon style={{ marginLeft: '0.2rem' }} icon={faWindowClose} /></button>)}
                            </div> :
                                <span></span>}
                        </div>
                        {Admin ?
                            <div className={styles3.sort}>
                                <h1 className={styles3.Hrating}><span className={styles3.hspan} > Usuario eliminado {logform.firstname}</span></h1>
                            </div>
                            :
                            <div>
                                {userToshow && userToshow.map((item: any) => (
                                    <div className={styles3.sortUser} >
                                        <p className={styles3.UserP} ><FontAwesomeIcon icon={faFileSignature} /> Nombre: {item.name}</p>
                                        <p className={styles3.UserP} ><FontAwesomeIcon icon={faEnvelopeSquare} /> E-Mail: {item.email}</p>
                                        <p className={styles3.UserP} ><FontAwesomeIcon icon={faMapMarker} />Direccion: {item.address}</p>
                                        <p className={styles3.UserP} ><FontAwesomeIcon icon={faShareAlt} />Nombre de Usuario: {item.username} </p>
                                        <p className={styles3.UserP} ><FontAwesomeIcon icon={faCrown} /> Nivel: {item.privilege}</p>
                                    </div>
                                ))}
                            </div>}
                        <div className={styles.organizarbotones}>
                            <button className={styles3.buttonCreate} type='submit' >Borrar Usuario</button>
                            <button className={styles.boton} onClick={handleclickevent}>Volver Atras</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminDelete;
