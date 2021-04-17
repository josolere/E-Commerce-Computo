import { gql } from "@apollo/client"


export const NEW_CATEGORY = gql`
mutation NewCategory ($name: String!) {
    createCategory ( input: {
        name:$name
      })
        {
            id
            name
        }
    }
    
`;

export const GET_CATEGORIES = gql`
query {
    getCategory {
        id
        name
    }
}
`