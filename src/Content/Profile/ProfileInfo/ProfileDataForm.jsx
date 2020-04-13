import React, {useState} from 'react';
import {createField, Input, Textarea} from "../../../Templates/formControls/FormControls";
import {Field, reduxForm} from "redux-form";
import {requiredField} from "../../../utils/validators/validators";

const ProfileDataForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <img src={props.profile.photos.large} />
        <div><button onClick={() => {}}>save</button></div>
        <div>
            {/*<b>Full name:</b> {createField("Full name", "fullName", [], Input)}*/}
            <b>Full name:</b> <Field placeholder={"Full name"} name={"fullName"} component={Input}/>
        </div>
        <div>
            <b>Looking for a job:</b> <Field placeholder={""} name={"lookingForAJob"} type={"checkbox"} component={Input}/>
        </div>
        <div>
            <b>My professional skills</b>: <Field placeholder={"My professional skills"} name={"lookingForAJobDescription"} component={Textarea}/>
        </div>
        <div>
            <b>About me</b>: <Field placeholder={"About me"} name={"aboutMe"} component={Textarea}/>
        </div>
        {/*<div>*/}
            {/*<b>Contacts: </b>: {Object.keys(props.profile.contacts).map(key => {*/}
            {/*return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>*/}
        {/*}) }*/}
        {/*</div>*/}
    </form>
}

const ProfileDataFormReduxForm = reduxForm({
    // a unique name for the form
    form: 'edit-profile'
})(ProfileDataForm)

export default ProfileDataFormReduxForm