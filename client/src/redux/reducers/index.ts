import { combineReducers } from 'redux'
import productReducer from './productReducer'
import shoppingCartReducer from './ShoppingCartReducer'


const rootReducer = combineReducers({
    productReducer,
    shoppingCartReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;