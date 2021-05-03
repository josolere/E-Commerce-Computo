import { gql } from "@apollo/client"


export const NEW_PRODUCT = gql`
mutation NewProduct ($name: String!, $price: Float!, $brand: String!, $image: String!, $details: String!, $stock:Int , $categories:[Int]!) {
    createProduct ( input: {
        name:$name,
        price:$price, 
        brand:$brand, 
        image:$image, 
        details:$details
        categories:$categories
        stock:$stock

      })
        {
            id
            name
          	categories
          
        }
    }
`;
