import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../../Templates/formControls/FormControls";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login, logout} from "../../Redux/auth-reduser";
import {Redirect} from "react-router-dom";
import s from "../../Templates/formControls/FormControls.module.css";
import {AppStateType} from "../../Redux/redux-store";

// 1. InjectedFormProps<> собирает в себе типы исползуемых в форме пропсов
// Также в форму могут передаваться пропсы извне (капча). Такие пропсы описываются отдельным типом и передаются внутрь InjectedFormProps<>...
// ... таким образом: React.FC<InjectedFormProps<LoginFormValuesType, SomeOtherPropsType> & SomeOtherPropsType>
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {/*<div>*/}
                {/*<Field placeholder={"Email"} name={"email"} component={Input} validate={requiredField}/>*/}
            {/*</div>*/}
            {/*<div>*/}
                {/*<Field placeholder={"pass"} name={'pass'} type={'password'} component={Input} validate={requiredField}/>*/}
            {/*</div>*/}
            {/*<div>*/}
                {/*<Field component={Input} type={"checkbox"} name={'rememberMe'} /> remember me*/}
            {/*</div>*/}
            {createField<LoginFormValuesKeysType>("Email", "email", [requiredField], Input)}
            {createField<LoginFormValuesKeysType>("Pass", "pass", [requiredField], Input, {type: "password"})}
            {createField<LoginFormValuesKeysType>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

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

// 2. В HOC reduxForm мы передаем также наши пропсы, однако не оборачиваем их InjectedFormProps
const LoginReduxForm = reduxForm<LoginFormValuesType>({
    // a unique name for the form
    form: 'login'
})(LoginForm)


type MapStatePropsType = {
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, pass: string, rememberMe: boolean) => void
}

export type LoginFormValuesType = {
    email: string
    pass: string
    rememberMe: boolean
}

//Extract позволяет вытащить из файла с типами конкретные значения, в нашем случае все что являются string
type LoginFormValuesKeysType = Extract<keyof LoginFormValuesType, string> // 'email', 'pass', 'rememberMe'


const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: any) => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login, logout})(Login);
