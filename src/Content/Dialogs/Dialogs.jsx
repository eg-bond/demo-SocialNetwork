import React from  'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import SendMessage from "./SendMessage/SendMessage";
import {Redirect} from "react-router-dom";


function Dialogs(props) {

    let dialogsElements = props.dialogs.map ( d => <DialogItem name={d.name} id={d.id} key={d.id}/>);
    let messagesElements = props.messages.map ( m => <Message message={m.message} id={m.id} key={m.id}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div>{dialogsElements}</div>
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <SendMessage sendMessage={props.sendMessage}/>
                {/*<SendMessage messages={props.messages}*/}
                             {/*newMessageText={props.newMessageText}*/}
                             {/*sendMessage={props.sendMessage}*/}
                             {/*onMessageChange={props.updateNewMessage} />*/}

            </div>
        </div>
    );
}

export default Dialogs;