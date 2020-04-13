import React from 'react';
import s from './Post.module.css';

function Post(props) {
    return (         
        <div className={s.item}>
            <img src='https://1.bp.blogspot.com/-ug1OQUVf5VU/V9hSWiYHnHI/AAAAAAAABvs/rat9oeCgzs48WUmN6Jdr9P5T7rLt1AaBACLcB/s1600/asimmetrichnoye-litso-3.jpeg'></img>
            <span>{props.message}</span>
            <div>like {props.likeCount}</div>
        </div>
    );
}

export default Post;