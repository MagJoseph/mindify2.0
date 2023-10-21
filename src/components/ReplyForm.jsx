import axios from "axios"
import { useState } from "react"



const ReplyForm = ({question, setReplies, replies}) => {
    const [ newReply, setNewReply ] = useState({
        content: ''
    })



    const createReply = async () => {
        await axios ({
            url: `http://localhost:3001/questions/reply/${question.id}`,
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

    return(
        <div className="home-cont">
            <form onSubmit={handleSubmit} className="submit-form">
                <textarea className="in-cont input" type="text" value={newReply.content} onChange={handleChange} name={'content'} placeholder={'your answer'} />
                <button className="s-btn">Submit</button>
            </form>
        </div>
    )
}

export default ReplyForm