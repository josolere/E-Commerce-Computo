import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation, gql } from '@apollo/client';
import { AUTH_TOKEN } from './constants'
import style from './Login.module.scss'

interface PropsLogin{
    handleClose: ()=> void
}


interface LoginSet {
    email: string,
    name: string,
    password: string,
    login: boolean,
    token: string,
}

interface LoginData {
    signup: LoginSet,
    login: LoginSet,
}

interface propsl {
    closeModal:boolean
}
const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
    ) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(
        email: $email, 
        password: $password) 
        {
      token
    }
  }
`;

const Login = ({handleClose}:PropsLogin) => {

    const history = useHistory();
    const [logform, setLogform] = useState({
        login: true,
        email: '',
        password: '',
        name: ''
    });

    const [login] = useMutation<LoginData>(LOGIN_MUTATION, {
        variables: {
            email: logform.email,
            password: logform.password
        },
        onCompleted: ({ login }) => {
            localStorage.setItem(AUTH_TOKEN, login.token);
            history.push('/');
        }
    });

    const [signup] = useMutation<LoginData>(SIGNUP_MUTATION, {
        variables: {
            name: logform.name,
            email: logform.email,
            password: logform.password
        },
        onCompleted: ({ signup }) => {
            localStorage.setItem(AUTH_TOKEN, signup.token);
            history.push('/');
        }
    });

  


    return (
        <>
            <div className={style.containerModal}>
                <div className={style.Close}>
                <button onClick={handleClose}
                    >X</button>
                </div>
                <div className={style.containerTitle}>
                    <h4>
                        {logform.login ?  'Crear Cuenta': 'Iniciar Sesion'}
                    </h4>
                </div>
                <div className={style.containerLogin}>
                    {logform.login && (
                        <input
                            value={logform.name}
                            onChange={(event) =>
                                setLogform({
                                    ...logform,
                                    name: event.target.value
                                })
                            }
                            type="text"
                            required={true}
                            placeholder="Ingresar Nombre"
                        />
                    )}
                    <input
                        value={logform.email}
                        onChange={(event) =>
                            setLogform({
                                ...logform,
                                email: event.target.value
                            })
                        }
                        type="text"
                        required={true}
                        placeholder="Ingresar Correo"
                    />
                    <input
                        value={logform.password}
                        onChange={(event) =>
                            setLogform({
                                ...logform,
                                password: event.target.value
                            })
                        }
                        type="password"
                        required={true}
                        placeholder="Ingresar Contraseña"
                    />
                </div>
                <div className={style.containerButtons}>
                    <button
                    className={style.buttonLogin}
                        onClick={() => logform.login ? login : signup}>
                        {logform.login ? 'Crear Cuenta' : 'Iniciar Sesion'}
                    </button>
                    <button
                    className={style.buttonSingUp}
                        onClick={() =>
                            setLogform({
                                ...logform,
                                login: !logform.login
                            })
                        }
                    >
                        {logform.login
                            ? 'Ya Tienes Una Cuenta?'
                            : 'Necesitas Crear Una Cuenta?'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;