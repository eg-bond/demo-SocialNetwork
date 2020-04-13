import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../../Templates/formControls/FormControls";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login, logout} from "../../Redux/auth-reduser";
import {Redirect} from "react-router-dom";
import s from "../../Templates/formControls/FormControls.module.css";

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Email"} name={"email"} component={Input} validate={requiredField}/>
            </div>
            <div>
                <Field placeholder={"pass"} name={'pass'} type={'password'} component={Input} validate={requiredField}/>
            </div>
            <div>
                <Field component={Input} type={"checkbox"} name={'rememberMe'} /> remember me
            </div>
            { error && <div className={s.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.pass, formData.rememberMe,)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default  connect(mapStateToProps, {login, logout})(Login);
