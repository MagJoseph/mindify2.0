import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import './styles/App.css';
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/Createpost';
import Question from './pages/Question';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';
import { CheckSession  } from './services/Auth'
import CommentsForm from './components/CommentsForm';
import TopBar from './components/TopBar';
import IPP from './pages/IPP'
import Planner from './components/Planner';
import QuestionsForm from './components/QuestionsForm';
import Landing from './pages/Landing';
import UpdatePost from './components/UpdatePost'
import MyCalendar from './components/Calendar'



const App = () => {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [teacher, setTeacher] = useState('')

  let navigate = useNavigate()

  const checkToken = async () => {
    const user = await CheckSession()
    setTeacher(user)
    toggleAuthenticated(true)
  }

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setTeacher(null)
    toggleAuthenticated(false);
    localStorage.clear();
    navigate('/home')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div>
      <TopBar
        authenticated={authenticated}
        teacher={teacher}
        handleLogOut={handleLogOut}
      />

      <Routes>
        <Route
          path="/login"
          element={
            <Login
              setTeacher={setTeacher}
              toggleAuthenticated={toggleAuthenticated}
            />
          }
        />
        <Route path="/profile" element={<Profile teacher={teacher} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Landing />} />
        <Route path="/postdetail/:id" element={<PostDetails />} />
        <Route path="/posts/postdetail/:id" element={<PostDetails />} />
        <Route
          path="/posts"
          element={<Home />}
          teacher={teacher}
          authenticated={authenticated}
        />
        <Route path="/posts/postdetail/:id/update" element={<UpdatePost />} />
        <Route path="/IPP" element={<IPP />} />
        <Route path="/createpost" element={<CreatePost teacher={teacher} />} />
        <Route
          path="/posts/postdetail/:id/commentsform"
          element={<CommentsForm />}
        />
        <Route
          path="/prof"
          element={
            <MyProfile teacher={teacher} authenticated={authenticated} />
          }
        />

        <Route path="/planner" element={<Planner />} />
        <Route
          path="/questions"
          element={
            <Question
              authenticated={authenticated}
              teacher={teacher}
              handleLogOut={handleLogOut}
            />
          }
        />
        <Route path="/questions/new" element={<QuestionsForm />} />
        <Route path="calendar" element={<MyCalendar />} />
      </Routes>
    </div>
  );
}

export default App;
