import { gql } from "@apollo/client"


export const REVIEW_MUTATION = gql`
    mutation ReviewMutation ($id:Int $userId:String $rating:Int $text:String $title:String) {
        addReview (id:$id, input: {userId:$userId rating: $rating text:$text title:$title } )
        {
            rating
            text
            id
            title
        }
    }
`;

export const EDIT_PRODUCT = gql `
mutation editProduct ($id:String,$name: String, $price: Float, $brand: String, $image: String, $details: String, $stock: Int ,$categories:[ID!]) {
    editProduct ( 
      id:$id,
      input: {
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
            stock
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