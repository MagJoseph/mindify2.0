import React from 'react'
import Client from '../services/api'
import { useNavigate } from 'react-router-dom'




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
    <div className='centered'>
    <button className="s-btn" onClick={handleDelete}>Delete Post</button>
    </div>
  )
}

export default Delete