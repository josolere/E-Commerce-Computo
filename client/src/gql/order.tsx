import { gql } from "@apollo/client"


// export const LIST_ORDER = gql`
// query ($id: ID!){
//     getOrderById (id:$id) {
//         id
//         status 
//         details{      
//           id
//          quantity
//           price
//           ProductId 
//           OrderId
//         }   
//     }
// }
    
// `;

export const LIST_ORDER = gql`
query ($idUser: ID!){
    getOrdersByIdUser (idUser:$idUser) {
        id
        status  
        createdAt
        details{      
          id
          ProductId
          
        }

    }
}
`;
