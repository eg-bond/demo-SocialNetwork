import React from 'react'
import s from "./Users.module.css";
import userPhoto from "../../Assets/userPhoto.png";
import {NavLink} from "react-router-dom";
// import {togglefollowingInProgerss} from "../../Redux/usersReduser";
import {UsersType} from "../../types/types";

// type UserType = {
//     id: number
// }
//
// type PropsType = {
//     user: Array<UserType>
//     followingInProgress: Array<number>
//     unfollow: (userId: number) => void
//     follow: (userId: number) => void
// }

let User = (props) => {
    let user = props.user;
    return (
        <div>
            <span>
                <div>
                    <NavLink to={`/profile/${user.id}`}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.usersPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={props.followingInProgress.some(id => id === user.id)}
                                  onClick={ () => {props.unfollow(user.id);} }>Unfollow</button>
                        : <button disabled={props.followingInProgress.some(id => id=== user.id)}
                                  onClick={ () => {props.follow(user.id);} }>Follow</button>}
                </div>
            </span>
            <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </span>
            <span>
                <div>{"u.location.country"}</div>
                <div>{"u.location.city"}</div>
            </span>
        </div>
    )
}

export default User;