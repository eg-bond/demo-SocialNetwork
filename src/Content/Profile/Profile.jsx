import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import {updateNewPost} from "../../Redux/profileReduser";
import Preloader from "../../Templates/Preloader/Preloader";
import {Redirect} from "react-router-dom";


const Profile = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         isOwner={!props.match.params.userId}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}/>
            <MyPosts posts={props.posts}
                     addPost={props.addPost}
                     updateNewPostText={props.updateNewPostText}
                     newPostText={props.newPostText}/>
        </div>
    );
}



export default Profile;