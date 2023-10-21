import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Client from '../services/api'

const QuestionsForm = (props) => {
    const [ newQuestion, setNewQuestion ] = useState({
        title: '',
        content: '',
      })

      const [ newUser, setNewUser ] = useState({
        name: '',
        email: '',
      })

      let navigate= useNavigate()

      const createUser = async () => {
          let res = await Client({
              url: `newuser`,
              method: 'post',
              data: newUser
          })
          return res.data.id
      }

      const createQuestion = async (userId) => {
          await Client.post (`questions/${userId}`, newQuestion)
      }

      const userHandleChange = (e) => {
          setNewUser({...newUser, [e.target.name]: e.target.value})
      }

      const questionHandleChange = (e) => {
          setNewQuestion({...newQuestion, [e.target.name]: e.target.value})
      }

      const handleSubmit = async (e) => {
          e.preventDefault()
          let userId = await createUser()
          console.log(userId)
          console.log(typeof userId)
          createQuestion(userId)
          setNewQuestion({
            title: '',
            content: '',
          })
          setNewUser({
            name: '',
            email: '',
          })
          navigate('/questions')
      }

    return (
        <div className="s-container centered">
       <h2 className="new-post">Ask Your Question</h2>
    <div>
        <div>
            <form onSubmit={handleSubmit} className="submit-form"> 
                  <input className="input" type="text" value={newQuestion.title} onChange={questionHandleChange} name={'title'} placeholder={'title'} />
                  <textarea className="in-cont input" type="text" value={newQuestion.content} onChange={questionHandleChange} name={'content'} placeholder={'your question'} />

                  <input className="input" type="text" value={newUser.name} name={'name'} onChange={userHandleChange} placeholder={'your name'} />
                  <input className="input" type="text" value={newUser.email} name={'email'} onChange={userHandleChange} placeholder={'email'} />
                  <button className="s-btn">Submit</button>
          </form>
        </div>
    </div>
    </div>
    )
}

export default QuestionsForm