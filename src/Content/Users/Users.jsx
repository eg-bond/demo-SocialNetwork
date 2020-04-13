import React from 'react'
import {togglefollowingInProgerss} from "../../Redux/usersReduser";
import Paginator from "../../Templates/Paginator/Paginator";
import User from "./User";


let Users = (props) => {
    return (
        <div>
            <Paginator currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}
                       totalItemsCount={props.totalUsersCount}
                       pageSize={props.pageSize} />
            <div>
                {
                    props.users.map( u => <User user={u}
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