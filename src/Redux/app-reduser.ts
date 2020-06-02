import {getAuthUserData} from "./auth-reduser";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const INITIALIZATION_SUCCESS = 'INITIALIZATION_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}


//внутри скобок мы задаем типы для входящих аргументов, после скобок но до стрелки мы зададем тип для возвращаемого значения
export const appReduser = (state = initialState, action: InitializationSuccessActionType): InitialStateType => {
    switch (action.type) {
        case INITIALIZATION_SUCCESS:
            return {
                ...state,
                initialized: true,
            }

        default:
            return state;
    }
}

type InitializationSuccessActionType = {
    type: typeof INITIALIZATION_SUCCESS
}
export const initializationSuccess = (): InitializationSuccessActionType => ({type: INITIALIZATION_SUCCESS});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, InitializationSuccessActionType>

export const initializeApp = (): ThunkType => {
    return async (dispatch) => {
        await dispatch(getAuthUserData())
        await dispatch(initializationSuccess())
    }
}

export default appReduser;