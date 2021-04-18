import { ADD_SHOPPING, DELETE_PRODUCT, MORE_PRICE, LESS_PRICE, LOCAL, ADD_LOCALSTORAGE, DELETE_CART } from '../actions'

const initialState = {
    productTotal: [],
    quantity: 0,
    priceSubTotal: 0,
    local: []
};

export default (state = initialState, action: any): any => {
    switch (action.type) {

        case ADD_SHOPPING:

            return {
                ...state,
                productTotal: state.productTotal.concat(action.idProduct),
                priceSubTotal: state.priceSubTotal + action.idProduct.price,
                quantity: state.quantity + action.idProduct.count

            }
        case DELETE_PRODUCT:
            return {
                ...state,
                productTotal: state.productTotal.filter((filt: any) => filt.id !== action.idProduct.prductId),
                priceSubTotal: state.priceSubTotal - action.idProduct.total,
                quantity: state.quantity - action.idProduct.count
            }

        case MORE_PRICE:
            return Object.assign({}, state, {
                productTotal: state.productTotal.map((mapeo: any) => {
                    if (mapeo.id === action.price.productId) {
                        return Object.assign({}, mapeo, {
                            count: action.price.count
                        })
                    }
                    return mapeo
                }),
                priceSubTotal: state.priceSubTotal + action.price.productPrice,
                quantity: state.quantity + 1
            })

        case LESS_PRICE:
            return Object.assign({}, state, {
                productTotal: state.productTotal.map((mapeo: any) => {
                    if (mapeo.id === action.price.productId) {
                        return Object.assign({}, mapeo, {
                            count: action.price.count
                        })
                    }
                    return mapeo
                }),
                priceSubTotal: state.priceSubTotal - action.price.productPrice,
                quantity: state.quantity - 1
            })

        case LOCAL:
            return {
                ...state,
                local: state.local.concat(action.nameProduct)
            }

        case ADD_LOCALSTORAGE:
            return {
                ...state,
                productTotal: action.arrayProducts.productLocal,
                priceSubTotal: action.arrayProducts.priceSubTotal *1,
                quantity: action.arrayProducts.quantity *1

            }

        case DELETE_CART:
            return {
                ...state,
                productTotal: [],
                quantity: 0,
                priceSubTotal: 0,
                local: []

            }
        default: return state
    }
}