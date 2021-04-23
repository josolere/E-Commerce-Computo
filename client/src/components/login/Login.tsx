import * as React from 'react';
import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import styles from './loguin.module.scss';
<<<<<<< HEAD
import { LOGIN_MUTATION, SIGNUP_MUTATION, LOGOUT_MUTATION, ACTUAL_USER} from "../../gql/login"
import NavBar from '../NavBar/NavBar';

=======
import { LOGIN_MUTATION, SIGNUP_MUTATION, LOGOUT_MUTATION, ACTUAL_USER } from "../../gql/login"
import { useCookies } from "react-cookie";
import DropdownMenu from '../NavBar/Dropdown';
import NavBarItem from '../NavBar/NavBarItem';
import { toast, ToastContainer } from "react-toastify"
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
        firstname: '',
        lastname: '',
        username: '',
        address: ''

    });

    const [cookies, setCookie, removeCookie] = useCookies(["User"]);


    const [showlogin, setshowLogin] = useState(false)


    const [login, logindata] = useMutation(LOGIN_MUTATION)


    const [signup, signupdata] = useMutation(SIGNUP_MUTATION)

    const {loading, error, data} = useQuery(ACTUAL_USER, {
        fetchPolicy: "no-cache"
      });

 console.log(data)

    const [logout, logoutdata] = useMutation(LOGOUT_MUTATION)

>>>>>>> front_roto

    const handleclickevent = () => {
        showlogin ? setshowLogin(false) : setshowLogin(true)
    }

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
    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        if (!showlogin) {
            login({ variables: { email: logform.email, password: logform.password } })
                .then((resolve) => {  const visitante = resolve.data.login.user; setCookie('User', visitante,   {
                    path: "/", }); toast.success("Bienvenido " + visitante.name);
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
                setTimeout(function(){window.location.href = 'http://localhost:3000/login';}, 2000 )})
                .catch((error) => { toast.error(error.message) })
>>>>>>> front_roto
                ;
        }
        event.preventDefault()
    }

<<<<<<< HEAD
    const logoutchange = () => {
        logout({ variables: { email: logform.email, password: logform.password } })
            .then((resolve) => { console.log("logout bien") })
            .catch((error) => { console.log("logout mal") })
            ;
    }




    return (
        <div>
     
            <div className={styles.back}>
                {showlogin ? <div className={styles.organizar}>
=======
    const handleResetPassword = () => {
        window.location.href = 'http://localhost:3000/EditarCuenta'

    }

    return (
        <div>
            <div className={styles.back}>
                {!showlogin ? <div className={styles.organizar}>
>>>>>>> front_roto
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
                                <input
                                    className={styles.form__field}
                                    type='password'
                                    minLength={4}
                                    maxLength={15}
                                    placeholder='Contraseña'
>>>>>>> front_roto
                                    name='password'
                                    onChange={handleinputchange}
                                    required={true}
                                />
                            </div>
<<<<<<< HEAD
                            <div className={styles.form__group}></div>
                            <div className={styles.organizarbotones}>
                                <button className={styles.boton} type='submit' >Loguear</button>
                                <button className={styles.boton} onClick={handleclickevent} >No tienes cuenta?</button>
                                <button className={styles.boton} onClick={logoutchange} >Desvincular</button>
=======
                            <div className={styles.organizarbotones}>
                                <button style={{paddingTop:"1rem"}} className={styles.boton} type='submit' >Login</button>
                                <button className={styles.boton} onClick={handleclickevent} >No tienes cuenta?</button>
                            </div>
                            <div className={styles.organizarbotones}>
                                <button className={styles.boton} onClick={handleResetPassword} >Olvidaste tu contraseña?</button>
>>>>>>> front_roto
                            </div>
                        </form>
                    </div>
                </div>
                    :
                    <div className={styles.organizar}>
                        <div className={styles.caja}>
<<<<<<< HEAD

=======
>>>>>>> front_roto
                            <div className={styles.container}>
                                Introduce
                            <div className={styles.flip}>
                                    <div><div>tus</div></div>
                                    <div><div>datos</div></div>
                                    <div><div>para</div></div>
                                </div>
                            registrarte
                            </div>
<<<<<<< HEAD
=======
                            {cookies.User && <h4>Hola {cookies.User}</h4>}
>>>>>>> front_roto
                            <form className={styles.form} onSubmit={handlesubmitchange}>
                                <div className={styles.form__group}>
                                    <label htmlFor='email' className={styles.form__label} >E-Mail</label>
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
<<<<<<< HEAD
                                    <label htmlFor='password' className={styles.form__label} >Password</label>
                                    <input
                                        className={styles.form__field}
                                        type='password'
                                        minLength={8}
                                        maxLength={12}
=======
                                    <label htmlFor='password' className={styles.form__label} >Contraseña</label>
                                    <input
                                        className={styles.form__field}
                                        type='password'
                                        minLength={4}
                                        maxLength={15}
>>>>>>> front_roto
                                        placeholder='Contraseña'
                                        name='password'
                                        onChange={handleinputchange}
                                        required={true}
                                    />
                                </div>
                                <div className={styles.form__group}>
                                    <label htmlFor='name' className={styles.form__label} >Nombre</label>
                                    <input
                                        className={styles.form__field}
                                        type='text'
                                        minLength={5}
<<<<<<< HEAD
                                        maxLength={12}
                                        placeholder='Apodo'
                                        name='name'
=======
                                        maxLength={20}
                                        placeholder='Nombre'
                                        name='firstname'
                                        onChange={handleinputchange}
                                        required={true}
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
                                        required={true}
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
>>>>>>> front_roto
                                        onChange={handleinputchange}
                                        required={true}
                                    />
                                </div>
                                <div className={styles.organizarbotones}>
<<<<<<< HEAD
                                    <button className={styles.boton} type='submit' >Crea tu cuenta</button>
=======
                                    <button style={{paddingTop:"1rem"}} className={styles.boton} type='submit' >Crea tu cuenta</button>
>>>>>>> front_roto
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

<<<<<<< HEAD
export default Login;

=======
export default Login;
>>>>>>> front_roto
