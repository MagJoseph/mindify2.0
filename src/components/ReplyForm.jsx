import axios from "axios"
import { useState } from "react"

import Typography from "@mui/material/Typography";

const ReplyForm = ({questionId, setReplies, replies}) => {
    const [ newReply, setNewReply ] = useState({
        content: ''
    })

    const createReply = async () => {
        await axios ({
            url: `http://localhost:3001/questions/reply/${questionId}`,
            method: 'post',
            data: newReply
        })
    }

    const handleChange = (e) => {
        setNewReply({...newReply, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createReply()
        setNewReply({
            content: ''
        })
        setReplies(!replies)
        // window.location.reload(true)
    }

    return (
        <div className="centered">
        <form onSubmit={handleSubmit} className="centered">
          <textarea
            className="text-area"
            type="text"
            value={newReply.content}
            onChange={handleChange}
            name={"content"}
            placeholder={"..."}
            style={{
               height: 120,
               width: 400,
               margin: "auto",
               border: "1px solid #8A2387"
            }}
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
              width: 120,
            }}
          >
            SUBMIT
          </button>
        </form>
      </div>
    );
}

export default ReplyForm