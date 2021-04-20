import { gql } from "@apollo/client"


export const ACTUAL_USER = gql`
query {
    currentUser {
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
  }`;

export const SIGNUP_MUTATION = gql`
    mutation  ($firstName: String! $password: String! $email: String!  $lastName:String!) {
        signup (firstName:$firstName lastName:$lastName password:$password email: $email ) 
                            {    
                                user{
                                    username
                                }
                            }
                        
    }`;

export const LOGIN_MUTATION = gql`
    mutation ($email: String!  $password: String!) {
            login (email: $email password: $password) {
        user{
            id
            }  
        } 
    }`;
