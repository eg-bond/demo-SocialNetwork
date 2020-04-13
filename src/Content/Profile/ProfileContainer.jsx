import React from 'react';
import Profile from "./Profile";
import {
    addPost,
    updateNewPostText,
    showProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile
} from "../../Redux/profileReduser";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {API} from "../../api/api";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }

        this.props.showProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }


    render() {
        // if (!this.props.isAuth) return <Redirect to={"/login"}/>;

        return (
            <Profile {...this.props} />
        )

    }
}


let mapDispatchToPropsObject = {addPost, updateNewPostText, showProfile, getStatus, updateStatus, savePhoto, saveProfile }


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, mapDispatchToPropsObject),
    withRouter
    // withAuthRedirect
)(ProfileContainer);