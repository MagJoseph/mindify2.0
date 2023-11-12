import { useState, useEffect } from 'react'
import Client from '../services/api'
import PostItem from "../components/PostItem"
import { useNavigate } from 'react-router-dom'
import Delete from '../components/Delete'
import UpdatePost from '../components/UpdatePost'

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";


const MyProfile = (props) => {

    const [posts, setPosts] = useState([])
    const [teacherInfo, setTeacherInfo] = useState()
    const teacherCallL = localStorage.getItem('user')
  
  const teacher = props.teacher
  const authenticated = props.authenticated
    
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
  
   const showPost = (posts) => {
     navigate(`/posts/postdetail/${posts.id}`);
   };

   const editPost = (posts) => {
     navigate(`/posts/postdetail/${posts.id}/update`);
   };
  
 

  const handleLogin = () => navigate("/login");

    return authenticated ? (
      <div className="centered">
        <Typography variant="h4" style={{ color: "#8A2387" }}>
          Hello, {teacher.username}
        </Typography>

        <Container sx={{ py: 3 }} maxWidth="md">
          <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image={post.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {post.title}
                    </Typography>
                    <Typography>{post.content.substring(0, 100)}...</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      style={{ color: "#8A2387" }}
                      size="small"
                      onClick={() => showPost(post)}
                    >
                      View
                    </Button>
                    <Button
                      style={{ color: "#8A2387" }}
                      size="small"
                      onClick={() => editPost(post)}
                    >
                      Edit
                    </Button>
                    <div>
                      <Delete postId={post.id} />
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    ) : (
      <div>
        {" "}
        <Container sx={{ py: 3 }} maxWidth="md">
          <Stack
            direction="column"
            spacing={2}
            justifyContent="center"
            textAlign="center"
          >
            <Typography
              variant="h4"
              style={{ color: "#8A2387", marginBottom: 20 }}
            >
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
                width: 200,
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
