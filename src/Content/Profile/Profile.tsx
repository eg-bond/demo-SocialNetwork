import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import Preloader from "../../Templates/Preloader/Preloader";
import {PostType, ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType | null,
    posts: Array<PostType>,
    newPostText: string,
    status: string,

    addPost: (postText: string) => void,
    updateNewPostText: (postText: string) => void,
    updateStatus: (status: string) => void,
    savePhoto: (file: any) => void,
    saveProfile: (profile: ProfileType) => void

    match: any,
}


const Profile: React.FC<PropsType> = (props) => {
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
            {/*<MyPosts posts={props.posts}*/}
                     {/*addPost={props.addPost}*/}
                     {/*updateNewPostText={props.updateNewPostText}*/}
                     {/*newPostText={props.newPostText}/>*/}
        </div>
    );
}



export default Profile;