import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import Client from '../services/api'
import CommentsItem from '../components/CommentsItem'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";




const PostDetails = (props) => {

  const [ selectedPost, setSelectedPost ] = useState()
  const [comments, setComment] = useState()


  let { id } = useParams()
  
  let navigate = useNavigate();  


  const handleHome = () => navigate("/posts");


  //get posts by id
    const getPost = async () => {
        const result = await Client.get(`posts/postdetail/${id}`)
        console.log(result.data.getComments)
        setSelectedPost(result.data.indPost)
        setComment(result.data.getComments)
    }

  console.log(selectedPost)

    useEffect(() => {
        getPost()
     
    }, [])

  return selectedPost ? (
    <div className="centered">
      <Card sx={{ maxWidth: 675 }} className="shadow">
        <CardMedia
          sx={{ height: 375 }}
          image={selectedPost.image}
          title="post image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {selectedPost.title}
          </Typography>

          <Typography variant="body2">{selectedPost.content}</Typography>
        </CardContent>
        <div style={{ margin: 20 }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>View Comments</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {comments.length > 0 ? (
                <Typography>
                  {comments.map((comment) => (
                    <div className="post-container" key={comment.id}>
                      <CommentsItem
                        name={comment.name}
                        content={comment.content}
                      />
                    </div>
                  ))}
                </Typography>
              ) : (
                <Typography className="comment">No comments yet.</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </div>
        <br />
        <CardActions className="centered">
          <Stack direction="row" spacing={2}>
            <Link
              className="new-link"
              style={{
                backgroundImage:
                  "linear-gradient(to right,  #8A2387, #E94057, #F27121)",
                padding: 10,
                borderRadius: 5,
                fontSize: 14,
              }}
              to={`/posts/postdetail/${selectedPost.id}/commentsform`}
            >
              ADD COMMENT
            </Link>
            <Button
              className="hov"
              variant="outlined"
              style={{
                borderColor: "#8A2387",
                color: "#8A2387",
                backgroundColor: "white",
                paddingLeft: 30,
                paddingRight: 30,
              }}
              onClick={handleHome}
            >
              HOME
            </Button>
          </Stack>
        </CardActions>
        <br />
      </Card>
      <br />
    </div>
  ) : (
    <div></div>
  );
}

export default PostDetails