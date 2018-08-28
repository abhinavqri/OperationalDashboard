import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import EmployeeDetailsReducer from '../src/Reducers/EmployeeDetailsReducer';
import {Provider} from 'react-redux';

var myStore =  createStore(EmployeeDetailsReducer,applyMiddleware(thunkMiddleware));

ReactDOM.render(<Provider store={myStore}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
