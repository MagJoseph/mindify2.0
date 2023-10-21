import React from 'react'
import { useState } from 'react'
import Client from '../services/api'
import { useNavigate, useParams } from 'react-router-dom'


import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const CommentsForm = () => {
  
    let navigate = useNavigate()

const [newComment, setNewComment ] = useState({
    name: '',
    content: '',
    postId: []
})
 
let { id } = useParams()
  

  const getNewComment = async () => {
      console.log(newComment)
      await Client({
          url: `comments/${id}`,
          method: 'post',
          data: newComment
      })
  }

  const handleChange = (e) => {
      setNewComment({...newComment, [e.target.name]: e.target.value })
      console.log(e.target.name)
      console.log(e.target.value)
  }

  const submitForm = (e) => {
    e.preventDefault()
    getNewComment()
    navigate(`/posts/postdetail/${id}`)
    window.location.reload(false)
  }
  
  const goBack = () => {
    navigate(`/posts/postdetail/${id}`);
  }

    return (
      <div className="home-cont">
        <Container sx={{ py: 3 }} maxWidth="md">
          <Stack direction="column" spacing={2}>
            <Typography variant="h4" style={{ color: "#8A2387" }}>
              We'd love to hear your feedback!
            </Typography>
            <form className="centered" onSubmit={submitForm}>
              <input
                className="new-input"
                type="text"
                value={newComment.name}
                onChange={handleChange}
                name={"name"}
                placeholder={"Your name here"}
                style={{ height: 35 }}
              />
              <textarea
                className="new-input"
                type="text"
                value={newComment.content}
                onChange={handleChange}
                name={"content"}
                placeholder={"Your comment here"}
                style={{ height: 90 }}
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
                  width: 200
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
                  width: 200
                }}
                onClick={goBack}
              >
                Go back
              </Button>
            </form>
          </Stack>
        </Container>
      </div>
    );
}

export default CommentsForm

