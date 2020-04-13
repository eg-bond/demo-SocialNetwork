import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';


let initialState = {
    posts: [
        {id: 0, message: "Привет, как твои дела? а? А?", likeCount: 24},
        {id: 1, message: "Все в компуктер играешь?", likeCount: 14},
        {id: 2, message: "Петуч", likeCount: 85}
    ],
    newPostText: 'it-kamasutra',
    profile: null,
    status: ""
}

export const profileReduser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            // let newPostText = state.newPostText;
            let length = state.posts.length + 1;
            return {
                ...state,
                // newPostText: '',
                posts: [...state.posts, {id: length, message: action.postText, likesCount: 0 }]
            }
        }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.postText
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SAVE_PHOTO_SUCCESS:
            debugger;
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
}

export const addPost = (postText) => {
    return {
        type: ADD_POST,
        postText
    }
}
export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}
export const updateNewPostText = (postText) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        postText
    }
}
export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}
export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
}
export const savePhotoSuccess = (photos) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
    }
}

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getUserProfile(userId);

    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getUserStatus(userId);

    dispatch(setStatus(response.data));
}


export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    }
}

export const showProfile = (userId) => async (dispatch) => {
    let profileData = await usersAPI.getUserProfile(userId)

    dispatch(setUserProfile(profileData));
}


export default profileReduser;