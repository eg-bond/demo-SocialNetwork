import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {Textarea} from "../../../Templates/formControls/FormControls";

let maxLength10 = maxLengthCreator(10);

const PostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"postText"} validate={[requiredField, maxLength10]} placeholder={'post message'}></Field>
            </div>
            <div className={s.postButtons}>
                <button>Add post</button>
                <button>Remove post</button>
            </div>
        </form>
    )
}

const PostsReduxForm = reduxForm({
    form: 'posts'
})(PostsForm)


const MyPosts = React.memo(props => {

    console.log("render");

    let postsElements = props.posts.map(p => <Post message={p.message} likeCount={p.likeCount}/>)

    const onAddPost = (formData) => {
        props.addPost(formData.postText);
    }

    return (
        <div className={s.myPosts}>
            <h3>My posts</h3>
            <PostsReduxForm onSubmit={onAddPost}/>
            {postsElements}
        </div>
    )
});



export default MyPosts;