import { gql } from "@apollo/client"


export const ACTUAL_USER = gql`
query {
<<<<<<< HEAD
    actualtUser {
      id
      name
      email
=======
    currentUser {
      id
      name
      privilege
>>>>>>> front_roto
    }
  }`;

export const LOGOUT_MUTATION = gql`
  mutation LOGOUTMUTATION ($email:String! $password: String! ){
      logout (input:{email:$email password:$password})
      {
            loquellegue
      }
<<<<<<< HEAD
  }
`;

export const SIGNUP_MUTATION = gql`
    mutation SIGNUPMUTATION ($name: String! $password: String! $email: String!) 
    {
        supuestosignup (input:{name:$name password: $password email: $email})
        {
            nosequellega
        }
    }`;

export const LOGIN_MUTATION = gql`
    mutation LOGINMUTATION ($email: String!$password: String!) 
    {
        supuestologin (input : { email: $email  password: $password } ) 
        {
            loquellega    
        }
    }`;
=======
  }`;

export const SIGNUP_MUTATION = gql`
    mutation  ($firstName: String! $password: String! $email: String!  $lastName:String!) {
        signup (firstName:$firstName lastName:$lastName password:$password email: $email ) 
                            {    
                                user{
                                    username
                                    privilege
                                }
                            }
                        
    }`;
    

export const LOGIN_MUTATION = gql`
    mutation ($email: String!,  $password: String!) {
            login (email: $email, password: $password) {
                user{
                    id
                    username
                    name
                    surname
                    privilege
                    }  
                } 
    }`;
>>>>>>> front_roto
