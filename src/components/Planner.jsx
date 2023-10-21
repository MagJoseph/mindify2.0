import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import PlannerItem from './PlannerItem'

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


const Planner = () => {

  const navigate = useNavigate()

    //get the current date
    const current = new Date();
    const getDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    //sets states
    const [date, setDate] = useState(new Date())
    const [goals, setGoals] = useState([
          'Do more yoga',
          'Study',
          'Try Meditating'
        ])
     
       const [getGoal, changeGoal] = useState('')
     
       //function to add your weekly goal
        const addGoal = (event) => {
            event.preventDefault()
          let newList = [...goals, getGoal] 
          console.log(newList)
          setGoals(newList) 
          document.getElementById("input").value = "";
             
        }
     
         const handleChange = (event) => {
           changeGoal(event.currentTarget.value) 
          
        }
     
        //function to remove your weekly goal
         const removeGoal = (index) => {
           let goalList = [...goals] 
           goalList.splice(index, 1)
           setGoals(goalList)
           
         }
         
   
     //save goals to local storage
   useEffect(() => {
       localStorage.setItem("goals", JSON.stringify(goals))
   }, [goals])
 
  const handleCalendar = (posts) => {
    navigate(`/calendar`);
  };
 
  return (
    <div className="home-cont">
      <Container sx={{ py: 3 }} maxWidth="md">
        <Stack direction="column" spacing={2} justifyContent="center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="centered">
              <DatePicker
                label="Select"
                sx={{
                  width: 270,
                  margin: "auto",
                }}
              />
            </div>
          </LocalizationProvider>
          <Typography variant="h4" style={{ color: "#8A2387" }}>
            Plan Your Day
          </Typography>
          <form className="centered">
            <input
              id="input"
              className="input"
              type="text"
              name="goal"
              onChange={handleChange}
              style={{ height: 30 }}
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
                width: 150,
              }}
              onClick={(e) => addGoal(e)}
            >
              Add
            </button>
            <PlannerItem goals={goals} removeGoal={removeGoal} />
          </form>
          <br />
          <br />
          <Button
            className="hov"
            variant="contained"
            style={{
              backgroundImage:
                "linear-gradient(to right,  #8A2387, #E94057, #F27121)",
              paddingRight: 35,
              paddingLeft: 35,
              width: 150,
              margin: "auto",
            }}
            onClick={handleCalendar}
          >
            CALENDAR
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
 
export default Planner