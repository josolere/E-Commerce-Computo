import * as React from 'react';
import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import styles from './loguin.module.scss';
import { LOGIN_MUTATION, SIGNUP_MUTATION, ACTUAL_USER } from "../../gql/login"
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify"
import {faEnvelopeSquare, faUnlock,faFileSignature, faMapMarker, faShareAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FacebookLogin from "react-facebook-login"
import GoogleLogin from 'react-google-login';

const Login = () => {
 
    const [logform, setLogform] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        username: '',
        address: ''
    });


    const [showlogin, setshowLogin] = useState(false)

    const [login, logindata] = useMutation(LOGIN_MUTATION)

    const [signup, signupdata] = useMutation(SIGNUP_MUTATION)

    const handleclickevent = () => {
        showlogin ? setshowLogin(false) : setshowLogin(true)
    }

    const handleinputchange = (event: React.FormEvent<HTMLInputElement>) => {
        setLogform({ ...logform, [event.currentTarget.name]: event.currentTarget.value })
    }
    
    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        if (!showlogin) {
            login({ variables: { email: logform.email, password: logform.password } })
                .then((resolve) => {  const visitante = resolve.data.login.user;
                    toast.success("Bienvenido " + visitante.name);
                    setTimeout(function(){window.location.href = 'http://localhost:3000/Home';}, 1800) })
                .catch((error) => { toast.error(error.message)})
                ;
        }
        else {
            signup({
                variables: {
                    firstName: logform.firstname, email: logform.email, password: logform.password, 
                    lastName: logform.lastname, username: logform.username, address: logform.address
                }
            })
                .then((resolve) => { toast.success("Te has registrado correctamente"); 
                setTimeout(function(){window.location.href = 'http://localhost:3000/login';}, 1500 )})
                .catch((error) => { toast.error('Error al registrarse') })
                ;
        }
        event.preventDefault()
    }

    
    const handleResetPassword = () => {
        window.location.href = 'http://localhost:3000/ResetContraseña'
    }

    const responseFacebook = (res:any) => {
        console.log(res)
    }

    const componentClicked = () => {
        window.location.href = 'http://localhost:5000/auth/facebook'
    }

    const responseGoogle = () => {
        window.location.href = 'http://localhost:3000/Home';
    }

    return (
        <div>
            <div className={styles.back}>
                {!showlogin ? <div className={styles.organizar}>
                    <div className={styles.caja}>
                        <div className={styles.container}>
                            Introduce
                            <div className={styles.flip}>
                                <div><div>tus</div></div>
                                <div><div>datos</div></div>
                                <div><div>para</div></div>
                            </div>
                            loguearte
                            </div>
                        <form className={styles.form} onSubmit={handlesubmitchange}>
                            <div className={styles.form__group}>
                                <label htmlFor='email' className={styles.form__label} > 
                                <FontAwesomeIcon icon={faEnvelopeSquare} aria-hidden={true} /> E-Mail</label>
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
                                <FontAwesomeIcon icon={faUnlock} aria-hidden={true} /> Contraseña</label>
                                <input
                                    className={styles.form__field}
                                    type='password'
                                    minLength={4}
                                    maxLength={15}
                                    placeholder='Contraseña'
                                    name='password'
                                    onChange={handleinputchange}
                                    required={true}
                                />
                            </div>
                            <div className={styles.organizarbotones}>
                                <button style={{paddingTop:"1rem"}} className={styles.boton} type='submit' >Login</button>
                                <button className={styles.boton} onClick={handleclickevent} >No tienes cuenta?</button>
                            </div>
                            <div className={styles.buttonFB}>
{/*                                      <FacebookLogin
                                        appId="x"
                                        autoLoad={true}
                                        onClick={componentClicked}
                                        callback={responseFacebook} 
                                        /> */}
                                    <GoogleLogin className={styles.buttonGoogle}
                                        clientId="700487855245-ffig42s6ln7oao3itcpcg18g0mi8de8u.apps.googleusercontent.com"
                                        theme= 'dark'
                                        onSuccess={responseGoogle}
                                    />
                                </div>
                            <div className={styles.organizarbotones}>
                                <button className={styles.boton} onClick={handleResetPassword} >Olvidaste tu contraseña?</button>
                            </div>
                        </form>
                    </div>
                </div>
                    :
                    <div className={styles.organizar}>
                        <div className={styles.caja}>
                            <div className={styles.container}>
                                Introduce
                            <div className={styles.flip}>
                                    <div><div>tus</div></div>
                                    <div><div>datos</div></div>
                                    <div><div>para</div></div>
                                </div>
                            registrarte
                            </div>
                            <form className={styles.form} onSubmit={handlesubmitchange}>
                                <div className={styles.form__group}>
                                    <label htmlFor='email' className={styles.form__label} >
                                    <FontAwesomeIcon icon={faEnvelopeSquare} aria-hidden={true} /> E-Mail</label>
                                    <input
                                        className={styles.form__field}
                                        type='email'
                                        minLength={10}
                                        maxLength={30}
                                        placeholder='E-Mail'
                                        name='email'
                                        onChange={handleinputchange}
                                        required={true}
                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='password' className={styles.form__label} >
                                    <FontAwesomeIcon icon={faUnlock} aria-hidden={true} /> Contraseña</label>
                                    <input
                                        className={styles.form__field}
                                        type='password'
                                        minLength={4}
                                        maxLength={15}
                                        placeholder='Contraseña'
                                        name='password'
                                        onChange={handleinputchange}
                                        required={true}
                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='name' className={styles.form__label} >
                                    <FontAwesomeIcon icon={faFileSignature} aria-hidden={true} /> Nombre</label>
                                    <input
                                        className={styles.form__field}
                                        type='text'
                                        minLength={3}
                                        maxLength={20}
                                        placeholder='Nombre'
                                        name='firstname'
                                        onChange={handleinputchange}
                                        required={true}
                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='lastname' className={styles.form__label} >
                                    <FontAwesomeIcon icon={faFileSignature} aria-hidden={true} /> Apellido</label>
                                    <input
                                        className={styles.form__field}
                                        type='text'
                                        minLength={5}
                                        maxLength={20}
                                        placeholder='Apellido'
                                        name='lastname'
                                        onChange={handleinputchange}
                                        required={true}
                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='address' className={styles.form__label} >
                                    <FontAwesomeIcon icon={faMapMarker} aria-hidden={true} /> Dirección</label>
                                    <input 
                                        className={styles.form__field}
                                        type='text'
                                        minLength={5}
                                        maxLength={30}
                                        placeholder='Dirección'
                                        name='address'
                                        onChange={handleinputchange}
                                        required={true}
                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='username' className={styles.form__label} >
                                    <FontAwesomeIcon icon={faShareAlt} aria-hidden={true} /> Nombre de Usuario</label>
                                    <input
                                        className={styles.form__field}
                                        type='text'
                                        minLength={5}
                                        maxLength={15}
                                        placeholder='Nombre de Usuario'
                                        name='username'
                                        onChange={handleinputchange}
                                        required={true}
                                    />
                                </div>
                                <div className={styles.organizarbotones}>
                                    <button style={{paddingTop:"1rem"}} className={styles.boton} type='submit' >Crea tu cuenta</button>
                                    <button className={styles.boton} onClick={handleclickevent}>Ya tienes una  cuenta?</button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Login;