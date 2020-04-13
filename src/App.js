import React from 'react';
import Menu from './Templates/Navbar/Navbar';
import {Route, withRouter} from "react-router-dom";
import News from "./Content/News/News";
import Settings from "./Content/Settings/Settings";
import Music from "./Content/Music/Music";
import UsersContainer from "./Content/Users/UsersContainer";
import HeaderContainer, {SomeComponent} from "./Templates/Header/HeaderContainer";
import Login from "./Content/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reduser";
import Preloader from "./Templates/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

// import DialogsContainer from "./Content/Dialogs/DialogsContainer";
// import ProfileContainer from "./Content/Profile/ProfileContainer";
const DialogsContainer = React.lazy(() => import("./Content/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./Content/Profile/ProfileContainer"));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Menu/>
                <div className='app-wrapper-content'>
                    <Route path='/login'><Login/></Route>
                    {/*<Route path='/profile/:userId?'>{withSuspense(ProfileContainer)}</Route>*/}
                    <Route path='/profile/:userId?'
                           render={withSuspense(ProfileContainer)} />
                    <Route path='/dialogs'>{withSuspense(DialogsContainer)}</Route>
                    <Route path='/users'><UsersContainer/></Route>
                    <Route path='/news'><News/></Route>
                    <Route path='/music'><Music/></Route>
                    <Route path='/settings'><Settings/></Route>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);
