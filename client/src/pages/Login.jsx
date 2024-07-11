import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import AppContext from '../context/AppContext'
import Cookies from 'js-cookie'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const {user, setUser} = useContext(AppContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const login = {username: username, password: password}
    try{
      const res = axios.post(`http://localhost:3000/api/auth/login`, login, {headers:{'content-type': 'application/json'}})
      if(res.data == 'username'){
        setError('Your username or password is incorrect.')
      }else if(res.data == 'password'){
        setError('Your username or password is incorrect.')
      } else {
        toast.success('You have successfully logged in.')
        
      }
    }catch(err){
      console.log(err)
    }
  }

  const show = () => {
    console.log(user)
  }

  const setCookie = () => {
    let userT = decodeURIComponent(document.cookie).split(';').map(cookie => cookie.split('='))
    setUser(userT[1])
  }

  return (
    <section>
        <h1>Login</h1>
        <form method="POST" className='login-form' onSubmit={handleSubmit}>
          <input type="text" required name='username' id='username' className='username' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type="password" required name='password' id='password' className='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
          <button>Login</button>
        </form>
        <p className="error">{error}</p> 
        <Link to={"/register"} className="link">Register</Link>
        <p className='guest'>Sign in as guest</p>
        <button onClick={show}>show</button>
        <button onClick={setCookie}>set</button>
      </section>
  )
}

export default Login