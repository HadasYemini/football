import { Route, Routes } from "react-router-dom"
import Login from './views/Login'
import Register from './views/Register'
import Team from './views/Team'
import AddPlayer from './views/AddPlayer'
import EditPlayer from './views/EditPlayer'
import Logout from './views/Logout'
import './App.css'

function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/team' element={<Team />} />
          <Route path='/team/add' element={<AddPlayer />} />
          <Route path='/team/edit' element={<EditPlayer />} />
          <Route path='/team/edit/:playerParams' element={<EditPlayer />} />
          <Route path='/logout' element={<Logout />} /> 
        </Routes>
    </>
  )
}

export default App
