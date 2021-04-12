import { FileWatcherEventKind } from 'typescript';
import {SET_FILTER} from '../actions'

const initialState = {
    filter:""
}

function productReducer(state = initialState, action:any):any{
    switch(action.type){
        case SET_FILTER:
            return {
                ...state,
                filter: action.filter
            }
        default: return state;
    }
}

export default productReducer;