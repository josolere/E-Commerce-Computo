import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector} from "react-redux"
import { useMutation, useQuery,  gql, useLazyQuery } from '@apollo/client';
import styles from './loguin.module.scss';
import { useCookies } from "react-cookie";
import styles2 from './Edit.module.scss';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ACTUAL_USER } from "../../gql/login"

interface DetailUser {
    id: number,
    name: string,
    
}



const EditAccount = () => {

    const [showMore, setShowMore] = useState(false)

     /* const { loading, error, data } = useQuery(ACTUAL_USER, {
        fetchPolicy: "no-cache"
      });
 */
     /*  console.log(data)
 */
     const { loading, error, data } = useQuery(ACTUAL_USER) 

/*    var opcion = data?.currentUser
 */
   console.log(data)

    /* useEffect (() {
        setDeleteAccount()
    },[]) */

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

    /* const handleDelete= () => {
        setDeletAccount()
    } */


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
                    <form className={styles.form} >
                        <div className={styles.form__group}>
                            <label htmlFor='email' className={styles.form__label} >E-Mail</label>
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
                            <label htmlFor='password' className={styles.form__label} >Contraseña Anterior</label>
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
                            <label htmlFor='password' className={styles.form__label} >Nueva Contraseña</label>
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
                            <label htmlFor='username' className={styles.form__label} >Nombre de Usuario</label>
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
                                    <label htmlFor='name' className={styles.form__label} >Nombre</label>
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
                                    <label htmlFor='lastname' className={styles.form__label} >Apellido</label>
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
                                    <label htmlFor='address' className={styles.form__label} >Dirección</label>
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
                                           {/*  <button className={styles.boton} onClick={handleDelete} type='submit' >Eliminar mi cuenta</button> */}
                                        </div>
                                    </div>                          
                        }
                    </form>
                            </div>
            </div>
                </div>
    )
}

export default EditAccount;