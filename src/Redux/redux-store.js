import {combineReducers, compose, createStore} from "redux";
import profileReduser from "./profileReduser";
import dialogsReduser from "./dialogsReduser";
import usersReduser from "./usersReduser";
import authReduser from "./auth-reduser";
import applyMiddleware from "redux/src/applyMiddleware";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appReduser from "./app-reduser";

let reducers = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialogsReduser,
    usersPage: usersReduser,
    auth: authReduser,
    form: formReducer,
    app: appReduser
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.__store__ = store;
export default store;