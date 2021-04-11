import * as React from 'react'; 
import { useState }  from 'react';
import { useHistory } from 'react-router';
import { useMutation, gql } from '@apollo/client';
import { AUTH_TOKEN } from './constants'

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

const Login = () => {
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
        <div>
            <h4>
                {logform.login ? 'Loguearse' : 'Unirse'}
            </h4>
            <div>
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
                        placeholder="Su Nombre"
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
                    placeholder="Su dirección de E-Mail"
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
                    placeholder="Elija un password seguro"
                />
            </div>
            <div>
                <button
                    onClick={() => logform.login ? login : signup}>
                    {logform.login ? 'Loguearse' : 'Crear una cuenta'}
                </button>
                <button
                    onClick={() =>
                        setLogform({
                            ...logform,
                            login: !logform.login
                        })
                    }
                >
                    {logform.login
                        ? 'Necesita crear una cuenta?'
                        : 'Ya tiene una cuenta?'}
                </button>
            </div>
        </div>
    );
};

export default Login;