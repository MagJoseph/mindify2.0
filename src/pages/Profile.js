import Sidebar from "../components/Sidebar"


const Profile = () => {

    return (
        <div>
            <Sidebar />
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
                    // user={tweet.user_id}
                    timeStamp={post.createdAt}
                    {...tweet}
                />
                ))}
            </div>
        </div>
    )
}

export default Profile