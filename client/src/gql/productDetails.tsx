import { gql } from "@apollo/client"


export const REVIEW_MUTATION = gql`
    mutation ReviewMutation ($id:Int! $rating:Int! $text: String! $userId: String $title:String) {
        addReview (id:$id, input: {rating: $rating text:$text userId: $userId title: $title} )
        {
            title
            rating
            text
            id
            userId
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
                title
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