import { gql } from "@apollo/client"


export const GET = gql`
{
<<<<<<< HEAD
<<<<<<< HEAD
    getProducts (filter:{limit:12}) {
=======
    getProducts (filter:{limit:20}) {
>>>>>>> front_roto
=======
    getProducts (filter:{limit:20}) {
>>>>>>> LogFront
        id
        name
        price
        image
    }
}`;