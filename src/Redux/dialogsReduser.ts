const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND_MESSAGE';

type DialogType = {
    id: number,
    name: string
}
type MessageType = {
    id: number,
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Volodya'},
        {id: 2, name: 'Ilon Mask'},
        {id: 3, name: 'Alexey Panin'},
        {id: 4, name: 'Yuri Dudb'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Мемасик'},
        {id: 2, message: 'Очень смешной мемасик'},
        {id: 3, message: 'Ссылка на новый выпуск "что было дальше"'},
        {id: 4, message: 'Че сука игнор? ))'}
    ] as Array<MessageType>,
    newMessageText: ''
}

export type InitialStateType = typeof initialState

const dialogsReduser = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE:
            let length = state.messages.length + 1;
            return {
                ...state,
                newMessageText: '',
                messages: [...state.messages, {id: length, message: action.messageText}],
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

type ActionsTypes = sendMessageActionType | updateMessageActionType

type sendMessageActionType = {type: typeof SEND_MESSAGE, messageText: string}
export const sendMessage = (messageText: string): sendMessageActionType => ({type: SEND_MESSAGE, messageText})

type updateMessageActionType = {type: typeof UPDATE_NEW_MESSAGE_TEXT, messageText: string}
export const updateNewMessage = (messageText: string): updateMessageActionType => ({type: UPDATE_NEW_MESSAGE_TEXT, messageText})

export default dialogsReduser