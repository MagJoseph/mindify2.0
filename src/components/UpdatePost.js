import React from 'react'
import Client from '../services/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";


const Update = (props) => {
    let navigate = useNavigate()


 //set all the states   
 const [ title, setTitle ] = useState('')   
 const [ content, setContent ] = useState('')
 const [ image, setImgUrl ] = useState('')
 

 //grab a post by id to update
const getPostToUpdate = async () => {
     await Client.put(`posts/${props.postId}`, {
     title: title,
     content: content,
     image: image,
    });

}

const handleSubmit= (e) => {
     e.preventDefault()
     getPostToUpdate()
     //returns back to home page after submitting
     navigate('/posts')
     window.location.reload(false)
}
  
  const handleHome = () => navigate("/posts");

  return (
    <div className="home-cont">
      <Container sx={{ py: 3 }} maxWidth="md">
        <Stack direction="column" spacing={2}>
          <Typography variant="h4" style={{ color: "#8A2387" }}>
            Update your post
          </Typography>
          <form className="centered" onSubmit={handleSubmit}>
            <input
              className="new-input"
              type="text"
              title="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Title"
              style={{ height: 35 }}
            />
            <textarea
              className="new-input"
              type="text"
              title="title"
              onChange={(e) => {
                setContent(e.target.value);
              }}
              placeholder="Content"
              style={{ height: 90 }}
            />
            <input
              className="new-input"
              type="text"
              image="image"
              onChange={(e) => {
                setImgUrl(e.target.value);
              }}
              placeholder="Image Url"
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
              onClick={handleHome}
            >
              CANCEL
            </Button>
          </form>
        
        </Stack>
      </Container>
    </div>
  );
}

export default Update