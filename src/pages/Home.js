import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect} from 'react' 
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
   const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [getResults, setGetResults] = useState(false)

   const getSearchResults = async (e) => {
     e.preventDefault();
     let res = await Client.get(`/search/${searchQuery}`);
     console.log(res.data);
     setSearchResults(res.data);
     setGetResults(true);
   };

   const handleChange = (e) => {
     setSearchQuery(e.target.value);
   };


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
      <div className="centered">
        <form onSubmit={getSearchResults}>
          <input
            className="input"
            type="text"
            name="search"
            value={searchQuery}
            placeholder="I'm looking for..."
            onChange={handleChange}
            style={{ height: 30 }}
          ></input>
          <button
            className="new-button"
            style={{
              backgroundImage:
                "linear-gradient(to right,  #8A2387, #E94057, #F27121)",
              padding: 10,
              borderRadius: 5,
              fontSize: 14,
              color: "#fff",
              width: 170,
            }}
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <Container sx={{ py: 3 }} maxWidth="md">
        {searchResults && getResults ? (
          <Grid container spacing={4}>
            {searchResults.map((result) => (
              <Grid item key={result.id} xs={12} sm={6} md={4}>
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
                    image={result.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {result.title}
                    </Typography>
                    <Typography>
                      {result.content.substring(0, 100)}...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      style={{ color: "#8A2387" }}
                      size="small"
                      onClick={() => showPost(result)}
                    >
                      View
                    </Button>
                    <Button
                      style={{ color: "#8A2387" }}
                      size="small"
                      onClick={() => editPost(result)}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
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
        )}
      </Container>
    </div>
  );
}

export default Home