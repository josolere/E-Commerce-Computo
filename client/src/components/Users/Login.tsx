import * as React from 'react';
import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import styles from './loguin.module.scss';
<<<<<<< HEAD:client/src/components/login/Login.tsx
<<<<<<< HEAD
import { LOGIN_MUTATION, SIGNUP_MUTATION, LOGOUT_MUTATION, ACTUAL_USER} from "../../gql/login"
import NavBar from '../NavBar/NavBar';

=======
import { LOGIN_MUTATION, SIGNUP_MUTATION, LOGOUT_MUTATION, ACTUAL_USER } from "../../gql/login"
=======
import { LOGIN_MUTATION, SIGNUP_MUTATION, ACTUAL_USER } from "../../gql/login"
>>>>>>> LogFront:client/src/components/Users/Login.tsx
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify"
<<<<<<< HEAD:client/src/components/login/Login.tsx
>>>>>>> front_roto

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

<<<<<<< HEAD


const Login = () => {
=======
const Login = () => {
 

 
>>>>>>> front_roto

    const [logform, setLogform] = useState({
        email: '',
        password: '',
<<<<<<< HEAD
        name: ''
    });

    const [showlogin, setshowLogin] = useState(false)

    //useEffect ????

    useQuery<datauser>(ACTUAL_USER)

    const [login, logindata] = useMutation(LOGIN_MUTATION)

    const destructuringLogin = logindata.data

    const [signup, signupdata] = useMutation(SIGNUP_MUTATION)

    const destructuringsingup = signupdata.data

    const [logout, logoutdata] = useMutation(LOGOUT_MUTATION)

    const destructuringlogout = logoutdata.data
=======
=======
import {faEnvelopeSquare, faUnlock,faFileSignature, faMapMarker, faShareAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FacebookLogin from "react-facebook-login"
import GoogleLogin from 'react-google-login';

const Login = () => {
 
    const [logform, setLogform] = useState({
        email: '',
        password: '',
>>>>>>> LogFront:client/src/components/Users/Login.tsx
        firstname: '',
        lastname: '',
        username: '',
        address: ''
    });

    const [cookies, setCookie, removeCookie] = useCookies(["User"]);


    const [showlogin, setshowLogin] = useState(false)

    const [login, logindata] = useMutation(LOGIN_MUTATION)

    const [signup, signupdata] = useMutation(SIGNUP_MUTATION)

<<<<<<< HEAD:client/src/components/login/Login.tsx
    const {loading, error, data} = useQuery(ACTUAL_USER, {
        fetchPolicy: "no-cache"
      });

 console.log(data)

    const [logout, logoutdata] = useMutation(LOGOUT_MUTATION)

>>>>>>> front_roto

=======
>>>>>>> LogFront:client/src/components/Users/Login.tsx
    const handleclickevent = () => {
        showlogin ? setshowLogin(false) : setshowLogin(true)
    }

<<<<<<< HEAD:client/src/components/login/Login.tsx
<<<<<<< HEAD
=======

>>>>>>> front_roto
    const handleinputchange = (event: React.FormEvent<HTMLInputElement>) => {
        setLogform({ ...logform, [event.currentTarget.name]: event.currentTarget.value })
    }

<<<<<<< HEAD
    console.log(logform)

    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        if (showlogin === true) {
            login({ variables: { email: logform.email, password: logform.password } })
                .then((resolve) => { console.log("logueado") })
                .catch((error) => { console.log("error login") })
                ;
        }
        else {
            signup({ variables: { name: logform.name, email: logform.email, password: logform.password } })
                .then((resolve) => { console.log("signup bien") })
                .catch((error) => { console.log("signup mal") })
=======
=======
    const handleinputchange = (event: React.FormEvent<HTMLInputElement>) => {
        setLogform({ ...logform, [event.currentTarget.name]: event.currentTarget.value })
    }
    
>>>>>>> LogFront:client/src/components/Users/Login.tsx
    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        if (!showlogin) {
            login({ variables: { email: logform.email, password: logform.password } })
                .then((resolve) => {  const visitante = resolve.data.login.user;
                     setCookie('User', visitante,  {
                                                path: "/"}); toast.success("Bienvenido " + visitante.name);
                    setTimeout(function(){window.location.href = 'http://localhost:3000/Home';}, 1800) })
                .catch((error) => { toast.error(error.message)})
                ;
        }
        else {
            signup({
                variables: {
                    firstName: logform.firstname, email: logform.email, password: logform.password, 
                    lastName: logform.lastname
                }
            })
                .then((resolve) => { toast.success("Te has registrado correctamente"); 
<<<<<<< HEAD:client/src/components/login/Login.tsx
                setTimeout(function(){window.location.href = 'http://localhost:3000/login';}, 2000 )})
                .catch((error) => { toast.error(error.message) })
>>>>>>> front_roto
=======
                setTimeout(function(){window.location.href = 'http://localhost:3000/login';}, 1500 )})
                .catch((error) => { toast.error('Error al registrarse') })
>>>>>>> LogFront:client/src/components/Users/Login.tsx
                ;
        }
        event.preventDefault()
    }

<<<<<<< HEAD:client/src/components/login/Login.tsx
<<<<<<< HEAD
    const logoutchange = () => {
        logout({ variables: { email: logform.email, password: logform.password } })
            .then((resolve) => { console.log("logout bien") })
            .catch((error) => { console.log("logout mal") })
            ;
    }

=======
    
    const handleResetPassword = () => {
        window.location.href = 'http://localhost:3000/EditarCuenta'
>>>>>>> LogFront:client/src/components/Users/Login.tsx

    }

    const responseFacebook = (res:any) => {
        console.log(res)
    }

<<<<<<< HEAD:client/src/components/login/Login.tsx
    return (
        <div>
     
            <div className={styles.back}>
                {showlogin ? <div className={styles.organizar}>
=======
    const handleResetPassword = () => {
        window.location.href = 'http://localhost:3000/EditarCuenta'
=======
    const componentClicked = () => {
        window.location.href = 'http://localhost:3000/Home'
    }
>>>>>>> LogFront:client/src/components/Users/Login.tsx

    const responseGoogle = () => {
        window.location.href = 'http://localhost:3000/Home'
    }

    return (
        <div>
            <div className={styles.back}>
                {!showlogin ? <div className={styles.organizar}>
<<<<<<< HEAD:client/src/components/login/Login.tsx
>>>>>>> front_roto
=======
>>>>>>> LogFront:client/src/components/Users/Login.tsx
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
<<<<<<< HEAD:client/src/components/login/Login.tsx
<<<<<<< HEAD
                                <label htmlFor='password' className={styles.form__label} >Password</label>
                                <input
                                    className={styles.form__field}
                                    placeholder='Contraseña'
                                    minLength={8}
                                    maxLength={12}
                                    type="password"
=======
                                <label htmlFor='password' className={styles.form__label} >Contraseña</label>
=======
                                <label htmlFor='password' className={styles.form__label} >
                                <FontAwesomeIcon icon={faUnlock} aria-hidden={true} /> Contraseña</label>
>>>>>>> LogFront:client/src/components/Users/Login.tsx
                                <input
                                    className={styles.form__field}
                                    type='password'
                                    minLength={4}
                                    maxLength={15}
                                    placeholder='Contraseña'
<<<<<<< HEAD:client/src/components/login/Login.tsx
>>>>>>> front_roto
=======
>>>>>>> LogFront:client/src/components/Users/Login.tsx
                                    name='password'
                                    onChange={handleinputchange}
                                    required={true}
                                />
                            </div>
<<<<<<< HEAD:client/src/components/login/Login.tsx
<<<<<<< HEAD
                            <div className={styles.form__group}></div>
                            <div className={styles.organizarbotones}>
                                <button className={styles.boton} type='submit' >Loguear</button>
                                <button className={styles.boton} onClick={handleclickevent} >No tienes cuenta?</button>
                                <button className={styles.boton} onClick={logoutchange} >Desvincular</button>
=======
=======
>>>>>>> LogFront:client/src/components/Users/Login.tsx
                            <div className={styles.organizarbotones}>
                                <button style={{paddingTop:"1rem"}} className={styles.boton} type='submit' >Login</button>
                                <button className={styles.boton} onClick={handleclickevent} >No tienes cuenta?</button>
                            </div>
                            <div className={styles.buttonFB}>
                                     <FacebookLogin
                                        appId="x"
                                        autoLoad={true}
                                        onClick={componentClicked}
                                        callback={responseFacebook} />
                                        <GoogleLogin className={styles.buttonGoogle}
                                        clientId="x"
                                       
                                        theme= 'dark'
                                         />
                                </div>
                            <div className={styles.organizarbotones}>
                                <button className={styles.boton} onClick={handleResetPassword} >Olvidaste tu contraseña?</button>
<<<<<<< HEAD:client/src/components/login/Login.tsx
>>>>>>> front_roto
=======
>>>>>>> LogFront:client/src/components/Users/Login.tsx
                            </div>
                        </form>
                    </div>
                </div>
                    :
                    <div className={styles.organizar}>
                        <div className={styles.caja}>
<<<<<<< HEAD:client/src/components/login/Login.tsx
<<<<<<< HEAD

=======
>>>>>>> front_roto
=======
>>>>>>> LogFront:client/src/components/Users/Login.tsx
                            <div className={styles.container}>
                                Introduce
                            <div className={styles.flip}>
                                    <div><div>tus</div></div>
                                    <div><div>datos</div></div>
                                    <div><div>para</div></div>
                                </div>
                            registrarte
                            </div>
<<<<<<< HEAD:client/src/components/login/Login.tsx
<<<<<<< HEAD
=======
                            {cookies.User && <h4>Hola {cookies.User}</h4>}
>>>>>>> front_roto
=======
                            {cookies.User && <h4>Hola {cookies.User}</h4>}
>>>>>>> LogFront:client/src/components/Users/Login.tsx
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
<<<<<<< HEAD:client/src/components/login/Login.tsx
<<<<<<< HEAD
                                    <label htmlFor='password' className={styles.form__label} >Password</label>
                                    <input
                                        className={styles.form__field}
                                        type='password'
                                        minLength={8}
                                        maxLength={12}
=======
                                    <label htmlFor='password' className={styles.form__label} >Contraseña</label>
=======
                                    <label htmlFor='password' className={styles.form__label} >
                                    <FontAwesomeIcon icon={faUnlock} aria-hidden={true} /> Contraseña</label>
>>>>>>> LogFront:client/src/components/Users/Login.tsx
                                    <input
                                        className={styles.form__field}
                                        type='password'
                                        minLength={4}
                                        maxLength={15}
<<<<<<< HEAD:client/src/components/login/Login.tsx
>>>>>>> front_roto
=======
>>>>>>> LogFront:client/src/components/Users/Login.tsx
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
                                        minLength={5}
<<<<<<< HEAD:client/src/components/login/Login.tsx
<<<<<<< HEAD
                                        maxLength={12}
                                        placeholder='Apodo'
                                        name='name'
=======
=======
>>>>>>> LogFront:client/src/components/Users/Login.tsx
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
<<<<<<< HEAD:client/src/components/login/Login.tsx
>>>>>>> front_roto
=======
>>>>>>> LogFront:client/src/components/Users/Login.tsx
                                        onChange={handleinputchange}
                                        required={true}
                                    />
                                </div>
                                <div className={styles.organizarbotones}>
<<<<<<< HEAD:client/src/components/login/Login.tsx
<<<<<<< HEAD
                                    <button className={styles.boton} type='submit' >Crea tu cuenta</button>
=======
                                    <button style={{paddingTop:"1rem"}} className={styles.boton} type='submit' >Crea tu cuenta</button>
>>>>>>> front_roto
=======
                                    <button style={{paddingTop:"1rem"}} className={styles.boton} type='submit' >Crea tu cuenta</button>
>>>>>>> LogFront:client/src/components/Users/Login.tsx
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

<<<<<<< HEAD:client/src/components/login/Login.tsx
<<<<<<< HEAD
export default Login;

=======
export default Login;
>>>>>>> front_roto
=======
export default Login;
>>>>>>> LogFront:client/src/components/Users/Login.tsx
