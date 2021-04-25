import { gql } from "@apollo/client"


export const ACTUAL_USER = gql`
query {
    currentUser {
        id
        name
        email
        surname
        privilege
        username
        address
        password
    }
  }`;



export const SIGNUP_MUTATION = gql`
    mutation  ($firstName: String! $password: String! $email: String!  $lastName:String! $username:String! $address:String! ) {
        signup (firstName:$firstName lastName:$lastName password:$password email: $email username:$username address:$address ) 
                            {    
                                user {
                                    name
                                }
                                    
                            
                            }
                        
    }`;
    
    export const GET_USERS = gql`
    query {
        getUsers{
            id
            name
            privilege
            email
            surname
            address
            password
            username
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

    
export const DELETE_USER = gql`
mutation ($id:ID! ){
    deleteUser (id:$id)
  {
          name
          
  }
}`;

export const EDIT_USER_MUTATION = gql`
mutation( $id:ID! $name:String! $password:String! $email:String! $surname:String! $username:String! 
    $privilege:String! $active:Boolean! $address:String! ) 
    {
    editUser (id:$id  input: {name:$name surname:$surname password:$password email:$email 
        username:$username privilege:$privilege active:$active address:$address}) 
                        { 
                            name
                            privilege
                        }             
}`;  

export const LOGOUT = gql `
  mutation {
      logout
          }`;