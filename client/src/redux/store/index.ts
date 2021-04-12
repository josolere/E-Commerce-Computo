import { createStore,compose,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  rootReducer,
    composeEnhancer(applyMiddleware(thunk))
)
