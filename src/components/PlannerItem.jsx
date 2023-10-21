import React from 'react'

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const PlannerItem = (props) => {

  
  //map all the goals and add remove with a onclick function
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 5,
        border: 1,
        borderColor: "#8A2387",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
      }}
    >
      <ul className="list">
        {props.goals.map((goal, index) => (
          <li className="list-item" key={index}>
            {goal}
            <Button
              className="hov"
              variant="outlined"
              style={{
                borderColor: "#8A2387",
                color: "#8A2387",
                backgroundColor: "white",
                paddingLeft: 30,
                paddingRight: 30,
                marginLeft: 10,
              }}
              onClick={() => props.removeGoal(index)}
            >
              REMOVE
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default PlannerItem