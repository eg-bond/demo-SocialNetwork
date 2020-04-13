import React from 'react';
import {addPost, updateNewPost} from "../../../Redux/profileReduser";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

//Часть стейта, которую мы хотим передать из стора через пропсы в компоненту MyPost
let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
//Колбэки, которые мы хотим передать из стора через пропсы в компоненту MyPost
let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            dispatch(updateNewPost(text));
        },
        addPost: () => {
            dispatch(addPost());
        }
    }
}
//connect вызывает двойной вызов функции, первая функция на основе переданных в нее данных возвращает пропсы, ..
// .. которые затем помещаются в компоненту, переданную во второй вызов (MyPosts)
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;