import {combineReducers, compose, applyMiddleware, createStore} from "redux";
import profileReduser from "./profileReduser";
import dialogsReduser from "./dialogsReduser";
import usersReduser from "./usersReduser";
import authReduser from "./auth-reduser";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appReduser from "./app-reduser";

let rootReducer = combineReducers({
    profilePage: profileReduser,
    dialogsPage: dialogsReduser,
    usersPage: usersReduser,
    auth: authReduser,
    form: formReducer,
    app: appReduser
})

type RootReducerType = typeof rootReducer  // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>  // ReturnType вытаскивает возвращаемое из функции значение

// создаем типизацию для всех экшенов
type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))


// @ts-ignore - эта запись позволяет проигнорировать следующую строчку компилятором TS
window.__store__ = store

export default store