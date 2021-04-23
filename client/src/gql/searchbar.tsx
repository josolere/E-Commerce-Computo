import { gql } from "@apollo/client"


export const GET = gql`
{
<<<<<<< HEAD
    getProducts (filter:{limit:12}) {
=======
    getProducts (filter:{limit:20}) {
>>>>>>> front_roto
        id
        name
        price
        image
    }
}`;