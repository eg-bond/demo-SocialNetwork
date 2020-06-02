import React from 'react'
import Paginator from "../../Templates/Paginator/Paginator";
import User from "./User";
import {UsersType} from "../../types/types";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: React.FC<PropsType> = (props) => {
    return (
        <div>
            <Paginator currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}
                       totalItemsCount={props.totalUsersCount}
                       pageSize={props.pageSize} />
            <div>
                {
                    props.users.map(u => <User user={u}
                                               followingInProgress={props.followingInProgress}
                                               key={u.id}
                                               unfollow={props.unfollow}
                                               follow={props.follow}
                    />)
                }
            </div>
        </div>
    );
}

export default Users;