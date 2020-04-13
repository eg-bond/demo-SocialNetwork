import React from 'react';
import Header from './Header';
import {connect} from "react-redux";
import {
    getAuthUserData, logout
} from "../../Redux/auth-reduser";
import compose from "redux/src/compose";

// class HeaderContainer extends React.Component {
//
//     render() {
//        return <Header {...this.props} />
//     }
// }

// export default connect(mapStateToProps, {getAuthUserData, logout}) (HeaderContainer);

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default compose(
    connect(mapStateToProps, {getAuthUserData, logout}),
)(Header);






