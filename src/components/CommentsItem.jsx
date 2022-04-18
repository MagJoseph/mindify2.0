import React from 'react'

const CommentsItem = (props) => {
  return (
    <div className="comment-item">
        <div>{props.name}</div>
        <div>{props.content}</div>
    </div>
  )
}

export default CommentsItem