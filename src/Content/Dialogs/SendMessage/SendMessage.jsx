import React from  'react';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../Templates/formControls/FormControls";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";

const maxLength50 = maxLengthCreator(50);

const SendMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={"messageText"} component={Textarea} validate={[requiredField, maxLength50]}/>
            <div>
                <button>SendMessage</button>
            </div>
        </form>
    )
}

const SendMessageReduxForm = reduxForm({
    form: 'messages'
})(SendMessageForm);


function SendMessage(props) {
    const onSubmit = (formData) => {
        props.sendMessage(formData.messageText);
    }

    return (<SendMessageReduxForm onSubmit={onSubmit}/>);
}

export default SendMessage;