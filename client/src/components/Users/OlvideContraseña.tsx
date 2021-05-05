import React from 'react';
import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import styles from './loguin.module.scss';
import { faCrown, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeSquare, faFileSignature, faSearch, faMapMarker, faShareAlt, faUnlock, faAt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CHANGE_PASSWORD, ACTUAL_USER } from "../../gql/loginGql";
import styles2 from './SmallForm.module.scss';
import { toast } from 'react-toastify';




const OlvideContraseña = () => {
    const [editUser, user] = useMutation(CHANGE_PASSWORD)

    let currentuser: any = {}



    const [control, setControl] = useState({ email: '', password: '', newpassword: '' })

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setControl({ ...control, [event?.currentTarget.name]: event?.currentTarget.value })
    }


    console.log(control)

    const handleclickevent = () => {
        window.location.href = 'http://localhost:3000/Login'
    }
    const handleclickeventVerify = () => {
        setVerify(true)
    }


    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (currentuser?.email === control.email) {
            editUser({
                variables: {
                    password: control.newpassword, id: currentuser?.id
                }
            })
                .then((resolve) => {
                    toast.success('Tienes una nueva contraseña 🥳')
                    setTimeout(function () { window.location.href = 'http://localhost:3000/Home'; }, 2000)
                })
                .catch((error) => (console.log('Reset Mal')))
        }
        else {
            toast.error('Los datos proporcionados no son correctos 🤔')
        }
    }

    const [codeVerify, setCodeVerify] = useState(0)
    const [countError, setCountError] = useState(2)
    const [verify, setVerify] = useState(true)

    const handleRequestCode = () => {
        let code = Math.floor(Math.random() * (999999 - 10000) + 999999)
        setCodeVerify(code)
        setVerify(false)
        console.log(code)
    }

    const handleVerifyCode = () => {
        let codeVer = 1498163
        if (codeVerify === codeVer) {
            window.location.href = 'http://localhost:3000/NuevaContrasena';
        } else {
            setCountError(countError - 1)
            countError > 0 && console.log('te quedan:', countError, 'intentos')
            if (countError === 0) {
                console.log('solicitar nuevo codigo')
            }
        }
    }

    return (
        <div className={styles2.back}>
            <div className={styles2.organizar}>
                <div className={styles2.caja}>
                    <div className={styles.container}>
                        RESTABLECER
                            <div className={styles.flip}>
                            <div><div>MI</div></div>
                            <div><div>NUEVA</div></div>
                        </div>
                            CONTRASEÑA
                            </div>
                    <form className={styles.form} onSubmit={handlesubmitchange}>
                        {verify ?
                            <div className={styles.form__group}>
                                <label className={styles.form__label} >
                                    <FontAwesomeIcon icon={faAt} /> E-mail</label>
                                <input
                                    className={styles.form__field}
                                    type='text'
                                    placeholder='E-Mail'
                                    name='email'
                                    onChange={handleChange}
                                />
                                <div className={styles.form__group}>
                                    <button className={styles.boton} onClick={handleRequestCode}>Solicitar Codigo</button>
                                </div>
                                <div className={styles.organizarbotones}>
                                    <button className={styles.boton} onClick={handleclickevent}>Volver Atrás</button>
                                </div>
                            </div>
                            :
                            <div className={styles.form__group}>
                                <label htmlFor='password' className={styles.form__label} >
                                    <FontAwesomeIcon icon={faUnlock} />Ingrese Codigo</label>
                                <input
                                    className={styles.form__field}
                                    placeholder='Contraseña'
                                    minLength={5}
                                    maxLength={5}
                                    type="text"
                                    name='code'
                                    required={true}
                                    onChange={handleChange}
                                />
                                <div className={styles.form__group}>
                                    <button className={styles.boton} type='submit' onClick={handleVerifyCode} >Verificar Codigo</button>
                                </div>
                                <div className={styles.organizarbotones}>
                                    <button className={styles.boton} onClick={handleclickeventVerify}>Volver Atrás</button>
                                </div>
                            </div>

                        }



                    </form>
                </div>
            </div>
        </div>
    )
}

export default OlvideContraseña
