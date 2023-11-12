import React from 'react'
import Client from '../services/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReplyForm from '../components/ReplyForm'

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import PersonPinIcon from "@mui/icons-material/PersonPin";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Question = ({ authenticated, teacher }) => {

  const [ questions, setQuestions] = useState([])
  const [replies, setReplies] = useState(true)
  const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
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

   console.log(questions)

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
                  <CardContent
                    sx={{ flexGrow: 1 }}
                    style={{ position: "relative" }}
                  >
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
                      <ContactSupportIcon className="vertical" /> Question:
                    </Typography>

                    <Typography gutterBottom component="h2">
                      {question.content}
                    </Typography>
                    <Divider />
                    {question.replies ? (
                      <div>
                        <Typography style={{ color: "#F27121" }}>
                          Answers:
                        </Typography>

                        <div>
                          {question.replies.map((reply) => (
                            <div key={reply.content}>
                              <Typography style={{ paddingBottom: 18 }}>
                                <PersonPinIcon className="vertical" />{" "}
                                {reply.content}
                              </Typography>
                              <br />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {authenticated && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          marginTop: 7,
                        }}
                      >
                        <br />
                        <Button
                          onClick={handleClickOpen}
                          className="hov"
                          variant="contained"
                          style={{
                            backgroundImage:
                              "linear-gradient(to right,  #8A2387, #E94057, #F27121)",
                            paddingRight: 35,
                            paddingLeft: 35,
                            marginBottom: 10,
                          }}
                          size="small"
                        >
                          Reply
                        </Button>

                        <BootstrapDialog
                          onClose={handleClose}
                          aria-labelledby="customized-dialog-title"
                          open={open}
                        >
                          <DialogTitle
                            sx={{ m: 0, p: 2 }}
                            id="customized-dialog-title"
                          >
                            Your Answer
                          </DialogTitle>
                          <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                              position: "absolute",
                              right: 8,
                              top: 8,
                              color: (theme) => theme.palette.grey[500],
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                          <DialogContent dividers>
                            <ReplyForm
                              questionId={question.id}
                              relies={replies}
                              setReplies={setReplies}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button
                              sx={{ color: "#8A2387" }}
                              onClick={handleClose}
                            >
                              Close
                            </Button>
                          </DialogActions>
                        </BootstrapDialog>
                      </div>
                    )}
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