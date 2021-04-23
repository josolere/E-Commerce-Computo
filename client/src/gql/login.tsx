import { gql } from "@apollo/client"


export const ACTUAL_USER = gql`
query {
    currentUser {
      id
      name
      email
      surname
      privilege
    }
  }`;


export const DELETE_USER = gql`
  mutation ($id:ID! ){
      deleteUser (id:$id)
    {
    User {
            name
        }    
    }
  }`;

export const SIGNUP_MUTATION = gql`
    mutation  ($firstName: String! $password: String! $email: String!  $lastName:String! ) {
        signup (firstName:$firstName lastName:$lastName password:$password email: $email ) 
                            {    
                                user{
                                    firstname
                                    privilege
                                }
                            }
                        
    }`;
    

export const LOGIN_MUTATION = gql`
    mutation ($email: String!  $password: String!) {
            login (email: $email password: $password) {
        user{
            id
            name
            privilege
            }  
        } 
    }`;

    export const EDIT_USER_MUTATION = gql`
    mutation  ($name:String! $password:String! $email:String! $surname:String! $username:String! $privilege:String! $active:Boolean! $address:String! ) {
        editUser (name:$name surname:$surname password:$password email:$email username:$username privilege:$privilege active:$active address:$address) 
                            {    
                                user{
                                    username
                                    privilege
                                }
                            }             
    }`;    
