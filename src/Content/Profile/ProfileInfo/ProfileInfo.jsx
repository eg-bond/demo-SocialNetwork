import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../../Templates/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus"
import userPhoto from "../../../Assets/userPhoto.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";

function ProfileInfo(props) {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData);
        setEditMode(false);
    }

    return (         
        <div >
            <div className={s.profile}>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                { editMode ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={props.profile} isOwner={props.isOwner} savePhoto={props.savePhoto} goToEditMode={()=>setEditMode(true)}/> }
            </div>
        </div>         
    );
}

const ProfileData = (props) => {

    const mainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    return <div>
        <img src={props.profile.photos.large || userPhoto} className={s.mainPhoto}/>
        {props.isOwner && <input type={"file"} onChange={mainPhotoSelected}/>}
        { props.isOwner && <div><button onClick={props.goToEditMode}>edit</button></div> }
        <div>
            <b>Имя пользователя:</b> {props.profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {props.profile.lookingForAJob ? "yes" : "no"}
        </div>
        {props.profile.lookingForAJob &&
        <div>
            <b>My professional skills</b>: {props.profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About me</b>: {props.profile.aboutMe}
        </div>
        <div>
            <b>Contacts: </b>: {Object.keys(props.profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
        }) }
        </div>
    </div>
}


const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;