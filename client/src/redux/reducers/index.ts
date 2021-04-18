import { combineReducers } from 'redux'
import productReducer from './productReducer'


const rootReducer = combineReducers({
    productReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;