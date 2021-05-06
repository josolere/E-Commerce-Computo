import { gql } from "@apollo/client"


export const ACTUAL_USER = gql`
query {
    currentUser {
        id
        name
        surname
        address
        email
        password
        googleId
        street
        city
        state
        zip
        phone
        privilege
    }
  }`;

export const EDIT_MUTATION = gql`
    mutation ($id:ID! $firstname:String $email:String $lastName:String $username:String
            $street:String $city:String $zip:String $phone:String $state:String )
    {
        editUser (id:$id input:{firstname:$firstname email:$email lastname:$lastname username:$username
                street:$street city:$city zip:$zip phone:$phone state:$state})
                {
                    id
                }
    }
`



export const SIGNUP_MUTATION = gql`
    mutation  ($firstName: String! $password: String! $email: String!  
                $lastName:String! $username:String $street:String  
                $city:String $state:String $zip: String $phone: String 
                ) {
        signup (firstName:$firstName lastName:$lastName password:$password
                 email: $email username:$username street: $street 
                 city:$city state:$state zip:$zip phone:$phone 
                 ) 
                    {    
                        user {
                            name
                            id
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

export const CREATE_ADMIN = gql`
mutation(  $privilege:String! $id:ID!) 
    {
    editUser (id:$id  input: { privilege:$privilege }) 
                        { 
                            id
                        }             
}`;

export const CHANGE_PASSWORD = gql`
mutation(  $password:String! $id:ID!) 
    {
    editUser (id:$id  input: { password:$password }) 
                        { 
                            name
                            privilege
                        }             
}`;

export const LOGOUT = gql`
  mutation {
      logout
          }`;


export const RETRIEVE_PASSWORD = gql`
    mutation ($id: ID!,  $resetPass: String) {
        editUser (id: $id, input:{resetPass:$resetPass})
                    {
                        id
                        resetPass
                    }  
    }`;

    export const GET_USERS_BY_ID_RETRIEVE = gql`
    query ($id:ID!){
        getUserById (id:$id){
            resetPass
        }
    }`;

    export const GET_USERS_BY_EMAIL = gql`
    query ($email:String){
        getUserByEmail (email:$email){
            id
        }
    }`;
