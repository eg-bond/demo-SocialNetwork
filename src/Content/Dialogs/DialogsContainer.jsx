import React from  'react';
import Dialogs from "./Dialogs";
import {sendMessage, updateNewMessage} from "../../Redux/dialogsReduser";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText
    }
}

export default compose(
    connect(mapStateToProps, {sendMessage, updateNewMessage}),
    withAuthRedirect
)(Dialogs);