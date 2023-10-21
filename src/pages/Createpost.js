import React from 'react'
import { useState } from 'react'
import Client from '../services/api'
import { useNavigate } from 'react-router-dom'


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

  return (

    <div className="s-container">
       <h2 className="new-post">ADD A NEW POST</h2>
    <div className="form-form">
    
          <form className="submit-form" onSubmit={handleSubmit}> 
                  <input className="input" type="text" value={newPost.title} onChange={handleChange} name={'title'} placeholder={'title'} />
                  <input className="input" type="text" value={newPost.tag} onChange={handleChange} name={'tag'} placeholder={'tags'} />
                  <input className="in-cont input" type="text" value={newPost.content} onChange={handleChange} name={'content'} placeholder={'content'} />
                  <input className="input" type="text" value={newPost.image} onChange={ handleChange} name={'image'} placeholder={'image url'} />
                  <button className="s-btn">Submit</button>
          </form>
    </div>
    </div>
  )
}

export default CreatePost