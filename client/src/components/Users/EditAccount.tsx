import React, { useEffect } from 'react';
import { useState } from 'react';
import { useMutation,  gql } from '@apollo/client';
import styles from './loguin.module.scss';
/* import { EDIT_USER_MUTATION } from "../../gql/login"
 */import styles2 from './Edit.module.scss';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { DELETE_USER } from "../../gql/login";
import { faEnvelopeSquare, faUnlock, faFileSignature, faMapMarker, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { Cookies } from "react-cookie";
import "./Edit.module.scss";
import Swal from 'sweetalert2';




interface user {
    actualuser: {
        name: string,
        password: string,
        email: string
    }
}

interface datauser {
    actualUser: user[]
}


const EditAccount = () => {

/*     const [editUser, data] = useMutation(EDIT_USER_MUTATION)
 */
    const [showMore, setShowMore] = useState(false)

   const [deleteUser, info] = useMutation(DELETE_USER)

   const cookies = new Cookies
   const user = cookies.get("User")


    const [logform, setLogform] = useState({
        email: '',
        newpassword: '',
        password: '',
        firstname: '',
        lastname: '',
        username: '',
        address: ''

    });

    const handleinputchange = (event: React.FormEvent<HTMLInputElement>) => {
        setLogform({ ...logform, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handleclickevent = () => {
        window.location.href = 'http://localhost:3000/Login'
    }

    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
/*         editUser({
            variables: {
                name: logform.firstname, email: logform.email, password: logform.password,
                surname: logform.lastname, username: logform.username, address: logform.address,
                privilege: 'Admin', active: true
            }
        })
            .then((resolve) => console.log(data))
            .catch((error) => { console.log('Edit Mal') }) */
    }


    const handleAlert = () => {
        Swal.fire({
            title: '<h3><font face="Montserrat, sans-serif">Eliminaras tu cuenta</font></h3>',
            icon: 'warning',
            html: '<p><font face="Montserrat, sans-serif">Estas seguro de eliminar tu cuenta?</font><p>',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Si',
            confirmButtonColor: "#ab3857",
            cancelButtonText:  'Cancelar',
            cancelButtonColor: "#2194c2",
           }).then(resp =>{
            if(resp.isConfirmed === true){
                deleteUser({
                    variables: { id: user.id }
                })
                    .then((resolve) => { window.location.href = 'http://localhost:3000'; cookies.remove("User")})
                    .catch((err) => toast.error("Las credenciales no coinciden, intenta nuevamente"))
            } else {
                return ""
            }
        })
    }

    return (
        <div className={styles.back}>
            <div className={styles2.organizar2}>
                <div className={styles.caja}>
                    <div className={styles.container}>
                        Modifica
                            <div className={styles.flip}>
                            <div><div>tus</div></div>
                            <div><div>datos</div></div>
                            <div><div>aquí</div></div>
                        </div>
                            Datos
                            </div>
                    <form className={styles.form} onSubmit={handlesubmitchange}>
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
                                <FontAwesomeIcon icon={faUnlock} /> Contraseña Anterior</label>
                            <input
                                className={styles.form__field}
                                placeholder='Contraseña'
                                minLength={4}
                                maxLength={15}
                                type="password"
                                name='password'
                                onChange={handleinputchange}
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
                                name='newpassword'
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
                        {showMore ?
                            <div className={styles2.showMore}>

                                <div className={styles.form__group}>
                                    <label htmlFor='name' className={styles.form__label} >
                                        <FontAwesomeIcon icon={faFileSignature} /> Nombre</label>
                                    <input
                                        className={styles.form__field}
                                        type='text'
                                        minLength={5}
                                        maxLength={20}
                                        placeholder='Nombre'
                                        name='firstname'
                                        onChange={handleinputchange}

                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='lastname' className={styles.form__label} >
                                        <FontAwesomeIcon icon={faFileSignature} /> Apellido</label>
                                    <input
                                        className={styles.form__field}
                                        type='text'
                                        minLength={5}
                                        maxLength={20}
                                        placeholder='Apellido'
                                        name='lastname'
                                        onChange={handleinputchange}

                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='address' className={styles.form__label} >
                                        <FontAwesomeIcon icon={faMapMarker} /> Dirección</label>
                                    <input
                                        className={styles.form__field}
                                        type='text'
                                        minLength={5}
                                        maxLength={30}
                                        placeholder='Dirección'
                                        name='address'
                                        onChange={handleinputchange}

                                    />
                                </div>
                                <div className={styles2.orderButtonEdit} >
                                    <button className={styles.boton} style={{width:"fit-content"}}onClick={() => setShowMore(!showMore)} >
                                        <FontAwesomeIcon icon={faMinus} />

                                    </button>
                                </div>
                                <div className={styles.organizarbotones}>
                                    <button className={styles.boton} type='submit' >Editar</button>
                                    <button className={styles.boton} onClick={handleclickevent}>Volver Atras</button>
                                </div>
                            </div>
                            :
                            <div className={styles2.showMore} >
                                <div className={styles2.orderButtonEdit} >
                                    <button className={styles.boton} style={{width:"fit-content"}} onClick={() => setShowMore(!showMore)} >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                                <div className={styles.organizarbotones}>
                                    <button className={styles.boton} type='submit' >Editar</button>
                                    <button className={styles.boton} onClick={handleclickevent}>Volver Atras</button>
                                </div>
                                {user ? <button onClick ={handleAlert} className={styles.boton} type='submit' >Eliminar Usuario</button> : <></>}
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditAccount;