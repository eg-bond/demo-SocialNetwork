import {profileAPI, UpdateStatusCodeEnum, usersAPI} from "../api/api";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";

let initialState = {
    posts: [
        {id: 0, message: "Привет, как твои дела? а? А?", likeCount: 24},
        {id: 1, message: "Все в компуктер играешь?", likeCount: 14},
        {id: 2, message: "Петуч", likeCount: 85}
    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null,
    status: ""
}

export type InitialStateType = typeof initialState

export const profileReduser = (state = initialState, action: ActionsTypes): InitialStateType  => {
    switch (action.type) {
        case 'ADD_POST': {
            let length = state.posts.length + 1;
            return {
                ...state,
                posts: [...state.posts, {id: length, message: action.postText, likeCount: 0 }]
            }
        }
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        case 'UPDATE_NEW_POST_TEXT':
            return {
                ...state,
                newPostText: action.postText
            }
        case 'SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    addPost: (postText: string) => ({type: 'ADD_POST', postText}) as const,
    deletePost: (postId: number) => ({type: 'DELETE_POST', postId}) as const,
    updateNewPostText: (postText: string) => ({type: 'UPDATE_NEW_POST_TEXT', postText}) as const,
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile}) as const,
    setStatus: (status: string) => ({type: 'SET_STATUS', status}) as const,
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos}) as const
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserProfile = (userId: number | null): ThunkType => {
    return async (dispatch) => {
        let response = await usersAPI.getUserProfile(userId);
        debugger;
        dispatch(actions.setUserProfile(response));
    }
}

export const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        let statusText = await profileAPI.getUserStatus(userId);
        dispatch(actions.setStatus(statusText));
    }
}

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        let statusData = await profileAPI.updateStatus(status);
        if (statusData.resultCode === UpdateStatusCodeEnum.Success) {
            dispatch(actions.setStatus(status));
        }
    }
}

export const savePhoto = (file: any): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(file);

        if (response.data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(response.data.data.photos))
        }
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        let response = await profileAPI.saveProfile(profile)

        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId))
        }
    }
}

export const showProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        let profileData = await usersAPI.getUserProfile(userId)
        dispatch(actions.setUserProfile(profileData))
    }
}


export default profileReduser;