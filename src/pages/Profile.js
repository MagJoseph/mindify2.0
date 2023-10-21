import { useState, useEffect } from 'react'
import Client from '../services/api'
import PostItem from "../components/PostItem"



const Profile = (props) => {
    const [posts, setPosts] = useState([])
    const teacher = props.teacher
    

    useEffect(() => {
      const makeApiCall = async () => {
        let res = await Client.get(``)
        setPosts(res.data.posts)
      }
      makeApiCall();
    }, [])

    return (
        <div>
            <div>
                <h1>{teacher.username}</h1>
                <h2>{teacher.firstName}{teacher.lastName}</h2>
                <p>{teacher.experience}</p>
                <p>{teacher.about}</p>
            </div>
            <div className="posts">
                {posts.map((post) => (
                <PostItem 
                    key={post._id}
                    post={post.content}
                    timeStamp={post.createdAt}
                    {...post}
                />
                ))}
            </div>
        </div>
    )
}

export default Profile