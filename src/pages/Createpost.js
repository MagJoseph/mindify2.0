import React from 'react'
import { useState } from 'react'
import Client from '../services/api'
import { useNavigate } from 'react-router-dom'

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";


const CreatePost = (props) => {

  //grabs teachers id
  const teacher = props.teacher.id
  
  let navigate = useNavigate()

  //set state of new post
  const [ newPost, setNewPost ] = useState({
    title: '',
    tag: '',
    content: '',
    image: '',
  })

 const getNewPost = async () => {
     await Client({
       url: `posts/${teacher}`,
       method: 'post',
       data: newPost
     })
 }

 const handleChange = (e) => {
      setNewPost({...newPost, [e.target.name]: e.target.value })
      console.log(newPost)
 } 

 const handleSubmit = (e) => {
   e.preventDefault()
    getNewPost()
    //returns back to posts after submitting
    navigate('/posts')
    window.location.reload(false)
 }
  
   const goHome = () => {
     navigate("/posts");
   };

  return (
    <div className="home-cont">
      <Container sx={{ py: 3 }} maxWidth="md">
        <Stack direction="column" spacing={2}>
          <Typography variant="h4" style={{ color: "#8A2387" }}>
            Create a New Post
          </Typography>
          <form className="centered" onSubmit={handleSubmit}>
            <input
              className="new-input"
              type="text"
              value={newPost.title}
              onChange={handleChange}
              name={"title"}
              placeholder={"title"}
              style={{ height: 35 }}
            />
            <input
              className="new-input"
              type="text"
              value={newPost.tag}
              onChange={handleChange}
              name={"tag"}
              placeholder={"tags"}
              style={{ height: 35 }}
            />
            <textarea
              className="new-input"
              type="text"
              value={newPost.content}
              onChange={handleChange}
              name={"content"}
              placeholder={"content"}
              style={{ height: 90 }}
            />
            <input
              className="new-input"
              type="text"
              value={newPost.image}
              onChange={handleChange}
              name={"image"}
              placeholder={"image url"}
              style={{ height: 35 }}
            />
            <button
              className="new-button"
              style={{
                backgroundImage:
                  "linear-gradient(to right,  #8A2387, #E94057, #F27121)",
                padding: 10,
                borderRadius: 5,
                fontSize: 14,
                color: "#fff",
                width: 200,
              }}
            >
              SUBMIT
            </button>
            <Button
              className="hov"
              variant="outlined"
              style={{
                borderColor: "#8A2387",
                color: "#8A2387",
                backgroundColor: "white",
                width: 200,
              }}
              onClick={goHome}
            >
             Home
            </Button>
          </form>
        </Stack>
      </Container>
    </div>
  );
}

export default CreatePost