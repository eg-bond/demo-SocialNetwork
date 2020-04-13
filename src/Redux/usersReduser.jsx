import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS'


let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

export const usersReduser = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                // users: state.users.map( u => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: true}
                //     }
                //     return u;
                // })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS:
            return { ...state, users: [...action.users ]}
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.count}
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching}
        }
        case TOGGLE_FOLLOWING_IN_PROGRESS: {
            return { ...state,
                     followingInProgress: action.isFetching
                     ? [...state.followingInProgress, action.userId]
                     : state.followingInProgress.filter(id => id != action.userId) // можно заменить вся эту строку на []
            }
        }
        default:
            return state;
    }
}

//Экшн креэйторы, теперь записываем без AC вконце, чтобы работал рефакторинг mapDispatchToProps
export const followSuccess = (userId) => {
    return {
        type: FOLLOW,
        userId
    }
}
export const unfollowSuccess = (userId) => {
    return {
        type: UNFOLLOW,
        userId
    }
}
export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}
export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}
export const setTotalUsersCount = (totalUsercCount) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        count: totalUsercCount
    }
}
export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}
export const togglefollowingInProgress = (isFetching, userId) => {
    return {
        type: TOGGLE_FOLLOWING_IN_PROGRESS,
        isFetching,
        userId
    }
}

export const getUsersThunkCreator = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(togglefollowingInProgress(true, userId));

    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(togglefollowingInProgress(false, userId));
}

export const follow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
}


export const unfollow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    // dispatch(togglefollowingInProgress(true, userId));
    //
    // let response = await apiMethod(userId);
    // if (response.data.resultCode === 0) {
    //     dispatch(actionCreator(userId));
    // }
    // dispatch(togglefollowingInProgress(false, userId));
}


export default usersReduser;