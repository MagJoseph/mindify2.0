import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Client from '../services/api'

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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
    
      const goBack = () => {
       navigate("/questions")
      };

    return (
      <div className="home-cont">
        <Container sx={{ py: 3 }} maxWidth="md">
          <Stack direction="column" spacing={2}>
            <Typography variant="h4" style={{ color: "#8A2387" }}>
              Ask a Question
            </Typography>
            <form className="centered" onSubmit={handleSubmit}>
              <input
                className="new-input"
                type="text"
                value={newQuestion.title}
                onChange={questionHandleChange}
                name={"title"}
                placeholder={"title"}
                style={{ height: 35 }}
              />
              <textarea
                className="new-input"
                type="text"
                value={newQuestion.content}
                onChange={questionHandleChange}
                name={"content"}
                placeholder={"your question"}
                style={{ height: 90 }}
              />

              <input
                className="new-input"
                type="text"
                value={newUser.name}
                name={"name"}
                onChange={userHandleChange}
                placeholder={"your name"}
                style={{ height: 35 }}
              />
              <input
                className="new-input"
                type="text"
                value={newUser.email}
                name={"email"}
                onChange={userHandleChange}
                placeholder={"email"}
                style={{ height: 35 }}
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
                  width: 200,
                }}
              >
                SUBMIT
              </button>
              <Button
                className="hov"
                variant="outlined"
                style={{
                  borderColor: "#8A2387",
                  color: "#8A2387",
                  backgroundColor: "white",
                  width: 200,
                }}
                onClick={goBack}
              >
                Go back
              </Button>
            </form>
          </Stack>
        </Container>
      </div>
    );
}

export default QuestionsForm