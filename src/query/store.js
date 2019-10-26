import {
    createStore,
    compose,
    applyMiddleware,
    combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(reducers), composeEnhancers(
    applyMiddleware(thunk)
));

export default store;