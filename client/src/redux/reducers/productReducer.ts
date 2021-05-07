import {SET_FILTER, SET_CATEGORIES} from '../actions'

const initialState = {
    filter:"",
    categories:[],
    id: 1
}

function productReducer(state = initialState, action: any): any {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
      
    default:
      return state;
  }
}

export default productReducer;
