import {getAuthUserData} from "./auth-reduser";

const INITIALIZATION_SUCCESS = 'INITIALIZATION_SUCCESS';


let initialState = {
    initialized: false
}

export const appReduser = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZATION_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

//Экшн креэйторы, теперь записываем без AC вконце, чтобы работал рефакторинг mapDispatchToProps
export const initializationSuccess = () => {
    return {
        type: INITIALIZATION_SUCCESS
    }
}

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(initializationSuccess());
    });
}


export default appReduser;