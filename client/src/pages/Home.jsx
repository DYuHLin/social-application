import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import { Link } from 'react-router-dom'

function Home() {
  const {user, setUser} = useContext(AppContext)
  return (
    <section>
    <h1>Home</h1>
    <Link to='/post'>Create Post</Link>
    <button onClick={() => console.log(user)}>show</button>
    </section>
  )
}

export default Home