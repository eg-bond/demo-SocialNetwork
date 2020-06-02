import axios, {AxiosResponse} from "axios";
import {ProfileType, UsersType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "eb69b3e8-917a-49ee-9f12-0bd6391cb0cb"
    }
});

export enum DefaultResponseCodeEnum {
    Success = 0,
    Error = 1
}
type DefaultResponseType = {
    data: Object
    resultCode: UpdateStatusCodeEnum
    messages: Array<string>
}

type GetUsersResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        // return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`, {
        //     //     withCredentials: true
        //     // })
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {return response.data;});
    },
    follow(userId: number) {
        return instance.post<DefaultResponseType>(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete<DefaultResponseType>(`follow/${userId}`)
    },
    getUserProfile(userId: number | null) {
        console.warn('obsolete method. Please use profileAPI object')
        return profileAPI.getUserProfile(userId);
    }
}


export enum UpdateStatusCodeEnum {
    Success = 0,
    Error = 1
}
type UpdateUserStatusType = {
    data: Object
    resultCode: UpdateStatusCodeEnum
    messages: Array<string>
}

export const profileAPI = {
    getUserProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => {return response.data;});
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(res => {return res.data;});
    },
    updateStatus(status: string) {
        return instance.put<UpdateUserStatusType>(`profile/status`, {status: status})
            .then(res => {return res.data;});
    },
    savePhoto(photoFile: any) {
        let formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile);
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}

type IsLoggedResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    isLogged() {
        return  instance.get<IsLoggedResponseType>(`auth/me`).then(res => {return res.data;});
    },
    login(email: string, password: string, rememberMe = false) {
        return  instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe}).then(res => {return res.data})
    },
    logout() {
        return  instance.delete(`auth/login`)
    },
}

