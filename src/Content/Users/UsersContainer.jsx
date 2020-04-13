import React from 'react'
import {connect} from "react-redux";
import {
    follow,
    unfollow,
    getUsersThunkCreator
} from "../../Redux/usersReduser";
import Users from "./Users";
import Preloader from "../../Templates/Preloader/Preloader";
import {API} from "../../api/api";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSuperSelector
} from "../../Redux/users-selectors";



class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize) // санка
        // this.props.toggleIsFetching(true);
        // API.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //         this.props.toggleIsFetching(false);
        //         this.props.setUsers(data.items);
        //         this.props.setTotalUsersCount(data.totalCount);
        //     });
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize) // санка
    }

    render() {
        return <>
            { this.props.isFetching ? <Preloader /> : null }
            <Users users={this.props.users}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   followingInProgress={this.props.followingInProgress} />
        </>
    }
}

let mapStateToProps = (state) => { //state берется из замыкания, state это store
    return {
        // users: getUsers(state),
        users: getUsersSuperSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}



//рефакторинг mapDispatchToProps:
let mapDispatchToPropsObject = {follow, unfollow, getUsers: getUsersThunkCreator}


export default compose(
    connect(mapStateToProps, mapDispatchToPropsObject),
    withAuthRedirect
)(UsersContainer);
