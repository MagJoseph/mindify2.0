import { useEffect, useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Register = () => {
    let navigate = useNavigate()

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [usernameList, setUsernameList] = useState()
    const [emailList, setEmailList] = useState()
    const [usedInfo, setUsedInfo] = useState(true)

    const handleHome = () => navigate("/");

    useEffect(()=> {
        const getUserInfo = async () => {
            let usernameArr = []
            let emailArr = []


            let result = await Client.get(`teacher_info`)
            result.data.tUsernames.map((name)=>{
                usernameArr.push(name.username)
            })
            result.data.tEmails.map((email)=>{
                emailArr.push(email.email)
            })
            let alphaUsernameArr = usernameArr.sort((a, b) => a.localeCompare(b))
            let alphaEmailArr = emailArr.sort((a, b) => a.localeCompare(b))
            setUsernameList(alphaUsernameArr)
            setEmailList(alphaEmailArr)

        }
        getUserInfo()

    }, [])

    const redAlert = () => {
        setUsedInfo(!usedInfo)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        let formName = !usernameList.includes(formValues.username)
        let formEmail = !emailList.includes(formValues.email)

            
        
        if(formName && formEmail){
            await RegisterUser({
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                username: formValues.username,
                email:formValues.email,
                password:formValues.password
              })
              setFormValues({
                  firstName: '',
                  lastName: '',
                  username: '',
                  email: '',
                  password: '',
                  confirmPassword: ''})
              navigate('/login')
        }
        setFormValues({
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
        console.log('Used info')
        setTimeout(redAlert, 3000)

        
    }

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }
    console.log(formValues)
    console.log(emailList)
    console.log(usernameList)

    return (
      <div className="home-cont">
        <Container sx={{ py: 3 }} maxWidth="md">
          <Stack direction="column" spacing={2}>
            <form className="centered" onSubmit={handleSubmit}>
              <div className="login-container">
                <input
                  className="input"
                  onChange={handleChange}
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formValues.firstName}
                  required
                  style={{ height: 30 }}
                />
                <input
                  className="input"
                  onChange={handleChange}
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formValues.lastName}
                  required
                  style={{ height: 30 }}
                />
                <input
                  className={usedInfo ? "input" : "input red-alert"}
                  onChange={handleChange}
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={formValues.username}
                  required
                  style={{ height: 30 }}
                />
                <input
                  className={usedInfo ? "input" : "input red-alert"}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formValues.email}
                  required
                  style={{ height: 30 }}
                />

                <input
                  className="input"
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formValues.password}
                  required
                  style={{ height: 30 }}
                />

                <input
                  className="input"
                  onChange={handleChange}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formValues.confirmPassword}
                  required
                  style={{ height: 30 }}
                />
              </div>
              <div>
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
                  disabled={
                    !formValues.email ||
                    (!formValues.password &&
                      formValues.confirmPassword === formValues.password)
                  }
                >
                  REGISTER
                </button>
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
                  GO BACK
                </Button>
              </div>
            </form>
          </Stack>
        </Container>
      </div>
    );
}

export default Register