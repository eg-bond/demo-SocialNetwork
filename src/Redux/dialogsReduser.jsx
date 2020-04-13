const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Volodya'},
        {id: 2, name: 'Ilon Mask'},
        {id: 3, name: 'Alexey Panin'},
        {id: 4, name: 'Yuri Dudb'}
    ],
    messages: [
        {id: 1, message: 'Мемасик'},
        {id: 2, message: 'Очень смешной мемасик'},
        {id: 3, message: 'Ссылка на новый выпуск "что было дальше"'},
        {id: 4, message: 'Че сука игнор? ))'}
    ],
    newMessageText: ''
}

const dialogsReduser = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            // let newMessage = state.newMessageText;
            let length = state.messages.length + 1;
            return {
                ...state,
                newMessageText: '',
                messages: [...state.messages, {id: length, message: action.messageText}]
            }
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.messageText
            }
        default:
            return state;
    }
}

export const sendMessage = (messageText) => {
    return {
        type: SEND_MESSAGE,
        messageText
    }
}

export const updateNewMessage = (messageText) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        messageText: messageText
    }
}

export default dialogsReduser;