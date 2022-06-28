import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectAllUsers } from "./usersSlice";
import { selectAllPosts } from "../posts/postsSlice"

export const UsersList = () => {

    const users = useSelector(selectAllUsers);
    console.log(users);

    const posts = useSelector(selectAllPosts)
    console.log(posts)

    const [active, setActive] = useState(false);

    const handleActive = () => {

        setActive(!active)
    }

    const calculateReaction = (name, userId) => {
        let total = 0
        posts.map((post) => post.user === userId ? total += post.reactions[name] : total = total)
        return total;
    }


    const listOfUsers = users.map((user) => {
        return (
            <div>
                <h1>{user.id}: -------------- {user.name}</h1>

                <h3>
                    👍:{calculateReaction("thumbsUp", user.id)} <br></br>
                    🎉:{calculateReaction("hooray", user.id)}<br></br>
                    ❤️:{calculateReaction("heart", user.id)}<br></br>
                    🚀:{calculateReaction("rocket", user.id)}<br></br>
                    👀:{calculateReaction("eyes", user.id)}<br></br>
                </h3>

                {active ? <div><p>These are the list of {user.name} 's posts: </p>

                    <ul>
                        {posts.map((post) => post.user === user.id ? <li>{post.title} - </li> : null)}

                    </ul> </div> : null}


            </div>
        )
    })

    return (
        <div>
            <button onClick={handleActive}>See The User's Posts</button>
            <h2>Users Will be Listed There</h2>
            {listOfUsers}

        </div>
    )
}