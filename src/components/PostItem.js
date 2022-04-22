import React from 'react'
import { useEffect, useState } from 'react'
import { environment } from '..'
import axios from 'axios'


const PostItem = (props) => {
  const [teacherInfo, setTeacherInfo] = useState()

  const getTeacherName = async () => {
    let res = await axios.get(`${environment.apiUrl}${props.teacherId}`)
    console.log(res.data)
    setTeacherInfo(res.data)
  }

  useEffect(() => {
    getTeacherName()
 }, [])
 
  return (
    <div className="list-item">
    <p className="post-title"> {props.title}</p>
    <div>
      <p>{teacherInfo.username}</p>
    </div>
    <img src={props.image} alt="Post"/>
    <br></br>
    <p className="post-content"> {props.content}</p>
    <br></br>
</div>
  )
}

export default PostItem