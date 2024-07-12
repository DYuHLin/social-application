import React, { useContext } from 'react'
import AppContext from '../context/AppContext'

function Home() {
  const {user, setUser} = useContext(AppContext)
  return (
    <div>
    <h1>Home</h1>
    <button onClick={() => console.log(user)}>show</button>
    </div>
  )
}

export default Home