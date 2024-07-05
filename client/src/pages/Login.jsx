import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <section>
        <h1>Login</h1>
        <form method="POST" className='login-form'>
          <input type="text" required name='username' id='username' className='username' placeholder='Username'/>
          <input type="password" required name='password' id='password' className='password' placeholder='Password'/>
          <button>Login</button>
        </form>
        {/* <p className="error">{error}</p> */}
        <Link to={"/register"} className="link">Register</Link>
        <p className='guest'>Sign in as guest</p>
      </section>
  )
}

export default Login