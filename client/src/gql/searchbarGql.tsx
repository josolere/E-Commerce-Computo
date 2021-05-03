import { gql } from "@apollo/client"


export const GET = gql`
{
    getProducts (filter:{limit:20}) {
        id
        name
        price
        image
    }
}`;