import React from 'react';
import Profile from "./Profile";
import {
    actions,
    showProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile
} from "../../Redux/profileReduser";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {PostType, ProfileType} from "../../types/types";
import {AppStateType} from "../../Redux/redux-store";

type MapStatePropsType = {
    profile: ProfileType | null
    posts: Array<PostType>,
    newPostText: string,
    status: string,
    authorizedUserId: number | null,
    isAuth: boolean
}
type MapDispatchPropsType = {
    addPost: (postText: string) => void,
    updateNewPostText: (postText: string) => void,
    showProfile: (userId: number) => void,
    getStatus: (userId: number) => void,
    updateStatus: (status: string) => void,
    savePhoto: (file: any) => void,
    saveProfile: (profile: ProfileType) => void
}
type WithRouterPropsType = {
    match: any,
    history: Array<string>
}
type PropsType = MapStatePropsType & MapDispatchPropsType & WithRouterPropsType

class ProfileContainer extends React.Component<PropsType> {

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

    componentDidUpdate(prevProps: PropsType, prevState: MapStatePropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, WithRouterPropsType, AppStateType>(
        mapStateToProps, {addPost: actions.addPost, updateNewPostText: actions.updateNewPostText, showProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter
)(ProfileContainer);