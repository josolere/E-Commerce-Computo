import { gql } from "@apollo/client"


export const ACTUAL_USER = gql`
query{
    currentUser{
      id
      privilege
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
        signup (name:$name password: $password email: $email)
        {
            user {
                id
            }
        }
    }`;
    

export const LOGIN_MUTATION = gql`
    mutation LOGINMUTATION ($email:String! $password: String! ){
            login(email: $email, password: $password) {
             user {
            id
            }
        }
  }`;