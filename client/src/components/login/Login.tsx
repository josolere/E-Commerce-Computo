import * as React from 'react';
import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import styles from './loguin.module.scss';
import { LOGIN_MUTATION, SIGNUP_MUTATION, LOGOUT_MUTATION, ACTUAL_USER } from "../../gql/login"
import { useCookies } from "react-cookie";
import DropdownMenu from '../NavBar/Dropdown';
import NavBarItem from '../NavBar/NavBarItem';


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

const Login = () => {

    const [logform, setLogform] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        username: '',
        address: ''

    });

    const [cookies, setCookie, removeCookie] = useCookies(["User"]);

    const [showlogin, setshowLogin] = useState(false)


    const currentUser = useQuery<datauser>(ACTUAL_USER)

    console.log(currentUser.data)

    const [login, logindata] = useMutation(LOGIN_MUTATION)

    const destructuringLogin = logindata.data

    const [signup, signupdata] = useMutation(SIGNUP_MUTATION)

    const destructuringsingup = signupdata.data

    const [logout, logoutdata] = useMutation(LOGOUT_MUTATION)

    const destructuringlogout = logoutdata.data

    const handleclickevent = () => {
        showlogin ? setshowLogin(false) : setshowLogin(true)
    }

    const handleinputchange = (event: React.FormEvent<HTMLInputElement>) => {
        setLogform({ ...logform, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handlesubmitchange = (event: React.FormEvent<HTMLFormElement>) => {
        if (!showlogin) {
            login({ variables: { email: logform.email, password: logform.password } })
                .then((resolve) => {  setCookie('User', logform.username, {
                    path: "/"
                }); window.location.href = 'http://localhost:3000/Home'})
                .catch((error) => { console.log("error login") })
                ;
        }
        else {
            signup({
                variables: {
                    firstName: logform.firstname, email: logform.email, password: logform.password, /* username:logform.username,  */
                    lastName: logform.lastname/* , address: logform.address */
                }
            })
                .then((resolve) => { console.log("signup bien") })
                .catch((error) => { console.log("signup mal") })
                ;
        }
       
        event.preventDefault()
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
                        {cookies.User && <h4>Hola {cookies.User}</h4>}
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
                                <label htmlFor='password' className={styles.form__label} >Password</label>
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
                            
                            <div className={styles.organizarbotones}>
                                <button className={styles.boton} type='submit' >Login</button>
                                <button className={styles.boton} onClick={handleclickevent} >No tienes cuenta?</button>
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
                            {cookies.User && <h4>Hola {cookies.User}</h4>}
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
                                    <label htmlFor='password' className={styles.form__label} >Password</label>
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
                                    <label htmlFor='name' className={styles.form__label} >Nombre</label>
                                    <input
                                        className={styles.form__field}
                                        type='text'
                                        minLength={5}
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
                                        onChange={handleinputchange}
                                        required={true}
                                    />
                                </div>
                                <div className={styles.organizarbotones}>
                                    <button className={styles.boton} type='submit' >Crea tu cuenta</button>
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