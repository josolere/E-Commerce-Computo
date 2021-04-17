import * as React from 'react';
import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { ACTUAL_USER } from "../../gql/login"
import {  LOGOUT_MUTATION } from "../../gql/login"
import { SIGNUP_MUTATION } from "../../gql/login"
import { LOGIN_MUTATION } from "../../gql/login"

import styles from './loguin.module.scss';
import NavBar from '../NavBar/NavBar';


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

    const handleclickevent = () => {
        showlogin ? setshowLogin(false) : setshowLogin(true)
    }

    const handleinputchange = (event: React.FormEvent<HTMLInputElement>) => {
        setLogform({ ...logform, [event.currentTarget.name]: event.currentTarget.value })
    }

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
                ;
        }
        event.preventDefault()
    }

    const logoutchange = () => {
        logout({ variables: { email: logform.email, password: logform.password } })
            .then((resolve) => { console.log("logout bien") })
            .catch((error) => { console.log("logout mal") })
            ;
    }

    return (
        <div>
            <NavBar />
            <div className={styles.back}>
                {showlogin ? <div className={styles.organizar}>
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
                                <label htmlFor='password' className={styles.form__label} >Password</label>
                                <input
                                    className={styles.form__field}
                                    placeholder='Contraseña'
                                    minLength={8}
                                    maxLength={12}
                                    type="password"
                                    name='password'
                                    onChange={handleinputchange}
                                    required={true}
                                />
                            </div>
                            <div className={styles.form__group}></div>
                            <div className={styles.organizarbotones}>
                                <button className={styles.boton} type='submit' >Loguear</button>
                                <button className={styles.boton} onClick={handleclickevent} >No tienes cuenta?</button>
                                <button className={styles.boton} onClick={logoutchange} >Desvincular</button>
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
                                        minLength={8}
                                        maxLength={12}
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
                                        maxLength={12}
                                        placeholder='Apodo'
                                        name='name'
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

