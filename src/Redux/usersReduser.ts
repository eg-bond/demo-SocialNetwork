import {DefaultResponseCodeEnum, usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UsersType} from "../types/types";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS'

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> //array of users id
}

type InitialStateType = typeof initialState

export const usersReduser = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
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

// Собираем все типы экшенов в один чтобы типизировать Экшен входящий в редьюсер
type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType
    | SetTotalUsersCountActionType | ToggleIsFetchingActionType | ToggleFollowingInProgressActionType

type FollowSuccessActionType = {
    type: typeof FOLLOW,
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId})

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId})

type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({type: SET_USERS, users})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number
}
export const setTotalUsersCount = (totalUsercCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, count: totalUsercCount})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})

type ToggleFollowingInProgressActionType = {
    type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
    isFetching: boolean
    userId: number
}
export const togglefollowingInProgress = (isFetching: boolean, userId: number): ToggleFollowingInProgressActionType => ({type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId})

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

// export const getUsersThunkCreator = (page: number, pageSize: number) => async (dispatch: DispatchType, getState: GetStateType) => {
//     dispatch(toggleIsFetching(true));
//     dispatch(setCurrentPage(page));
//
//     let data = await usersAPI.getUsers(page, pageSize);
//     dispatch(toggleIsFetching(false));
//     dispatch(setUsers(data.items));
//     dispatch(setTotalUsersCount(data.totalCount));
// }

export const getUsersThunkCreator = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any,
                                   actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(togglefollowingInProgress(true, userId));

    let response = await apiMethod(userId);
    if (response.data.resultCode === DefaultResponseCodeEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(togglefollowingInProgress(false, userId));
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
}


export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
}


export default usersReduser;