import * as React from 'react';
import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
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

const ACTUALUSER = gql`
query {
    actualtUser {
      id
      name
      email
    }
  }`;

const LOGOUTMUTATION = gql`
  mutation LOGOUTMUTATION ($email:String! $password: String! ){
      logout (input:{email:$email password:$password})
      {
            loquellegue
      }
  }
`;

const SIGNUPMUTATION = gql`
    mutation SIGNUPMUTATION ($name: String! $password: String! $email: String!) 
    {
        supuestosignup (input:{name:$name password: $password email: $email})
        {
            nosequellega
        }
    }`;

const LOGINMUTATION = gql`
    mutation LOGINMUTATION ($email: String!$password: String!) 
    {
        supuestologin (input : { email: $email  password: $password } ) 
        {
            loquellega    
        }
    }`;

const Login = () => {

    const [logform, setLogform] = useState({
        email: '',
        password: '',
        name: ''
    });

    const [showlogin, setshowLogin] = useState(false)

    //useEffect ????

    useQuery<datauser>(ACTUALUSER)

    const [login, logindata] = useMutation(LOGINMUTATION)

    const destructuringLogin = logindata.data

    const [signup, signupdata] = useMutation(SIGNUPMUTATION)

    const destructuringsingup = signupdata.data

    const [logout, logoutdata] = useMutation(LOGOUTMUTATION)

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
        <React.Fragment>
            <div className={styles.back}>
            <NavBar />
                {showlogin ? <div className={styles.all}>
                    <h4 >Introduce tus datos</h4>
                    <form className={styles.form} onSubmit={handlesubmitchange}>
                        <input
                            placeholder='E-mail'
                            minLength={10}
                            maxLength={30}
                            type='email'
                            name='email'
                            onChange={handleinputchange}
                            required={true}
                        />
                        <input
                            placeholder='Contraseña'
                            minLength={8}
                            maxLength={12}
                            type="password"
                            name='password'
                            onChange={handleinputchange}
                            required={true}
                        />
                        <button type='submit' >Loguear</button>
                        <button onClick={handleclickevent} >No tienes cuenta?</button>
                        <button  onClick={logoutchange} >Desvincular</button>
                    </form>

                </div>
                    :
                    <div className={styles.all}>
                        <h4>Crea tu cuenta</h4>
                        <form className={styles.form} onSubmit={handlesubmitchange}>
                            <input
                                type='text'
                                minLength={5}
                                maxLength={12}
                                placeholder='Apodo'
                                name='name'
                                onChange={handleinputchange}
                                required={true}
                            />
                            <input
                                type='email'
                                minLength={10}
                                maxLength={30}
                                placeholder='E-Mail'
                                name='email'
                                onChange={handleinputchange}
                                required={true}
                            />
                            <input
                                type='password'
                                minLength={8}
                                maxLength={12}
                                placeholder='Contraseña'
                                name='password'
                                onChange={handleinputchange}
                                required={true}
                            />
                            <button type='submit' >Crea tu cuenta</button>
                            <button onClick={handleclickevent}>Ya tienes una  cuenta?</button>
                        </form>
                    </div>
                }
            </div>
        </React.Fragment>
    );
};

export default Login;