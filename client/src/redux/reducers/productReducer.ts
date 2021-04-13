import {SET_FILTER, SET_ACTIVITIES} from '../actions'

const initialState = {
    filter:"",
    categories:[]
}

function productReducer(state = initialState, action:any):any{
    switch(action.type){
        case SET_FILTER:
            return {
                ...state,
                filter: action.filter
            }
            case SET_ACTIVITIES:
                return {
                    ...state,
                    categories : action.categories
                }
        default: return state;
    }
}

export default productReducer;