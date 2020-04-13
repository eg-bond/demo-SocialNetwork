import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

//Экшн креэйторы, теперь записываем без AC вконце, чтобы работал рефакторинг mapDispatchToProps
export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth}
    }
}

// export const getAuthUserData = () => (dispatch) => {
//     return authAPI.isLogged()
//         .then(authData => {
//             if (authData.resultCode === 0) {
//                 let {id, login, email} = authData.data;
//                 dispatch(setAuthUserData(id, email, login, true));
//             }
//         });
// }

export const getAuthUserData = () => async (dispatch) => {
    let authData = await authAPI.isLogged();

    if (authData.resultCode === 0) {
        let {id, login, email} = authData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}


export const login = (email, pass, rememberMe) => {
    return async (dispatch) => {
        let response = await authAPI.login(email, pass, rememberMe)

        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}));
        }
    }
}

export const logout = (email, pass, rememberMe) => {
    return async (dispatch) => {
        let response = await authAPI.logout()

        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}


export default authReduser;