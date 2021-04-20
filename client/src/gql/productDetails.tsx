import { gql } from "@apollo/client"


export const REVIEW_MUTATION = gql`
    mutation ReviewMutation ($id:Int! $rating:Int! $text: String! $product:Int!) {
        addReview (id:$id, input: {rating: $rating text:$text product:$product} )
        {
            rating
            text
            id
        }
    }
`;

export const EDIT_PRODUCT = gql `
mutation editProduct ($id:String,$name: String, $price: Float, $brand: String, $image: String, $details: String,$categories:[ID!]) {
    editProduct ( 
      id:$id,
      input: {
        name:$name,
        price:$price, 
        brand:$brand, 
        image:$image, 
        details:$details
        categories:$categories

      })
        {
            id
          
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
            categories{
                id
                name

            }
            reviews{
                id
                text
                rating
                
            }
        }
}`;

export const GET_CATEGORIES = gql`
query {
    getCategory {
        id
        name
    }
}
`