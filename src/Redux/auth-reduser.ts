import {authAPI, ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = 'auth/SET_USER_DATA';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false
}

export type InitialStateType = typeof initialState;

export const authReduser = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}

type ActionsTypes = SetAuthUserDataActionType | FormAction // FormAction - тип из Redux-Form

type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
export type SetAuthUserDataActionType = {type: typeof SET_USER_DATA, payload: SetAuthUserDataActionPayloadType}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean):SetAuthUserDataActionType => {
    return {
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth}
    }
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        let authData = await authAPI.isLogged();
        if (authData.resultCode === ResultCodesEnum.Success) {
            let {id, login, email} = authData.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
}


export const login = (email: string, pass: string, rememberMe: boolean): ThunkType => {
    return async (dispatch) => {
        let loginData = await authAPI.login(email, pass, rememberMe)

        if (loginData.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData());
        } else {
            let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}));
        }
    }
}

export const logout = (email: string, pass: string, rememberMe: boolean): ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.logout();

        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export default authReduser;