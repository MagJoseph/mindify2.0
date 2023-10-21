import Client from '../services/api'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReplyForm from '../components/ReplyForm'


const Question = ({ authenticated, teacher }) => {
    const [ questions, setQuestions] = useState([])
    const [ replies, setReplies ] = useState(true)

    const getQuestions = async () => {
        const list = await Client.get(`questions`)

        console.log(list.data)
        setQuestions(list.data)
    }

    useEffect(() => {
        const run = async () => {
            await getQuestions()
        }
        run()
        

    }, [replies])

    console.log(replies)

    return (
      <div>
        <div className="center">
          <h1 className="ask-q">QUESTIONS</h1>
        </div>
        <div className="home-cont">
          <div className="newQ">
            <Link to={`/questions/new`} className="ask">
              Ask a Question
            </Link>
          </div>
          {questions.map((question) => (
            
            <div className="home-container" key={question.id}>
              <div>
                <h3 className="quest-class">Name:</h3>
                <p className="quest-title"> {question.user.name} </p>
              </div>
              <h3 className="quest-class">Question:</h3>
              <div className="quest-title">
                <p className="q-title">{question.title}</p>
                <p className="quest-cont">{question.content}</p>
              </div>
              <div className="centered">
                <h3 className="quest-class"> Replies:</h3>
                {question.replies.map((reply) => (
                  <p className="quest-title" key={reply.content}>
                    {reply.content}
                  </p>
                ))}
              </div>
              <div>
                {authenticated && teacher ? (
                  <ReplyForm
                    question={question}
                    setReplies={setReplies}
                    replies={replies}
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Question