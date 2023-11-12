import Client from '../services/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReplyForm from '../components/ReplyForm'

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import PersonPinIcon from "@mui/icons-material/PersonPin";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";



const Question = ({ authenticated, teacher }) => {

  const [ questions, setQuestions] = useState([])
  const [replies, setReplies] = useState(true)
  
  let navigate = useNavigate();  
  
  const handleQuestion = () => {
    navigate('/questions/new')
  
  }

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

   

    return (
      <div>
        <Container sx={{ py: 3 }} maxWidth="md">
          <div className="centered">
            <Typography variant="h3" style={{ color: "#8A2387" }}>
              Q & A
            </Typography>
            <br />
            <Button
              className="hov"
              variant="contained"
              style={{
                backgroundImage:
                  "linear-gradient(to right,  #8A2387, #E94057, #F27121)",
                paddingRight: 35,
                paddingLeft: 35,
              }}
              onClick={handleQuestion}
            >
              Ask a Question
            </Button>
          </div>
          <br />
          <Grid container spacing={4}>
            {questions.map((question) => (
              <Grid item key={question.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      style={{ fontWeight: "bold", color: "#8A2387" }}
                    >
                      {question.user.name}
                    </Typography>
                    <Divider />
                    <Typography
                      style={{ fontWeight: "bold", color: "#E94057" }}
                    >
                      <ContactSupportIcon /> Question:
                    </Typography>
                    <Typography gutterBottom component="h2">
                      {question.content}
                    </Typography>
                    <Divider />
                    <Typography style={{ color: "#F27121" }}>
                      Answers:
                    </Typography>
                    <div>
                      {question.replies.map((reply) => (
                        <div>
                          <Typography key={reply.content}>
                            <PersonPinIcon fontSize="medium" /> {reply.content}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <br />
          <div className="centered">
            {authenticated && teacher ? null : (
              <div className="centered">
                <Typography
                  variant="h4"
                  style={{ color: "#8A2387", padding: 10, marginBottom: 10 }}
                >
                  Please log in to reply
                </Typography>
              </div>
            )}
          </div>
        </Container>
      </div>
    );
}

export default Question