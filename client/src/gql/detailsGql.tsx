import { gql } from "@apollo/client"


export const REVIEW_MUTATION = gql`
    mutation ($id:ID! $rating:Int! $text: String!  $userId: String! $product:Int! ) {
        addReview (id:$id, input: {rating: $rating, text:$text, userId:$userId product:$product } )
        {
            text
            rating
            userId
        }
    }`;

export const EDIT_PRODUCT = gql `
    mutation editProduct ($name: String!, $price: Float!, $brand: String!, $image: String!, $details: String!, $categoryId: Int! $stock: Int!){
        editProduct ( input: {
        name:$name,
        price:$price,
        brand:$brand,
        image:$image,
        details:$details
        categoryId:$categoryId
        stock:!stock
      })
      {
        id
        name
        price
        brand
        image
        details
        categoryId
        stock
    }
    }
`

export const GET = gql`
    query ($id:ID!) {
        getProductById(id:$id)
        {
            id
            name
            price
            brand
            details
            image
            reviews{
                rating
                text
                userId
            }
        }
}`;
