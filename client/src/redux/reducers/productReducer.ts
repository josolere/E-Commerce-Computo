import {SET_FILTER, SET_CATEGORIES} from '../actions'

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
<<<<<<< HEAD
            case SET_ACTIVITIES:
=======
            case SET_CATEGORIES:
>>>>>>> c905d7cd8d645423639b8429a0fdda2401420957
                return {
                    ...state,
                    categories : action.categories
                }
        default: return state;
    }
}

export default productReducer;