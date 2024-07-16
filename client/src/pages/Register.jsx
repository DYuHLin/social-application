import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import UploadProfileImage from './components/UploadProfileImage'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedName = name.replace(/\s/g, '')
    const updatedSurname = surname.replace(/\s/g, '')
    const updatedUserame = username.replace(/\s/g, '')

    const register = {name: updatedName, surname: updatedSurname, username: updatedUserame, email, password, confirmedPassword: confirm, image: image}
    try{
      axios.post(`http://localhost:3000/api/auth/register`, register, {headers: {'Content-Type': 'application/json'}})
      .then(res => res.data)
      .then(status => {
        if(status === 'failed'){
          setError('This username has been taken')
        } else if(status == 'match'){
          setError('Your passwords do not match')
        }else if(status == 'ok'){
          toast.success('You have sucessfully registered.')
          navigate('/login')
        }
      })
    }catch(err){
      console.log(err)
    }
  }

  return (
    <section>
    <h1>Register</h1>
        <form className='register-form' method="POST" onSubmit={handleSubmit}>
            <input type="text" required name='name' id='name' className='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="text" required name='surname' id='surname' className='surname' placeholder='Surname' value={surname} onChange={(e) => setSurname(e.target.value)}/>
            <input type="text" required name='username' id='username' className='username' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="email" required name='email' id='email' className='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <UploadProfileImage setImage={setImage}/>
            <input type="password" required name='password' id='password' className='password' placeholder='Password' minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" required name='confirmedPassword' id='confirmedPassword' className='confirmedPassword' placeholder='Confirm password' value={confirm} onChange={(e) => setConfirm(e.target.value)} minLength={6}/>
            <button>Register</button>         
        </form>
        <p className="error">{error}</p> 
        <Link to={"/login"} className="link">Login</Link>
      </section>
  )
}

export default Register