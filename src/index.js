import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware,compose,combineReducers} from 'redux';
import burgerBuilder from './store/reducers/burgerBuilder';
import thunk from 'redux-thunk';
import orderReducer from './store/reducers/order';
const composeEnhancers= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
    burgerBuilder:burgerBuilder,
    order:orderReducer
})
const store= createStore(rootReducers,composeEnhancers(
    applyMiddleware(thunk)
));

const app =(
    <Provider store={store}>
<BrowserRouter> 
<App/>
</BrowserRouter>
</Provider>
);

ReactDOM.render(app , document.getElementById('root'));
registerServiceWorker();
