import { gql } from "@apollo/client"


export const REVIEW_MUTATION = gql`
    mutation ($id:ID! $rating:Int! $text: String! $product:Int! $userId: String!) {
        addReview (id:$id, input: {rating: $rating text:$text product:$product, userId:$userId} )
        {
            rating
            text
            id
        }
    }`;

export const EDIT_PRODUCT = gql `
    mutation editProduct ($name: String!, $price: Float!, $brand: String!, $image: String!, $details: String!, $categoryId: Int!){
        editProduct ( input: {
        name:$name,
        price:$price,
        brand:$brand,
        image:$image,
        details:$details
        categoryId:$categoryId
      })
      {
        id
        name
        price
        brand
        image
        details
        categoryId
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
        }
}`;
