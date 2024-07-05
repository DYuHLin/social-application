import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <section>
    <h1>Register</h1>
        <form className='register-form' method="POST">
            <input type="text" required name='name' id='name' className='name' placeholder='Name'/>
            <input type="text" required name='surname' id='surname' className='surname' placeholder='Surname'/>
            <input type="text" required name='username' id='username' className='username' placeholder='Username'/>
            <input type="email" required name='email' id='email' className='email' placeholder='Email'/>
            <input type="password" required name='password' id='password' className='password' placeholder='Password' minLength={6}/>
            <input type="password" required name='confirmedPassword' id='confirmedPassword' className='confirmedPassword' placeholder='Confirm password' minLength={6}/>
            <button>Register</button>
            
        </form>
        {/* <p className="error">{error}</p> */}
        <Link to={"/login"} className="link">Login</Link>
      </section>
  )
}

export default Register