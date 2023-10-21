import { useState, useEffect } from 'react'
import Client from '../services/api'
import PostItem from "../components/PostItem"
import { useNavigate } from 'react-router-dom'
import Delete from '../components/Delete'
import UpdatePost from '../components/UpdatePost'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";


const MyProfile = (props) => {
    const [posts, setPosts] = useState([])
    const [teacherInfo, setTeacherInfo] = useState()
    const teacherCallL = localStorage.getItem('user')
    const teacher = props.teacher
    
    console.log(teacherCallL)
    let navigate = useNavigate()

    useEffect(() => {
       
      const makeApiCall = async () => {
        let res = await Client.get(`posts/${teacherCallL}`)
        setPosts(res.data)
      }
      makeApiCall();
      const teacherCall = async () => {
        let res = await Client.get(`users/${teacherCallL}`)
        setTeacherInfo(res.data)
      }
      teacherCall();
      
    }, [])

  const handleLogin = () => navigate("/login");

    return posts && teacherInfo ? (
      <div>
        <div>
          <h1>{teacher.username}</h1>
        </div>
        <div>
          <div className="home-cont">
            {posts.map((post) => (
              <div className="home-container" key={post.id}>
                <div>
                  <PostItem
                    content={post.content}
                    image={post.image}
                    {...post}
                  />
                </div>
                <div>
                  <Delete postId={post.id} />
                </div>
                <div>
                  <UpdatePost postId={post.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div>
        {" "}
        <Container sx={{ py: 3 }} maxWidth="md">
          <Stack direction="column" spacing={2} justifyContent="center" textAlign="center">
            <Typography variant="h4" style={{ color: "#8A2387", marginBottom: 20 }}>
              Please log in to see your profile
            </Typography>
            <Button
              className="hov"
              variant="outlined"
              style={{
                backgroundImage:
                  "linear-gradient(to right,  #8A2387, #E94057, #F27121)",
                color: "#FFF",
                paddingLeft: 35,
                paddingRight: 35,
                border: "none",
                margin: "auto",
                width: 200
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Stack>
        </Container>
      </div>
    );
}

export default MyProfile
