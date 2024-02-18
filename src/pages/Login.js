import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'


import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";


const Login = (props) => {
    let navigate = useNavigate()

    const [formValues, setFormValues] = useState({ username: '', password: '' })

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
      }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = await SignInUser(formValues)
        setFormValues({
        username: "",
        password: "",
        })
        console.log(payload.id)
        localStorage.setItem('user', payload.id)        
          props.setTeacher(payload)
        props.toggleAuthenticated(true)
         navigate('/posts')
    }

    const handleRegister = () => navigate("/register");

    return (
      <div className="home-cont">
        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
        >
          <form onSubmit={handleSubmit} className="login-container">
            <div className="landing-title"> MINDIFY</div>
            <input
              className="input"
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Your Username"
              value={formValues.username}
              required
              style={{ height: 30 }}
            />
            <input
              className="input"
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Your Password"
              value={formValues.password}
              required
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
                width: 140,
              }}
              disabled={!formValues.username || !formValues.password}
            >
              LOGIN
            </button>
          </form>
        </Stack>
      </div>
    );
}

export default Login