import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import styles from './loguin.module.scss';
import { faUnlock, faAt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RETRIEVE_PASSWORD, GET_USERS_BY_ID_RETRIEVE, GET_USERS_BY_EMAIL } from "../../gql/loginGql";
import styles2 from './SmallForm.module.scss';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { countAddBase } from '../../redux/actions'




const OlvideContraseña = () => {
    const firsstRender = useRef(true)
    const dispatch = useDispatch()

    const [control, setControl] = useState({ email: '' })
    const [idEmail, setIdEmail] = useState('')
    const [codeReset, setCodeReset] = useState('')
    const [codeVerify, setCodeVerify] = useState({ code: '' })
    const [render, setRender] = useState(false)


    const reset = useQuery(GET_USERS_BY_ID_RETRIEVE, {
        variables: { id: idEmail }
    });

    const [editPassword] = useMutation(RETRIEVE_PASSWORD, {
        refetchQueries: [{ query: GET_USERS_BY_ID_RETRIEVE, variables: { id: idEmail } }]
    })

    const { data } = useQuery(GET_USERS_BY_EMAIL, {
        variables: { email: control.email }
    });


    useEffect(() => {
        if (firsstRender.current) {
            firsstRender.current = false;
        } else {
            if (data) {
                let id = data?.getUserByEmail?.id
                setIdEmail(id)
            }
        }

    }, [data])

    useEffect(() => {
        if (firsstRender.current) {
            firsstRender.current = false;
        } else {
            if (reset) {
                let resetPass = reset?.data?.getUserById?.resetPass
                setCodeReset(resetPass)
            }
        }

    }, [codeVerify])


    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setControl({ ...control, [event?.currentTarget.name]: event?.currentTarget.value })
    }
    const handleChangeVerify = (event: React.FormEvent<HTMLInputElement>) => {
        setCodeVerify({ ...codeVerify, [event?.currentTarget.name]: event?.currentTarget.value })
    }

    const handleclickevent = () => {
        window.location.href = 'http://localhost:3000/Login'
    }
    const handleclickeventVerify = () => {
        setVerify(true)
    }


    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    const [countError, setCountError] = useState(2)
    const [verify, setVerify] = useState(true)

    const handleRequestCode = () => {
        let code: any = Math.floor(Math.random() * (999999 - 10000) + 999999)
        code = code.toString()
        setCodeVerify(code)
        editPassword({ variables: { id: idEmail, resetPass: code } })
            .then((resolve) => {
                setVerify(false)
                setCodeVerify({ code: '' })
            })
            .catch((error) => {
                console.log('no responde')
            })
    }

    const handleVerifyCode = () => {

        if (codeReset === codeVerify.code) {
            window.location.href = 'http://localhost:3000/NuevaContrasena';
            // setRender(true)
            // dispatch(countAddBase(true))
        } else {
            setCountError(countError - 1)
            countError > 0 && toast.error('te quedan ' + countError + ' intentos')
            if (countError === 0) {
                countError > 0 && toast.error('solicitar nuevo codigo')
                setVerify(true)
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
                                    value={control.email}
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
                                    minLength={4}
                                    maxLength={8}
                                    type="text"
                                    name='code'
                                    required={true}
                                    onChange={handleChangeVerify}
                                    value={codeVerify.code}
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
