import React from 'react'
import PostItem from '../components/PostItem'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect} from 'react' 
import  MotivationComp  from '../components/MotivationComp'
import Client from '../services/api'

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";



const Home = () => {

  //set post state
 const [posts, setPosts] = useState([])


 let navigate = useNavigate()  

 //after clicking on post it will go to PostDetails
    const showPost = (posts) => {  
        navigate(`/posts/postdetail/${posts.id}`)
  } 
  
  const editPost = (posts) => {
     navigate(`/posts/postdetail/${posts.id}/update`);
  }

 //call to access posts   
const getPosts = async () => {
   const list = await Client.get(`posts`)
   console.log(list.data)
   setPosts(list.data)
}

useEffect(() => {
    getPosts()
 }, [])

  return (
    <div>
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
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* <div className="center">
        <MotivationComp />
      </div>
      <div className="home-cont">
        {posts.map((post) => (
          <div
            className="home-container"
            onClick={() => showPost(post)}
            key={post.id}
          >
            <PostItem
              title={post.title}
              image={post.image}
              content={post.content}
              teacherId={post.teacher_id}
            />
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Home