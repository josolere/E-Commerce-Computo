import { gql } from "@apollo/client"

export const ACTUALUSER = gql`
query {
    actualtUser {
      id
      name
      email
    }
  }`;

export const LOGOUTMUTATION = gql`
  mutation LOGOUTMUTATION ($email:String! $password: String! ){
      logout (input:{email:$email password:$password})
      {
            loquellegue
      }
  }
`;

export const SIGNUPMUTATION = gql`
    mutation SIGNUPMUTATION ($name: String! $password: String! $email: String!) 
    {
        supuestosignup (input:{name:$name password: $password email: $email})
        {
            nosequellega
        }
    }`;

export const LOGINMUTATION = gql`
    mutation LOGINMUTATION ($email: String!$password: String!) 
    {
        supuestologin (input : { email: $email  password: $password } ) 
        {
            loquellega    
        }
    }`;