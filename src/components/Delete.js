import React from 'react'
import Client from '../services/api'
import { useNavigate } from 'react-router-dom'

import Button from "@mui/material/Button";

const Delete = (props) => {
  
  let navigate = useNavigate()

  const deletePost = async () => {
        await Client.delete(`posts/${props.postId}`);
  }

   const handleDelete = () => {
      deletePost()
       navigate('/posts')
       window.location.reload(false)
   }

  return (
    <Button
      style={{ color: "#8A2387" }}
      size="small"
      onClick={() => handleDelete()}
    >
     Delete
    </Button>
  );
}

export default Delete