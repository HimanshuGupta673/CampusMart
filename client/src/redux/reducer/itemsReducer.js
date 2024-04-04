import * as actionTypes from '../actions/type'

export const itemsReducer = (state = [] , action) =>{
  switch(action.type){
     case actionTypes.SELL_NEWITEM:
        return [action.payload,...state];
        // return { ...state, data: [...state.data, action.payload] }
      case actionTypes.GET_ALLITEMS:
        return action.payload  
      case actionTypes.GET_CATEGORYITEMDETAILS:
        return action.payload
    default:
        return state;
  }
}
export const itemDetailsReducer = (state = {} , action) =>{
  switch(action.type){
    case actionTypes.GET_ITEMDETAILS:
    return action.payload
    default:
        return state;
  }
}
export const categoryItemReducer = (state = [] , action) =>{
  switch(action.type){
    case actionTypes.GET_CATEGORYITEMDETAILS:
        return action.payload
    default:
        return state;
  }
}
export const cartItemReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_TOCART:
      return [action.payload, ...state];
    case actionTypes.GET_CARTITEMS:
      return action.payload;
    case actionTypes.DELETE_CARTITEM:
      // the filter method returns a new array containing the filtered elements.
      return state.filter(product => product._id !== action.payload);
    default:
      return state;
  }
};
