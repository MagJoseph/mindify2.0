import React from 'react'



const CommentsItem = (props) => {
  return (
    <div
      className="comment"
      style={{
        margin: 10,
        fontSize: 14,
      }}
    >
      <div style={{ paddingLeft: 10 }}>{props.name} wrote:</div>
      <div style={{ paddingLeft: 10 }}>{props.content}</div>
    </div>
  );
}

export default CommentsItem