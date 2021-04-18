import { gql } from "@apollo/client"


export const GET = gql`
{
    getProducts (filter:{limit:12}) {
        id
        name
        price
        image
    }
}`;