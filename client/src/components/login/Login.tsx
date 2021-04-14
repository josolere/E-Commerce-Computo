import * as React from 'react'; 
import { useState }  from 'react';
import { useHistory } from 'react-router';
import { useMutation, useQuery, gql } from '@apollo/client';

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

const SIGNUPMUTATION = gql`
    mutation SIGNUPMUTATION ($name: String! $password: String! $email: String!) 
    {
        supuestosignup (input:{name:$name password: $password email: $email})
        {
            nosequellega
        }
    }
`;

const LOGINMUTATION = gql`
    mutation LOGINMUTATION ($email: String!$password: String!) 
    {
        supuestologin (input : { email: $email  password: $password } ) 
    
    {
        loquellega    
    
    }
}
`;

const Login = () => {

    const [logform, setLogform] = useState({
        login: true,
        email: '',
        password: '',
        name: ''
    });

    const [login] = useMutation<LoginData>(LOGINMUTATION, {
        variables: { email: logform.email, password: logform.password}});

    const [signup] = useMutation<LoginData>(SIGNUPMUTATION, {
        variables: { name: logform.name, email: logform.email, password: logform.password}});

    return (
        <div>
            <h4>
                {logform.login ? 'Unirse' : 'Loguearse'}
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