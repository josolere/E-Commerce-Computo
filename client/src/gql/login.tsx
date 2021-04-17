import { gql } from "@apollo/client"


export const ACTUAL_USER = gql`
query {
    actualtUser {
      id
      name
      email
    }
  }`;

export const LOGOUT_MUTATION = gql`
  mutation LOGOUTMUTATION ($email:String! $password: String! ){
      logout (input:{email:$email password:$password})
      {
            loquellegue
      }
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