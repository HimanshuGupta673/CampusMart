import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { itemsReducer ,itemDetailsReducer, categoryItemReducer,cartItemReducer } from '../reducer/itemsReducer';


const reducer = combineReducers({
    items:itemsReducer,
    itemDetails:itemDetailsReducer,
    categoryItems:categoryItemReducer,
    cartItems:cartItemReducer
})


const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;