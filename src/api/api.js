import * as axios from "axios/index";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "eb69b3e8-917a-49ee-9f12-0bd6391cb0cb"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        // return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`, {
        //     //     withCredentials: true
        //     // })
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {return response.data;});
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getUserProfile(userId) {
        console.warn('obsolete method. Please use profileAPI object')
        return profileAPI.getUserProfile(userId);
    }
}

export const profileAPI = {
    getUserProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => {return response.data;});
    },
    getUserStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status});
    },
    savePhoto(photoFile) {
        let formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile);
    }
}

export const authAPI = {
    isLogged() {
        return  instance.get(`auth/me`)
            .then(response => {return response.data;});
    },
    login(email, password, rememberMe = false) {
        return  instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return  instance.delete(`auth/login`)
    },
}


