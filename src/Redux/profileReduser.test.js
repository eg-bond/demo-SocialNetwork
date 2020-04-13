import profileReduser, {addPost, deletePost} from "./profileReduser";
import React from 'react';

let state = {
    posts: [
        {id: 0, message: "Привет, как твои дела? а? А?", likeCount: 24},
        {id: 1, message: "Все в компуктер играешь?", likeCount: 14},
        {id: 2, message: "Петуч", likeCount: 85}
    ]
}

it('length of posts should be incremented', () => {
    // 1. test data
    let action = addPost("it-kama.com");

    // action
    let newState = profileReduser(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(4);
});

it('message of new post should be correct', () => {
    // 1. test data
    let action = addPost("it-kama.com");

    // action
    let newState = profileReduser(state, action);

    // 3. expectation
    expect(newState.posts[3].message).toBe("it-kama.com");
});

it('after deleting length of messages should be decremented', () => {
    // 1. test data
    let action = deletePost(1);

    // action
    let newState = profileReduser(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(2);
});
