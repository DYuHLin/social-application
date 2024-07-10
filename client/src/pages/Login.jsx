import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const login = {username: username, password: password}
    try{
      const res = axios.post(`http://localhost:3000/api/auth/login`, login, {headers:{'content-type': 'application/json'}})
      console.log(res.data)
    }catch(err){
      console.log(err)
    }
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
      </section>
  )
}

export default Login