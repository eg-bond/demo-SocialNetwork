import profileReduser from "./profileReduser";
import dialogsReduser from "./dialogsReduser";

let store = {
    _state: {
        profilePage: {
            posts: [
                {message: "Привет, как твои дела? а? А?", likeCount: 24},
                {message: "Все в компуктер играешь?", likeCount: 14},
                {message: "Петуч", likeCount: 85}
            ],
            newPostText: 'it-kamasutra'
        },
        dialogsPage: {
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
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('state changed');
    },
    subscribe(observer) {
        this._callSubscriber = observer; // паттерн - observer
    },
    dispatch(action) { // { type: 'ADD-POST' } например
        this._state.profilePage = profileReduser(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReduser(this._state.dialogsPage, action);
        this._callSubscriber();
    }
}

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND_MESSAGE';


export default store;